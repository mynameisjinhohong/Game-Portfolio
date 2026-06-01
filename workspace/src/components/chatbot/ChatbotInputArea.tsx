"use client";

import { useState, type KeyboardEvent } from "react";

interface ChatbotInputAreaProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}

export function ChatbotInputArea({ onSubmit, isLoading = false }: ChatbotInputAreaProps) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="px-4 py-3 border-t border-hud-border">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 bg-hud-bg border border-hud-border rounded px-3 py-2
                     text-sm text-hud-text placeholder:text-hud-text-dim
                     focus:outline-none focus:border-hud-teal/60 transition-colors font-sans"
          id="chatbot-input"
          aria-label="메시지 입력"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          className="shrink-0 w-9 h-9 bg-hud-teal hover:opacity-90 disabled:opacity-30
                     disabled:cursor-not-allowed transition-opacity rounded flex items-center justify-center"
          aria-label="전송"
        >
          <span className="text-hud-bg text-sm font-bold">➤</span>
        </button>
      </div>
    </div>
  );
}
