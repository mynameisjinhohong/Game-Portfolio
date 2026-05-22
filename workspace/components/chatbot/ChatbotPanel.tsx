"use client";

import { useState } from "react";
import type { ChatMessage, SampleQuestion } from "@/types/chatbot";
import { ChatbotMessagePanel } from "./ChatbotMessagePanel";
import { ChatbotSampleQuestions } from "./ChatbotSampleQuestions";
import { ChatbotInputArea } from "./ChatbotInputArea";

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  { id: "q1", text: "Tell me about your games" },
  { id: "q2", text: "What tech do you use?" },
  { id: "q3", text: "About you" },
];

export function ChatbotPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [started, setStarted] = useState(false);

  function handleSubmit(text: string) {
    setStarted(true);
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    // 후속 작업: AI 응답 연결 위치
  }

  function handleSampleSelect(question: string) {
    handleSubmit(question);
  }

  function handleStartChat() {
    setStarted(true);
  }

  return (
    <div className="hud-panel rounded flex flex-col h-full min-h-[520px]">
      {/* 패널 헤더 */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-hud-border">
        <div className="flex items-center gap-2">
          {/* 봇 아이콘 */}
          <div className="w-6 h-6 bg-hud-teal/20 border border-hud-teal/40 rounded flex items-center justify-center">
            <span className="text-hud-teal text-xs">🤖</span>
          </div>
          <span className="font-mono text-xs text-hud-teal tracking-widest">
            PORTFOLIO_BOT
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-hud-text-dim">
          <span className="w-1.5 h-1.5 rounded-full bg-hud-green animate-pulse" />
          ONLINE
        </span>
      </div>

      {/* 메시지 영역 */}
      <ChatbotMessagePanel messages={messages} />

      {/* 견본 질문 — 대화가 없을 때만 표시 */}
      {messages.length === 0 && (
        <ChatbotSampleQuestions
          questions={SAMPLE_QUESTIONS}
          onSelect={handleSampleSelect}
        />
      )}

      {/* 입력 영역 */}
      <ChatbotInputArea onSubmit={handleSubmit} />

      {/* Start Chat CTA — 대화 시작 전 표시 */}
      {!started && (
        <div className="px-4 pb-4 pt-2 border-t border-hud-border">
          <button
            onClick={handleStartChat}
            className="w-full py-3 bg-hud-orange hover:opacity-90 active:opacity-80
                       text-white font-semibold text-sm rounded transition-opacity
                       flex items-center justify-center gap-2"
          >
            <span>▶</span>
            Start Chat
          </button>
        </div>
      )}
    </div>
  );
}
