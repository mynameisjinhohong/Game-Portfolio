import { NextRequest, NextResponse } from 'next/server';
import { sendChatMessage } from '@/lib/chatbot/llmService';
import type { ChatMessage } from '@/lib/chatbot/llmService';

export async function POST(request: NextRequest) {
  let body: { messages?: unknown; model?: unknown };

  try {
    body = (await request.json()) as { messages?: unknown; model?: unknown };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'messages array is required' }, { status: 400 });
  }

  const sanitized: ChatMessage[] = messages
    .filter(
      (m): m is { role: string; content: string } =>
        typeof m === 'object' &&
        m !== null &&
        typeof (m as Record<string, unknown>).role === 'string' &&
        typeof (m as Record<string, unknown>).content === 'string',
    )
    .map((m) => ({
      role: m.role as ChatMessage['role'],
      content: m.content,
    }));

  const model = typeof body.model === 'string' ? body.model : undefined;

  try {
    const result = await sendChatMessage({ messages: sanitized, model });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
