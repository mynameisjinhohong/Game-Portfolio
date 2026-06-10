'use client';

export function ChatbotHeader() {
  return (
    <div className="mb-5 flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          [ AI_TERMINAL_v1.0 ]
        </span>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
      </div>

      <h2 className="text-2xl font-semibold leading-tight text-content sm:text-3xl">
        저에 대해 궁금한 것을
        <br />
        <span className="text-accent">무엇이든 물어보세요</span>
      </h2>

      <p className="max-w-2xl text-sm leading-relaxed text-content-dim sm:max-w-md">
        AI 챗봇이 홍진호의 경험, 프로젝트, 기술 스택에 대해 답변합니다. 아래 견본 질문으로
        시작하거나 직접 입력해보세요.
      </p>
    </div>
  );
}
