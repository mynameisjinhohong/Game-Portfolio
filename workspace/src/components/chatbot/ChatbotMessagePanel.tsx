'use client';

import type { ChatMessage } from '@/types/chatbot';

interface ChatbotMessagePanelProps {
  messages: ChatMessage[];
}

export function ChatbotMessagePanel({ messages }: ChatbotMessagePanelProps) {
  return (
    <div
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-4 sm:px-4"
      aria-label="대화 내용"
      aria-live="polite"
    >
      {/* 봇 아바타 + 인사 */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent/50 bg-accent-soft shadow-[0_0_16px_var(--color-accent-soft)]">
          <span className="text-2xl" aria-hidden="true">
            🤖
          </span>
        </div>
        <div className="w-full max-w-[320px] rounded-lg border border-border bg-bg-sunken px-4 py-3 text-center">
          <p className="text-sm leading-relaxed text-content">
            Hello! 👋
            <br />
            I&apos;m Jinho&apos;s Portfolio Bot.
            <br />
            What would you like to know?
          </p>
        </div>
      </div>

      {/* 사용자 & 봇 메시지 렌더링 */}
      {messages.map((msg) => {
        const isUser = msg.role === 'user';
        return (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-xs ${
                isUser
                  ? 'border-cta/40 bg-cta-soft text-cta'
                  : 'border-accent/40 bg-accent-soft text-accent'
              }`}
              aria-hidden="true"
            >
              {isUser ? 'U' : '🤖'}
            </div>
            <div
              className={`max-w-[80%] sm:max-w-[260px] rounded-lg border px-3 py-2 ${
                isUser ? 'border-cta/30 bg-cta-soft' : 'border-border bg-bg-sunken'
              }`}
            >
              <p className="text-sm leading-relaxed text-content">{msg.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
