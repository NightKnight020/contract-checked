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
    try {
      const { supabase } = await import('@/lib/supabase');
      if (supabase) {
        const { error: dbError } = await supabase
          .from('contract_analyses')
          .insert({
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            summary: analysisResult.summary,
            key_clauses: analysisResult.keyClauses,
            recommendations: analysisResult.recommendations,
            overall_risk: analysisResult.overallRisk
          });

        if (dbError) {
          console.error('Error storing analysis:', dbError);
          // Don't fail the analysis if DB storage fails
        }
      }
    } catch (dbError) {
      console.error('Error initializing database:', dbError);
      // Continue without database storage
    }

    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error('Analysis error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze contract. Please try again.';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
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
