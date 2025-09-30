import { NextRequest, NextResponse } from 'next/server';
import { compareACSContracts } from '@/lib/acs-ai-service';
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
    const operatorContract = formData.get('operatorContract') as File;
    const bookingForm = formData.get('bookingForm') as File;

    // Validate operator contract
    if (!operatorContract) {
      return NextResponse.json(
        { error: 'Operator contract file is required' },
        { status: 400 }
      );
    }

    // Validate booking form
    if (!bookingForm) {
      return NextResponse.json(
        { error: 'ACS booking form file is required' },
        { status: 400 }
      );
    }

    // Validate file types and sizes for both files
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of [operatorContract, bookingForm]) {
      if (!validTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Unsupported file type. Please upload PDF, Word, or text files.' },
          { status: 400 }
        );
      }

      if (file.size > maxSize) {
        return NextResponse.json(
          { error: 'File size must be less than 10MB.' },
          { status: 400 }
        );
      }
    }

    // Extract text from both files
    const operatorContractText = await extractTextFromFile(operatorContract);
    const bookingFormText = await extractTextFromFile(bookingForm);

    // Validate that we have meaningful content
    if (operatorContractText.trim().length < 100) {
      return NextResponse.json(
        { error: 'Operator contract appears to be empty or contains insufficient text for analysis.' },
        { status: 400 }
      );
    }

    if (bookingFormText.trim().length < 100) {
      return NextResponse.json(
        { error: 'ACS booking form appears to be empty or contains insufficient text for analysis.' },
        { status: 400 }
      );
    }

    // Compare the contracts using ACS AI service
    const analysisResult = await compareACSContracts(
      operatorContractText,
      bookingFormText,
      operatorContract.name,
      bookingForm.name
    );

    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error('ACS comparison error:', error);

    // Provide more specific error messages for debugging
    let errorMessage = 'Failed to compare contracts. Please try again.';
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
      sizeLimit: '20mb', // Allow larger uploads for two files
    },
  },
};

