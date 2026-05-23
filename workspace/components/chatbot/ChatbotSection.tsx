import { ChatbotPanel } from "./ChatbotPanel";

export function ChatbotSection() {
  return (
    <section
      id="chatbot"
      aria-label="AI 챗봇 섹션"
      className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12"
    >
      {/* 3컬럼 그리드: 캐릭터(목업) | 챗봇 | 게임(목업) */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-4 items-stretch min-h-[520px]">
        {/* 왼쪽: 목업 플레이스홀더 */}
        <div className="hidden md:block hud-panel rounded" aria-hidden="true" />

        {/* 중앙: 챗봇 패널 */}
        <ChatbotPanel />

        {/* 오른쪽: 목업 플레이스홀더 */}
        <div className="hidden md:block hud-panel rounded" aria-hidden="true" />
      </div>

      {/* Start Chat 안내 UI — 채팅창과 분리된 하단 영역 */}
      <div className="flex flex-col items-center gap-2 mt-6">
        <div className="flex items-center gap-3 text-hud-text-dim font-mono text-xs tracking-widest select-none">
          <span className="h-px w-12 bg-hud-border" aria-hidden="true" />
          <span className="w-2 h-2 rounded-full bg-hud-orange/60 animate-pulse" aria-hidden="true" />
          <span>INPUT A QUESTION TO START CHAT</span>
          <span className="w-2 h-2 rounded-full bg-hud-orange/60 animate-pulse" aria-hidden="true" />
          <span className="h-px w-12 bg-hud-border" aria-hidden="true" />
        </div>
        <p className="text-[11px] text-hud-text-dim/60 font-mono text-center max-w-xs">
          질문을 입력하거나 위 견본 질문을 선택해 대화를 시작하세요
        </p>
      </div>
    </section>
  );
}
