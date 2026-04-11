import OpenAI from 'openai';

let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

export interface RiskItem {
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  clause: string;
}

export interface ContractAnalysis {
  contractType: string;
  summary: string;
  overallRisk: 'low' | 'medium' | 'high';
  pros: Array<{ title: string; description: string }>;
  cons: Array<{ title: string; description: string }>;
  risks: RiskItem[];
  missingClauses: Array<{ title: string; importance: 'low' | 'medium' | 'high'; description: string }>;
  keyDates: Array<{ label: string; value: string }>;
  keyParties: Array<{ role: string; name: string }>;
  recommendations: Array<{ priority: 'urgent' | 'important' | 'optional'; text: string }>;
  plainEnglishSummary: string;
}

export interface ComparisonResult {
  contractA: ContractAnalysis;
  contractB: ContractAnalysis;
  differences: Array<{ category: string; description: string }>;
}

const SYSTEM_PROMPT = 'You are a senior legal analyst. Always respond with valid JSON only, no markdown, no extra text.';

const ANALYSIS_PROMPT = (text: string) => `Analyze the following contract and return a JSON object matching this exact schema:

{
  "contractType": "string — e.g. Rental Agreement, NDA, Employment Contract",
  "summary": "2-3 sentence summary",
  "overallRisk": "low|medium|high",
  "pros": [{ "title": "string", "description": "string" }],
  "cons": [{ "title": "string", "description": "string" }],
  "risks": [{ "severity": "low|medium|high", "title": "string", "description": "string", "clause": "brief quoted or paraphrased clause" }],
  "missingClauses": [{ "title": "string", "importance": "low|medium|high", "description": "string" }],
  "keyDates": [{ "label": "string", "value": "string" }],
  "keyParties": [{ "role": "string", "name": "string" }],
  "recommendations": [{ "priority": "urgent|important|optional", "text": "string" }],
  "plainEnglishSummary": "A plain English paragraph explaining the contract to a non-lawyer"
}

CONTRACT TEXT:
${text}`;

function cleanJSON(raw: string): string {
  let s = raw.trim();
  if (s.startsWith('```json')) s = s.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  else if (s.startsWith('```')) s = s.replace(/^```\s*/, '').replace(/\s*```$/, '');
  return s;
}

export async function analyzeContractText(text: string): Promise<ContractAnalysis> {
  const completion = await getOpenAI().chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: ANALYSIS_PROMPT(text) },
    ],
    temperature: 0.1,
    max_tokens: 3000,
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error('No response from AI service');

  return JSON.parse(cleanJSON(raw)) as ContractAnalysis;
}

export async function ocrImageToText(imageFile: File): Promise<string> {
  const arrayBuffer = await imageFile.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mimeType = imageFile.type as 'image/jpeg' | 'image/png' | 'image/webp';

  const completion = await getOpenAI().chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'This is an image of a contract document. Please extract ALL the text from this image exactly as it appears, preserving formatting as much as possible. Return only the extracted text.',
          },
          {
            type: 'image_url',
            image_url: { url: `data:${mimeType};base64,${base64}`, detail: 'high' },
          },
        ],
      },
    ],
    max_tokens: 4000,
  });

  return completion.choices[0]?.message?.content ?? '';
}

export async function compareContracts(textA: string, textB: string): Promise<ComparisonResult> {
  const [contractA, contractB] = await Promise.all([
    analyzeContractText(textA),
    analyzeContractText(textB),
  ]);

  const diffCompletion = await getOpenAI().chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Compare these two contracts and return a JSON array of key differences:
[{ "category": "string — e.g. Payment Terms, Termination, Liability", "description": "string — how they differ" }]

CONTRACT A SUMMARY: ${contractA.summary}
CONTRACT A TYPE: ${contractA.contractType}
CONTRACT A RISK: ${contractA.overallRisk}

CONTRACT B SUMMARY: ${contractB.summary}
CONTRACT B TYPE: ${contractB.contractType}
CONTRACT B RISK: ${contractB.overallRisk}

CONTRACT A TEXT (first 3000 chars): ${textA.substring(0, 3000)}

CONTRACT B TEXT (first 3000 chars): ${textB.substring(0, 3000)}`,
      },
    ],
    temperature: 0.1,
    max_tokens: 1500,
  });

  const diffRaw = diffCompletion.choices[0]?.message?.content ?? '[]';
  const differences = JSON.parse(cleanJSON(diffRaw)) as Array<{ category: string; description: string }>;

  return { contractA, contractB, differences };
}
