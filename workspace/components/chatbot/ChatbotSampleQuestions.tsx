"use client";

import type { SampleQuestion } from "@/types/chatbot";

interface ChatbotSampleQuestionsProps {
  questions: SampleQuestion[];
  onSelect: (question: string) => void;
}

export function ChatbotSampleQuestions({
  questions,
  onSelect,
}: ChatbotSampleQuestionsProps) {
  return (
    <div className="px-4 pb-3 flex flex-col gap-2">
      {/* 후속 작업: 견본 질문 버튼 목록 렌더링 위치 */}
      {questions.map((q) => (
        <button
          key={q.id}
          onClick={() => onSelect(q.text)}
          className="flex items-center gap-2 w-full text-left px-3 py-2 rounded border border-hud-border
                     text-sm text-hud-text hover:border-hud-teal/50 hover:bg-hud-teal/5 transition-colors"
        >
          <span className="text-hud-text-dim text-xs">▸</span>
          {q.text}
        </button>
      ))}
    </div>
  );
}
