"use client";

export function ChatbotHeader() {
  return (
    <div className="mb-5 flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-hud-teal tracking-widest uppercase">
          [ AI_TERMINAL_v1.0 ]
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-hud-teal animate-pulse" />
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold text-hud-text leading-tight">
        저에 대해 궁금한 것을
        <br />
        <span className="text-hud-teal">무엇이든 물어보세요</span>
      </h2>

      <p className="text-sm text-hud-text-dim max-w-md leading-relaxed">
        AI 챗봇이 홍진호의 경험, 프로젝트, 기술 스택에 대해 답변합니다.
        아래 견본 질문으로 시작하거나 직접 입력해보세요.
      </p>
    </div>
  );
}
