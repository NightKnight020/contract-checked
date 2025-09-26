import { NextRequest, NextResponse } from 'next/server';
import { analyzeContract } from '@/lib/ai-service';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

// Helper function to extract text from different file types (server-side only)
async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;

  if (fileType === 'text/plain') {
    return await file.text();
  }

  if (fileType === 'application/pdf') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const data = await pdfParse(buffer);
      return data.text;
    } catch {
      throw new Error('Failed to extract text from PDF. Please ensure the PDF contains selectable text.');
    }
  }

  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } catch {
      throw new Error('Failed to extract text from Word document. Please try converting to PDF or text format.');
    }
  }

  throw new Error('Unsupported file type. Please upload a PDF, Word document, or text file.');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type and size
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF, Word, or text files.' },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB.' },
        { status: 400 }
      );
    }

    // Extract text from the file
    const contractText = await extractTextFromFile(file);

    // Analyze the contract using AI
    const analysisResult = await analyzeContract(contractText, file.name);

    // Store the analysis in Supabase (if available)
    let analysisId: string | null = null;
    try {
      const { supabase } = await import('@/lib/supabase');
      if (supabase) {
        // Store the contract file in Supabase storage
        const fileExt = file.name.split('.').pop() || 'txt';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `contracts/${fileName}`;

        const { error: storageError } = await supabase.storage
          .from('contract-files')
          .upload(filePath, file, {
            contentType: file.type,
            duplex: 'half'
          });

        if (storageError) {
          console.error('Error storing file:', storageError);
        }

        // Store the analysis
        const { data: analysisData, error: dbError } = await supabase
          .from('contract_analyses')
          .insert({
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            summary: analysisResult.summary,
            key_clauses: analysisResult.keyClauses,
            recommendations: analysisResult.recommendations,
            overall_risk: analysisResult.overallRisk,
            file_path: filePath // Store the storage path
          })
          .select('id')
          .single();

        if (dbError) {
          console.error('Error storing analysis:', dbError);
        } else {
          analysisId = analysisData?.id;

          // Store contract categories
          if (analysisResult.categories && analysisResult.categories.length > 0) {
            for (const category of analysisResult.categories) {
              // Get or create category
              const { data: categoryData } = await supabase
                .from('contract_categories')
                .select('id')
                .eq('name', category.name)
                .single();

              let categoryId = categoryData?.id;

              if (!categoryId) {
                // Category doesn't exist, create it
                const { data: newCategory } = await supabase
                  .from('contract_categories')
                  .insert({ name: category.name })
                  .select('id')
                  .single();
                categoryId = newCategory?.id;
              }

              if (categoryId) {
                // Link analysis to category
                await supabase
                  .from('contract_analysis_categories')
                  .insert({
                    analysis_id: analysisId,
                    category_id: categoryId,
                    confidence_score: category.confidence
                  });
              }
            }
          }

          // Store learning patterns for AI improvement
          if (analysisResult.learningInsights) {
            await supabase
              .from('contract_learning_patterns')
              .insert({
                contract_text_sample: contractText.substring(0, 2000), // Store first 2000 chars for pattern analysis
                categories: analysisResult.categories?.map(c => c.name) || [],
                risk_patterns: analysisResult.learningInsights.patterns,
                common_clauses: analysisResult.keyClauses?.map(c => ({ title: c.title, risk: c.risk })),
                analysis_confidence: analysisResult.learningInsights.confidence
              });
          }
        }
      }
    } catch (dbError) {
      console.error('Error initializing database:', dbError);
      // Continue without database storage
    }

    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error('Analysis error:', error);

    // Provide more specific error messages for debugging
    let errorMessage = 'Failed to analyze contract. Please try again.';
    let statusCode = 500;

    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('OpenAI')) {
        errorMessage = 'AI service temporarily unavailable. Please try again in a moment.';
      } else if (error.message.includes('PDF') || error.message.includes('Word')) {
        errorMessage = error.message; // Use the specific file processing error
        statusCode = 400;
      } else if (error.message.includes('JSON')) {
        errorMessage = 'AI response format error. Please try again.';
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'Service is busy. Please try again in a few minutes.';
        statusCode = 429;
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}

// Increase payload size limit for file uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
