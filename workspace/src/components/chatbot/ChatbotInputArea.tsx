'use client';

import { useState, type KeyboardEvent } from 'react';

interface ChatbotInputAreaProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}

export function ChatbotInputArea({ onSubmit, isLoading = false }: ChatbotInputAreaProps) {
  const [value, setValue] = useState('');

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setValue('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    // 한국어/일본어 IME 조합 중 Enter는 조합 확정용이므로 전송을 건너뛴다.
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    e.preventDefault();
    handleSubmit();
  }

  return (
    <div className="border-t border-border px-3 py-3 sm:px-4">
      <div className="flex items-center gap-2">
        <label htmlFor="chatbot-input" className="sr-only">
          메시지 입력
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="궁금한 점을 입력해보세요"
          className="min-h-[44px] min-w-0 flex-1 rounded border border-border bg-bg-sunken px-3 py-2.5 font-sans text-base text-content placeholder:text-content-muted transition-colors focus:border-accent focus:outline-none sm:text-sm"
          id="chatbot-input"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded bg-accent px-3 text-bg transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-30 sm:w-11 sm:px-0"
          aria-label="전송"
          type="button"
        >
          <span className="text-sm font-bold" aria-hidden="true">
            ➤
          </span>
        </button>
      </div>
    </div>
  );
}
