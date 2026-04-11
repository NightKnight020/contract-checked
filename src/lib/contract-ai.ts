import Anthropic from '@anthropic-ai/sdk';

let _client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
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

const SYSTEM_PROMPT = 'You are a senior legal analyst with 20 years of experience reviewing contracts. Always respond with valid JSON only — no markdown, no extra text, no code fences.';

const ANALYSIS_PROMPT = (text: string) => `Analyze the following contract and return a JSON object matching this exact schema. Be thorough and professional.

{
  "contractType": "string — e.g. Rental Agreement, NDA, Employment Contract, Agreement of Purchase and Sale",
  "summary": "2-3 sentence summary of the contract",
  "overallRisk": "low|medium|high",
  "pros": [{ "title": "string", "description": "string" }],
  "cons": [{ "title": "string", "description": "string" }],
  "risks": [{ "severity": "low|medium|high", "title": "string", "description": "string", "clause": "brief quoted or paraphrased clause" }],
  "missingClauses": [{ "title": "string", "importance": "low|medium|high", "description": "why this clause is typically expected and its absence matters" }],
  "keyDates": [{ "label": "string", "value": "string" }],
  "keyParties": [{ "role": "string", "name": "string" }],
  "recommendations": [{ "priority": "urgent|important|optional", "text": "specific, actionable recommendation" }],
  "plainEnglishSummary": "A clear, plain English paragraph explaining the contract to someone with no legal background — what they are agreeing to, any red flags, and what to watch out for"
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
  const message = await getClient().messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 3000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: ANALYSIS_PROMPT(text) }],
  });

  const raw = message.content[0]?.type === 'text' ? message.content[0].text : '';
  if (!raw) throw new Error('No response from analysis service');

  return JSON.parse(cleanJSON(raw)) as ContractAnalysis;
}

export async function ocrImageToText(imageFile: File): Promise<string> {
  const arrayBuffer = await imageFile.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mimeType = imageFile.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

  const message = await getClient().messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mimeType, data: base64 },
          },
          {
            type: 'text',
            text: 'This is an image of a contract document. Please extract ALL the text from this image exactly as it appears, preserving formatting as much as possible. Return only the extracted text with no commentary.',
          },
        ],
      },
    ],
  });

  return message.content[0]?.type === 'text' ? message.content[0].text : '';
}

export async function compareContracts(textA: string, textB: string): Promise<ComparisonResult> {
  const [contractA, contractB] = await Promise.all([
    analyzeContractText(textA),
    analyzeContractText(textB),
  ]);

  const diffMessage = await getClient().messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Compare these two contracts and return a JSON array of the key differences:
[{ "category": "string — e.g. Payment Terms, Termination, Liability, Duration", "description": "string — clearly explain how they differ" }]

CONTRACT A TYPE: ${contractA.contractType}
CONTRACT A RISK: ${contractA.overallRisk}
CONTRACT A SUMMARY: ${contractA.summary}

CONTRACT B TYPE: ${contractB.contractType}
CONTRACT B RISK: ${contractB.overallRisk}
CONTRACT B SUMMARY: ${contractB.summary}

CONTRACT A TEXT (first 3000 chars): ${textA.substring(0, 3000)}

CONTRACT B TEXT (first 3000 chars): ${textB.substring(0, 3000)}`,
      },
    ],
  });

  const diffRaw = diffMessage.content[0]?.type === 'text' ? diffMessage.content[0].text : '[]';
  const differences = JSON.parse(cleanJSON(diffRaw)) as Array<{ category: string; description: string }>;

  return { contractA, contractB, differences };
}
