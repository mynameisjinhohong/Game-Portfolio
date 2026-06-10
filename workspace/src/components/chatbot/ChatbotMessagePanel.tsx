'use client';

import { useEffect, useRef } from 'react';
import type { ChatMessage } from '@/types/chatbot';

interface ChatbotMessagePanelProps {
  messages: ChatMessage[];
}

export function ChatbotMessagePanel({ messages }: ChatbotMessagePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isEmpty = messages.length === 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-4 sm:px-4"
      aria-label="대화 내용"
      aria-live="polite"
    >
      {isEmpty ? (
        <div
          className="flex flex-col items-center gap-3 py-4 text-center"
          role="status"
          aria-label="대화 시작 안내"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent/50 bg-accent-soft shadow-[0_0_16px_var(--color-accent-soft)]">
            <span className="text-2xl" aria-hidden="true">
              🤖
            </span>
          </div>
          <div className="w-full max-w-[320px] rounded-lg border border-border bg-bg-sunken px-4 py-3">
            <p className="text-sm leading-relaxed text-content">
              Hello! 👋
              <br />
              I&apos;m Jinho&apos;s Portfolio Bot.
              <br />
              What would you like to know?
            </p>
          </div>
          <p className="text-xs text-content-dim">
            아래 견본 질문을 누르거나 직접 메시지를 입력해 보세요.
          </p>
        </div>
      ) : (
        messages.map((msg) => {
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
                className={`max-w-[calc(100%-2.25rem)] rounded-lg border px-3 py-2 sm:max-w-[min(80%,26rem)] ${
                  isUser ? 'border-cta/30 bg-cta-soft' : 'border-border bg-bg-sunken'
                }`}
              >
                <p className="whitespace-pre-line text-sm leading-relaxed text-content">
                  {msg.content}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
