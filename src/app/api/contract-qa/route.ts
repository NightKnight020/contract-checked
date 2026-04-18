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

    const systemPrompt =
      "You are a plain-English contract law assistant. Explain everything clearly as if talking to someone with no legal background. Be concise, practical, and helpful. Never give formal legal advice — always suggest consulting a lawyer for serious matters.";

    const userMessage = contractContext
      ? `The user has analyzed a contract. Here is the context: ${contractContext}\n\nAnswer their question in relation to this contract.\n\nQuestion: ${question}`
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
