import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { analyzeContractText, ocrImageToText, compareContracts } from '@/lib/contract-ai';
import { trackAnalysisEvent, trackGA4Event } from '@/lib/telemetry';

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
  const startTime = Date.now();
  let primaryFile: File | null = null;
  let anonSessionId: string | null = null;
  
  try {
    const formData = await request.formData();
    const mode = (formData.get('mode') as string) ?? 'single';
    const tab = (formData.get('tab') as string) ?? 'file';
    
    // Extract anonymous session ID if provided (from client-side cookie/localStorage)
    anonSessionId = (formData.get('anonSessionId') as string) || null;

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
        
        // Track upload for first file
        primaryFile = imgA;
        await trackAnalysisEvent({
          eventType: 'upload_started',
          source: 'web',
          fileMime: imgA.type || null,
          sizeBytes: imgA.size || null,
          anonSessionId: anonSessionId || null,
          path: '/api/analyze',
        });
        
        const errA = validateFile(imgA, VALID_IMAGE_TYPES);
        if (errA) return NextResponse.json({ error: errA }, { status: 400 });
        const errB = validateFile(imgB, VALID_IMAGE_TYPES);
        if (errB) return NextResponse.json({ error: errB }, { status: 400 });
        [textA, textB] = await Promise.all([ocrImageToText(imgA), ocrImageToText(imgB)]);
      } else {
        const fileA = formData.get('fileA') as File | null;
        const fileB = formData.get('fileB') as File | null;
        if (!fileA || !fileB) return NextResponse.json({ error: 'Two files required for comparison.' }, { status: 400 });
        
        // Track upload for first file
        primaryFile = fileA;
        await trackAnalysisEvent({
          eventType: 'upload_started',
          source: 'web',
          fileMime: fileA.type || null,
          sizeBytes: fileA.size || null,
          anonSessionId: anonSessionId || null,
          path: '/api/analyze',
        });
        
        const errA = validateFile(fileA, VALID_DOC_TYPES);
        if (errA) return NextResponse.json({ error: errA }, { status: 400 });
        const errB = validateFile(fileB, VALID_DOC_TYPES);
        if (errB) return NextResponse.json({ error: errB }, { status: 400 });
        [textA, textB] = await Promise.all([extractText(fileA), extractText(fileB)]);
      }

      if (!textA.trim() || !textB.trim()) {
        return NextResponse.json({ error: 'Could not extract text from one or both contracts.' }, { status: 400 });
      }

      // Track analysis start
      await trackAnalysisEvent({
        eventType: 'analysis_started',
        source: 'web',
        fileMime: primaryFile?.type || null,
        sizeBytes: primaryFile?.size || null,
        anonSessionId: anonSessionId || null,
        path: '/api/analyze',
      });

      const result = await compareContracts(textA, textB);
      
      // Track success
      const duration = Date.now() - startTime;
      await trackAnalysisEvent({
        eventType: 'analysis_succeeded',
        source: 'web',
        fileMime: primaryFile?.type || null,
        sizeBytes: primaryFile?.size || null,
        contractTypeGuess: result.contractA.contractType || null,
        durationMs: duration,
        anonSessionId: anonSessionId || null,
        path: '/api/analyze',
      });
      
      // Optional: Track GA4 event
      trackGA4Event('analysis_succeeded', {
        contract_type: result.contractA.contractType,
        mode: 'compare',
      });
      
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
      
      // Track upload
      primaryFile = img;
      await trackAnalysisEvent({
        eventType: 'upload_started',
        source: 'web',
        fileMime: img.type || null,
        sizeBytes: img.size || null,
        anonSessionId: anonSessionId || null,
        path: '/api/analyze',
      });
      
      const err = validateFile(img, VALID_IMAGE_TYPES);
      if (err) return NextResponse.json({ error: err }, { status: 400 });
      contractText = await ocrImageToText(img);
    } else {
      const file = formData.get('fileA') as File | null;
      if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
      
      // Track upload
      primaryFile = file;
      await trackAnalysisEvent({
        eventType: 'upload_started',
        source: 'web',
        fileMime: file.type || null,
        sizeBytes: file.size || null,
        anonSessionId: anonSessionId || null,
        path: '/api/analyze',
      });
      
      const err = validateFile(file, VALID_DOC_TYPES);
      if (err) return NextResponse.json({ error: err }, { status: 400 });
      contractText = await extractText(file);
    }

    if (!contractText.trim()) {
      return NextResponse.json({ error: 'Could not extract text from the contract.' }, { status: 400 });
    }

    // Track analysis start
    await trackAnalysisEvent({
      eventType: 'analysis_started',
      source: 'web',
      fileMime: primaryFile?.type || null,
      sizeBytes: primaryFile?.size || null,
      anonSessionId: anonSessionId || null,
      path: '/api/analyze',
    });

    const result = await analyzeContractText(contractText);
    
    // Track success
    const duration = Date.now() - startTime;
    await trackAnalysisEvent({
      eventType: 'analysis_succeeded',
      source: 'web',
      fileMime: primaryFile?.type || null,
      sizeBytes: primaryFile?.size || null,
      contractTypeGuess: result.contractType || null,
      durationMs: duration,
      anonSessionId: anonSessionId || null,
      path: '/api/analyze',
    });
    
    // Optional: Track GA4 event
    trackGA4Event('analysis_succeeded', {
      contract_type: result.contractType,
      mode: 'single',
    });
    
    return NextResponse.json({ mode: 'single', ...result });
  } catch (error) {
    console.error('Analysis error:', error);
    const raw = error instanceof Error ? error.message : '';
    
    // Track failure
    const duration = Date.now() - startTime;
    let errorCode = 'unknown_error';
    
    // Categorize errors
    if (raw.includes('429') || raw.toLowerCase().includes('quota') || raw.toLowerCase().includes('billing') || raw.toLowerCase().includes('overloaded')) {
      errorCode = 'ai_quota_exceeded';
    } else if (raw.toLowerCase().includes('timeout')) {
      errorCode = 'timeout';
    } else if (raw.toLowerCase().includes('parse') || raw.toLowerCase().includes('json')) {
      errorCode = 'parse_error';
    }
    
    await trackAnalysisEvent({
      eventType: 'analysis_failed',
      source: 'web',
      fileMime: primaryFile?.type || null,
      sizeBytes: primaryFile?.size || null,
      errorCode: errorCode || null,
      durationMs: duration,
      anonSessionId: anonSessionId || null,
      path: '/api/analyze',
    });

    // OpenAI quota / billing error
    if (errorCode === 'ai_quota_exceeded') {
      return NextResponse.json(
        { error: 'Our AI service is temporarily unavailable due to high demand. Please try again in a few minutes.' },
        { status: 503 }
      );
    }

    const msg = raw || 'Failed to analyze contract. Please try again.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

