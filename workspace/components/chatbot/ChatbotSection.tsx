"use client";

import { CharacterPanel } from "./CharacterPanel";
import { ChatbotPanel } from "./ChatbotPanel";
import { FeaturedGamesPanel } from "./FeaturedGamesPanel";

export function ChatbotSection() {
  return (
    <section
      id="chatbot"
      aria-label="AI 챗봇 섹션"
      className="w-full max-w-7xl mx-auto px-4 py-6 md:py-10 flex flex-col"
      style={{ minHeight: "calc(100vh - 52px)" }}
    >
      {/* 3컬럼 그리드: 캐릭터 | 챗봇 | 게임 */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-4 items-stretch flex-1">
        {/* 왼쪽: 캐릭터 패널 */}
        <div className="hidden md:block">
          <CharacterPanel />
        </div>

        {/* 중앙: 챗봇 패널 */}
        <ChatbotPanel />

        {/* 오른쪽: 게임 패널 */}
        <div className="hidden md:block">
          <FeaturedGamesPanel />
        </div>
      </div>

      {/* 하단: 대형 Start Chat 버튼 */}
      <div className="flex justify-center mt-6">
        <button
          type="button"
          className="flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-lg text-white tracking-wide transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-hud-orange/60"
          style={{
            background: "linear-gradient(135deg, #FF7A2F 0%, #FF9A5A 100%)",
            boxShadow: "0 4px 24px rgba(255,122,47,0.45)",
          }}
          onClick={() => {
            const input = document.querySelector<HTMLInputElement>("#chatbot-input");
            if (input) input.focus();
          }}
        >
          <span className="text-xl">💬</span>
          Start Chat
        </button>
      </div>
    </section>
  );
}
