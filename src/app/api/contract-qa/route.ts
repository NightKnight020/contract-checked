import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, contractContext } = body as { question: string; contractContext?: string };

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'question is required' }, { status: 400 });
    }

    const systemPrompt = contractContext
      ? `You are a contract analyst. The user has uploaded and analyzed a contract. You ONLY answer questions about THAT specific contract.
RULES:
- Answer in 1-3 short sentences max. Be direct and specific.
- If the question is about something NOT in the contract, say: "That doesn't appear to be covered in your contract."
- Never use headers, bullet points, or markdown formatting.
- Never give generic explanations — always tie your answer to the actual contract.
- If you don't know, say so briefly. Do not pad your answer.
- No legal disclaimers unless absolutely critical.`
      : `You are a contract assistant. Answer questions about contracts in plain English.
RULES:
- Answer in 2-4 sentences max. Be direct and specific.
- No headers, no bullet points, no markdown.
- If the question has nothing to do with contracts, say: "I can only help with contract-related questions."
- No padding, no filler.`;

    const userMessage = contractContext
      ? `Contract context: ${contractContext}\n\nUser question: ${question}`
      : question;

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    const answer =
      message.content[0].type === 'text' ? message.content[0].text : 'Unable to generate a response.';

    return NextResponse.json({ answer });
  } catch (err) {
    console.error('contract-qa error:', err);
    return NextResponse.json(
      { error: 'Failed to answer question. Please try again.' },
      { status: 500 }
    );
  }
}
