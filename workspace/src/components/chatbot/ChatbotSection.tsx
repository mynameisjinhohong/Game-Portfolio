'use client';

import { CharacterPanel } from './CharacterPanel';
import { ChatbotPanel } from './ChatbotPanel';
import { FeaturedGamesPanel } from './FeaturedGamesPanel';

export function ChatbotSection() {
  return (
    <section
      id="chatbot"
      aria-label="AI 챗봇 섹션"
      className="w-full max-w-7xl mx-auto px-4 py-6 md:py-10"
      style={{ minHeight: 'calc(100vh - 52px)' }}
    >
      {/* 3컬럼 그리드: 캐릭터 | 챗봇 | 게임 */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-4 items-center">
        {/* 왼쪽: 캐릭터 패널 */}
        <div className="hidden md:block">
          <CharacterPanel />
        </div>

        {/* 중앙: 챗봇 패널 */}
        <div className="flex flex-col gap-4">
          <ChatbotPanel />

          <div className="flex justify-center">
            <button
              type="button"
              className="flex items-center gap-2.5 px-8 py-3 rounded-full font-semibold text-base text-white tracking-wide transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-hud-orange/60"
              style={{
                background: 'linear-gradient(135deg, #FF7A2F 0%, #FF9A5A 100%)',
                boxShadow: '0 4px 20px rgba(255,122,47,0.40)',
              }}
              onClick={() => {
                const input = document.querySelector<HTMLInputElement>('#chatbot-input');
                if (input) input.focus();
              }}
            >
              <span className="text-lg">💬</span>
              Start Chat
            </button>
          </div>
        </div>

        {/* 오른쪽: 게임 패널 */}
        <div className="hidden md:block">
          <FeaturedGamesPanel />
        </div>
      </div>
    </section>
  );
}
