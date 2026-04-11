import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { analyzeContractText, ocrImageToText, compareContracts } from '@/lib/contract-ai';

const MAX_SIZE = 10 * 1024 * 1024;

const VALID_DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

async function extractText(file: File): Promise<string> {
  if (file.type === 'text/plain') {
    return file.text();
  }
  if (file.type === 'application/pdf') {
    const buf = Buffer.from(await file.arrayBuffer());
    const data = await pdfParse(buf);
    return data.text;
  }
  if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/msword'
  ) {
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return result.value;
  }
  throw new Error('Unsupported file type.');
}

function validateFile(file: File, validTypes: string[]): string | null {
  if (!validTypes.includes(file.type)) return `Unsupported file type: ${file.type}`;
  if (file.size > MAX_SIZE) return 'File size must be less than 10MB.';
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const mode = (formData.get('mode') as string) ?? 'single';
    const tab = (formData.get('tab') as string) ?? 'file';

    if (mode === 'compare') {
      // Comparison mode — two inputs
      let textA = '';
      let textB = '';

      if (tab === 'text') {
        const raw = formData.get('text') as string;
        if (!raw) return NextResponse.json({ error: 'No text provided.' }, { status: 400 });
        // Expect format: "CONTRACT A:\n...\n\n---\n\nCONTRACT B:\n..."
        const parts = raw.split(/\n\s*---\s*\n/);
        textA = parts[0]?.replace(/^CONTRACT A:\n/, '') ?? '';
        textB = parts[1]?.replace(/^CONTRACT B:\n/, '') ?? '';
      } else if (tab === 'photo') {
        const imgA = formData.get('fileA') as File | null;
        const imgB = formData.get('fileB') as File | null;
        if (!imgA || !imgB) return NextResponse.json({ error: 'Two images required for comparison.' }, { status: 400 });
        const errA = validateFile(imgA, VALID_IMAGE_TYPES);
        if (errA) return NextResponse.json({ error: errA }, { status: 400 });
        const errB = validateFile(imgB, VALID_IMAGE_TYPES);
        if (errB) return NextResponse.json({ error: errB }, { status: 400 });
        [textA, textB] = await Promise.all([ocrImageToText(imgA), ocrImageToText(imgB)]);
      } else {
        const fileA = formData.get('fileA') as File | null;
        const fileB = formData.get('fileB') as File | null;
        if (!fileA || !fileB) return NextResponse.json({ error: 'Two files required for comparison.' }, { status: 400 });
        const errA = validateFile(fileA, VALID_DOC_TYPES);
        if (errA) return NextResponse.json({ error: errA }, { status: 400 });
        const errB = validateFile(fileB, VALID_DOC_TYPES);
        if (errB) return NextResponse.json({ error: errB }, { status: 400 });
        [textA, textB] = await Promise.all([extractText(fileA), extractText(fileB)]);
      }

      if (!textA.trim() || !textB.trim()) {
        return NextResponse.json({ error: 'Could not extract text from one or both contracts.' }, { status: 400 });
      }

      const result = await compareContracts(textA, textB);
      return NextResponse.json({ mode: 'compare', ...result });
    }

    // Single contract mode
    let contractText = '';

    if (tab === 'text') {
      contractText = (formData.get('text') as string) ?? '';
      if (!contractText.trim()) return NextResponse.json({ error: 'No text provided.' }, { status: 400 });
    } else if (tab === 'photo') {
      const img = formData.get('fileA') as File | null;
      if (!img) return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
      const err = validateFile(img, VALID_IMAGE_TYPES);
      if (err) return NextResponse.json({ error: err }, { status: 400 });
      contractText = await ocrImageToText(img);
    } else {
      const file = formData.get('fileA') as File | null;
      if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
      const err = validateFile(file, VALID_DOC_TYPES);
      if (err) return NextResponse.json({ error: err }, { status: 400 });
      contractText = await extractText(file);
    }

    if (!contractText.trim()) {
      return NextResponse.json({ error: 'Could not extract text from the contract.' }, { status: 400 });
    }

    const result = await analyzeContractText(contractText);
    return NextResponse.json({ mode: 'single', ...result });
  } catch (error) {
    console.error('Analysis error:', error);
    const msg = error instanceof Error ? error.message : 'Failed to analyze contract.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
