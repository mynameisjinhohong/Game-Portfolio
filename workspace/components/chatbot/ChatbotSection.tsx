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
    </section>
  );
}
