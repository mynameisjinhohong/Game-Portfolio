export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SampleQuestion {
  id: string;
  text: string;
  icon?: string;
}
