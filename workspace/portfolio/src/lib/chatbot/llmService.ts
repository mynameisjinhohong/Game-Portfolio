export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
}

export interface ChatResponse {
  message: string;
  model: string;
}

export interface LLMServiceConfig {
  baseUrl: string;
  model: string;
  systemPrompt: string;
}

function getConfig(): LLMServiceConfig {
  return {
    baseUrl: process.env.LLM_BASE_URL ?? 'http://localhost:11434',
    model: process.env.LLM_MODEL ?? 'llama3',
    systemPrompt:
      process.env.LLM_SYSTEM_PROMPT ??
      'You are a helpful assistant for Hong Jinho\'s portfolio. Answer questions about his experience, projects, and skills.',
  };
}

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const config = getConfig();
  const model = request.model ?? config.model;

  const messages: ChatMessage[] = [
    { role: 'system', content: config.systemPrompt },
    ...request.messages,
  ];

  const response = await fetch(`${config.baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, stream: false }),
  });

  if (!response.ok) {
    throw new Error(`LLM request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { message?: { content?: string }; model?: string };

  return {
    message: data.message?.content ?? '',
    model: data.model ?? model,
  };
}
