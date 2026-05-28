"use client";

import { useState } from "react";
import type { ChatMessage, SampleQuestion } from "@/types/chatbot";
import { ChatbotMessagePanel } from "./ChatbotMessagePanel";
import { ChatbotSampleQuestions } from "./ChatbotSampleQuestions";
import { ChatbotInputArea } from "./ChatbotInputArea";

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  { id: "q1", text: "Tell me about your games", icon: "🎮" },
  { id: "q2", text: "What tech do you use?", icon: "💻" },
  { id: "q3", text: "About you", icon: "👤" },
];

export function ChatbotPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function handleSubmit(text: string) {
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

  return (
    <div className="hud-panel rounded flex flex-col h-full min-h-[520px]">
      {/* HUD 상단 바: 하트(왼쪽) / 배터리(오른쪽) — 추후 기능 연결 예정 */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-hud-border/50">
        {/* 왼쪽: 하트 (HP) 공간 */}
        <div className="flex items-center gap-1 min-w-[60px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="text-red-400/30 text-sm leading-none">♥</span>
          ))}
        </div>
        {/* 오른쪽: 배터리 공간 */}
        <div className="flex items-center gap-1 min-w-[40px] justify-end">
          <div className="w-6 h-3 border border-hud-text-dim/30 rounded-sm relative flex items-center px-0.5">
            <div className="h-1.5 w-2/3 bg-hud-text-dim/20 rounded-sm" />
            <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[3px] h-1.5 bg-hud-text-dim/30 rounded-r-sm" />
          </div>
        </div>
      </div>

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
    </div>
  );
}
