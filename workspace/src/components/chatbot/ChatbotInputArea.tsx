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
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
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
          placeholder="Ask me anything..."
          className="flex-1 min-w-0 rounded border border-border bg-bg-sunken px-3 py-2.5 min-h-[44px] font-sans text-base sm:text-sm text-content placeholder:text-content-muted transition-colors focus:border-accent focus:outline-none"
          id="chatbot-input"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-accent text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
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
