'use client';

import type { SampleQuestion } from '@/types/chatbot';

interface ChatbotSampleQuestionsProps {
  questions: SampleQuestion[];
  onSelect: (question: string) => void;
}

export function ChatbotSampleQuestions({ questions, onSelect }: ChatbotSampleQuestionsProps) {
  return (
    <div className="flex flex-col gap-2 px-3 pb-3 sm:px-4">
      {questions.map((q) => (
        <button
          key={q.id}
          type="button"
          onClick={() => onSelect(q.text)}
          className="flex w-full items-center gap-3 rounded-lg border border-border bg-panel-soft px-3 py-3 min-h-[44px] text-left text-sm text-content transition-colors hover:border-accent hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          {q.icon ? (
            <span className="flex-shrink-0 text-base" aria-hidden="true">
              {q.icon}
            </span>
          ) : (
            <span className="flex-shrink-0 text-xs text-accent" aria-hidden="true">
              ▸
            </span>
          )}
          {q.text}
        </button>
      ))}
    </div>
  );
}
