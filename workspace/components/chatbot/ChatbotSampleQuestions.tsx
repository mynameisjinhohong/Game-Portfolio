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
    <div className="px-4 pb-3">
      <p className="font-mono text-xs text-graphite/40 mb-2 uppercase tracking-wider">
        견본 질문
      </p>
      {/* 후속 작업: 견본 질문 버튼 목록 렌더링 위치 */}
      <div className="flex flex-wrap gap-2">
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.text)}
            className="text-xs px-3 py-1.5 rounded border border-teal/30 text-teal
                       hover:bg-teal/10 hover:border-teal transition-colors font-mono
                       whitespace-nowrap"
          >
            {q.text}
          </button>
        ))}
      </div>
    </div>
  );
}
