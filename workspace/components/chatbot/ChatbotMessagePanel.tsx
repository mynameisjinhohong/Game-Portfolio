"use client";

import type { ChatMessage } from "@/types/chatbot";

interface ChatbotMessagePanelProps {
  messages: ChatMessage[];
}

export function ChatbotMessagePanel({ messages }: ChatbotMessagePanelProps) {
  return (
    <div
      className="relative flex-1 overflow-y-auto min-h-0 px-4 py-3 space-y-3"
      aria-label="대화 내용"
      aria-live="polite"
    >
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="font-mono text-sm text-graphite/30 text-center">
            {"// 대화를 시작해보세요"}
          </p>
        </div>
      )}
      {/* 후속 작업: 메시지 목록 렌더링 컴포넌트 연결 위치 */}
    </div>
  );
}
