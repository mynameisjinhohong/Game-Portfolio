"use client";

export function ChatbotHeader() {
  return (
    <div className="mb-6">
      {/* HUD 스타일 레이블 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-xs text-teal tracking-widest uppercase">
          [ AI_TERMINAL_v1.0 ]
        </span>
        <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
      </div>

      <h2 className="text-3xl md:text-4xl font-semibold text-graphite leading-tight">
        저에 대해 궁금한 것을
        <br />
        <span className="text-teal">무엇이든 물어보세요</span>
      </h2>

      <p className="mt-3 text-sm md:text-base text-graphite/60 max-w-md leading-relaxed">
        AI 챗봇이 홍진호의 경험, 프로젝트, 기술 스택에 대해 답변합니다.
        아래 견본 질문으로 시작하거나 직접 입력해보세요.
      </p>
    </div>
  );
}
