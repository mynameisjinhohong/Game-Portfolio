"use client";

import { useState } from "react";
import type { ChatMessage, SampleQuestion } from "@/types/chatbot";
import { ChatbotMessagePanel } from "./ChatbotMessagePanel";
import { ChatbotSampleQuestions } from "./ChatbotSampleQuestions";
import { ChatbotInputArea } from "./ChatbotInputArea";

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  { id: "q1", text: "어떤 게임을 만들었나요?" },
  { id: "q2", text: "주로 사용하는 기술 스택은?" },
  { id: "q3", text: "가장 자랑스러운 프로젝트는?" },
  { id: "q4", text: "어떤 개발자가 되고 싶으신가요?" },
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
    /* HUD 스타일 패널 컨테이너 */
    <div className="relative flex flex-col h-[480px] md:h-[560px] bg-white/70 backdrop-blur-sm
                    rounded-lg border border-teal/20 shadow-sm overflow-hidden">
      {/* HUD 코너 장식 — 상단 좌 */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal rounded-tl-lg" />
      {/* HUD 코너 장식 — 하단 우 */}
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal rounded-br-lg" />

      {/* 패널 헤더 */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-teal/20 bg-teal/5">
        <span className="font-mono text-xs text-teal tracking-widest">CHAT_SESSION</span>
        <span className="flex items-center gap-1.5 text-xs text-graphite/40 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-teal/60" />
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
