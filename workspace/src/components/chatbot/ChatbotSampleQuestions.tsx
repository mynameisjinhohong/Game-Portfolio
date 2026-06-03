'use client';

import type { SampleQuestion } from '@/types/chatbot';

interface ChatbotSampleQuestionsProps {
  questions: SampleQuestion[];
  onSelect: (question: string) => void;
}

export function ChatbotSampleQuestions({ questions, onSelect }: ChatbotSampleQuestionsProps) {
  return (
    <div className="px-4 pb-3 flex flex-col gap-2">
      {questions.map((q) => (
        <button
          key={q.id}
          onClick={() => onSelect(q.text)}
          className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg border border-hud-border
                     text-sm text-hud-text hover:border-hud-teal/50 hover:bg-hud-teal/5 transition-colors"
        >
          {q.icon && <span className="text-base flex-shrink-0">{q.icon}</span>}
          {!q.icon && <span className="text-hud-teal text-xs flex-shrink-0">▸</span>}
          {q.text}
        </button>
      ))}
    </div>
  );
}
