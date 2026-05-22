"use client";

import type { ChatMessage } from "@/types/chatbot";

interface ChatbotMessagePanelProps {
  messages: ChatMessage[];
}

export function ChatbotMessagePanel({ messages }: ChatbotMessagePanelProps) {
  return (
    <div
      className="flex-1 overflow-y-auto min-h-0 px-4 py-4 space-y-3"
      aria-label="대화 내용"
      aria-live="polite"
    >
      {/* 봇 인사 메시지 (항상 표시) */}
      <div className="flex gap-2 items-start">
        <div className="w-6 h-6 bg-hud-teal/20 border border-hud-teal/40 rounded flex-shrink-0 flex items-center justify-center mt-0.5">
          <span className="text-hud-teal text-[10px]">🤖</span>
        </div>
        <div className="bg-hud-bg border border-hud-border rounded px-3 py-2 max-w-xs">
          <p className="text-sm text-hud-text leading-relaxed">
            Hello! 👋<br />
            I&apos;m Jinho&apos;s Portfolio Bot.<br />
            What would you like to know?
          </p>
        </div>
      </div>

      {/* 사용자 메시지 렌더링 */}
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-2 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}
        >
          <div className={`w-6 h-6 rounded flex-shrink-0 flex items-center justify-center mt-0.5 border text-[10px] ${
            msg.role === "user"
              ? "bg-hud-orange/20 border-hud-orange/40 text-hud-orange"
              : "bg-hud-teal/20 border-hud-teal/40 text-hud-teal"
          }`}>
            {msg.role === "user" ? "U" : "🤖"}
          </div>
          <div className={`rounded px-3 py-2 max-w-xs border ${
            msg.role === "user"
              ? "bg-hud-orange/10 border-hud-orange/30"
              : "bg-hud-bg border-hud-border"
          }`}>
            <p className="text-sm text-hud-text leading-relaxed">{msg.content}</p>
          </div>
        </div>
      ))}
      {/* 후속 작업: 스트리밍 응답 및 로딩 인디케이터 연결 위치 */}
    </div>
  );
}
