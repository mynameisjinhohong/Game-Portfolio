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
      className="flex-1 overflow-y-auto min-h-0 px-4 py-4 flex flex-col gap-3"
      aria-label="대화 내용"
      aria-live="polite"
    >
      {isEmpty ? (
        <div
          className="flex flex-col items-center gap-3 py-4 text-center"
          role="status"
          aria-label="대화 시작 안내"
        >
          <div className="w-14 h-14 bg-hud-teal/20 border-2 border-hud-teal/50 rounded-full flex items-center justify-center shadow-[0_0_16px_rgba(0,201,167,0.2)]">
            <span className="text-2xl">🤖</span>
          </div>
          <div className="bg-hud-bg border border-hud-border rounded-lg px-4 py-3 w-full max-w-[320px]">
            <p className="text-sm text-hud-text leading-relaxed">
              Hello! 👋
              <br />
              I&apos;m Jinho&apos;s Portfolio Bot.
              <br />
              What would you like to know?
            </p>
          </div>
          <p className="text-xs text-hud-text-dim">
            아래 견본 질문을 누르거나 직접 메시지를 입력해 보세요.
          </p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border text-xs ${
                msg.role === 'user'
                  ? 'bg-hud-orange/20 border-hud-orange/40 text-hud-orange'
                  : 'bg-hud-teal/20 border-hud-teal/40 text-hud-teal'
              }`}
            >
              {msg.role === 'user' ? 'U' : '🤖'}
            </div>
            <div
              className={`rounded-lg px-3 py-2 max-w-[80%] sm:max-w-[260px] border ${
                msg.role === 'user'
                  ? 'bg-hud-orange/10 border-hud-orange/30'
                  : 'bg-hud-bg border-hud-border'
              }`}
            >
              <p className="text-sm text-hud-text leading-relaxed whitespace-pre-line">
                {msg.content}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
