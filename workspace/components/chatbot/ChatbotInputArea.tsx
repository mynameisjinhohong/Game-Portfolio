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

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="px-4 py-3 border-t border-teal/20">
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요... (Enter로 전송)"
          rows={1}
          className="flex-1 resize-none bg-transparent border border-graphite/20 rounded
                     px-3 py-2 text-sm text-graphite placeholder:text-graphite/30
                     focus:outline-none focus:border-teal transition-colors font-sans
                     max-h-32 overflow-y-auto"
          style={{ fieldSizing: "content" } as React.CSSProperties}
          aria-label="메시지 입력"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          className="shrink-0 px-4 py-2 bg-orange-accent text-white text-sm font-medium
                     rounded hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-opacity"
          aria-label="전송"
        >
          전송
        </button>
      </div>
      <p className="mt-1.5 text-xs text-graphite/30 font-mono">
        Shift+Enter로 줄바꿈
      </p>
    </div>
  );
}
