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
          className="interactive-card flex min-h-[44px] w-full items-start gap-3 rounded-lg border border-border bg-panel-soft px-3 py-3 text-left text-sm text-content focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          {q.icon ? (
            <span className="mt-0.5 flex-shrink-0 text-base" aria-hidden="true">
              {q.icon}
            </span>
          ) : (
            <span className="mt-0.5 flex-shrink-0 text-xs text-accent" aria-hidden="true">
              ▸
            </span>
          )}
          <span className="leading-relaxed">{q.text}</span>
        </button>
      ))}
    </div>
  );
}
