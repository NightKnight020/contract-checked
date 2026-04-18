import Anthropic from '@anthropic-ai/sdk';
import { jsonrepair } from 'jsonrepair';

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

const SYSTEM_PROMPT = `You are a senior legal analyst. You MUST respond with a single valid JSON object only.
CRITICAL RULES:
- Output ONLY the JSON object. No text before or after.
- No markdown, no code fences, no backticks.
- All string values must use straight double quotes.
- Escape any double quotes inside string values with backslash.
- Do NOT include newlines inside string values — use spaces instead.
- Keep all text values concise (under 200 characters each).
- Limit arrays: max 5 pros, 5 cons, 6 risks, 4 missingClauses, 4 keyDates, 4 keyParties, 5 recommendations.`;

const ANALYSIS_PROMPT = (text: string) => `Analyze the contract below. Return ONLY a JSON object with exactly these fields:

contractType: string (e.g. "Rental Agreement")
summary: string (2-3 sentences, no line breaks)
overallRisk: "low" or "medium" or "high"
pros: array of {title: string, description: string}
cons: array of {title: string, description: string}
risks: array of {severity: "low"|"medium"|"high", title: string, description: string, clause: string}
missingClauses: array of {title: string, importance: "low"|"medium"|"high", description: string}
keyDates: array of {label: string, value: string}
keyParties: array of {role: string, name: string}
recommendations: array of {priority: "urgent"|"important"|"optional", text: string}
plainEnglishSummary: string (plain English explanation, no line breaks)

CONTRACT TO ANALYZE:
${text}`;

function cleanAndRepairJSON(raw: string): string {
  let s = raw.trim();

  // Strip markdown code fences
  s = s.replace(/^```json\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  s = s.replace(/^```\s*/i, '').replace(/\s*```\s*$/i, '').trim();

  // Find the outermost JSON object
  const start = s.indexOf('{');
  const end = s.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    s = s.slice(start, end + 1);
  }

  // Use jsonrepair to fix common issues
  try {
    s = jsonrepair(s);
  } catch {
    // continue with what we have
  }

  return s;
}

function safeParseJSON<T>(raw: string): T {
  const cleaned = cleanAndRepairJSON(raw);
  try {
    return JSON.parse(cleaned) as T;
  } catch (e) {
    // Last resort: try to parse after aggressive cleanup
    const aggressive = cleaned
      .replace(/[\x00-\x1F\x7F]/g, ' ') // strip control chars
      .replace(/,\s*([}\]])/g, '$1')      // trailing commas
      .replace(/([{,]\s*)(\w+):/g, '$1"$2":'); // unquoted keys
    try {
      return JSON.parse(jsonrepair(aggressive)) as T;
    } catch {
      throw new Error(`Analysis service returned invalid data. Please try again. (${e instanceof Error ? e.message : 'parse error'})`);
    }
  }
}

export async function analyzeContractText(text: string): Promise<ContractAnalysis> {
  // Truncate long contracts — 10000 chars is plenty for analysis
  const truncated = text.length > 10000
    ? text.slice(0, 10000) + '\n[truncated]'
    : text;

  const message = await getClient().messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: ANALYSIS_PROMPT(truncated) }],
  });

  const raw = message.content[0]?.type === 'text' ? message.content[0].text : '';
  if (!raw) throw new Error('No response from analysis service');

  return safeParseJSON<ContractAnalysis>(raw);
}

export async function ocrImageToText(imageFile: File): Promise<string> {
  const arrayBuffer = await imageFile.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mimeType = imageFile.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

  const message = await getClient().messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 3000,
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
            text: 'Extract all text from this contract image. Return only the extracted text, no commentary.',
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
    model: 'claude-sonnet-4-5',
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Compare these two contracts. Return ONLY a JSON array of differences.
Format: [{"category": "string", "description": "string"}]
Max 8 differences. No markdown, no extra text.

CONTRACT A: ${contractA.contractType} (risk: ${contractA.overallRisk})
Summary: ${contractA.summary}

CONTRACT B: ${contractB.contractType} (risk: ${contractB.overallRisk})
Summary: ${contractB.summary}

CONTRACT A TEXT: ${textA.substring(0, 2500)}

CONTRACT B TEXT: ${textB.substring(0, 2500)}`,
      },
    ],
  });

  const diffRaw = diffMessage.content[0]?.type === 'text' ? diffMessage.content[0].text : '[]';
  const differences = safeParseJSON<Array<{ category: string; description: string }>>(diffRaw);

  return { contractA, contractB, differences };
}
