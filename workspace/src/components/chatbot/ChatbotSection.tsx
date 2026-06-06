'use client';

import { CharacterPanel } from './CharacterPanel';
import { ChatbotPanel } from './ChatbotPanel';
import { FeaturedGamesPanel } from './FeaturedGamesPanel';

export function ChatbotSection() {
  return (
    <section
      id="chatbot"
      aria-label="AI 챗봇 섹션"
      className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 md:py-10"
    >
      {/*
        모바일: 1열로 챗봇이 최상단, 그 아래에 캐릭터/게임 패널이 스크롤로 노출.
        lg 이상: 3열로 화면 폭에 비례해 패널 너비가 늘어난다.
      */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(220px,1fr)_minmax(0,2.4fr)_minmax(220px,1fr)] lg:gap-6 items-stretch">
        {/* 왼쪽: 캐릭터 패널 (모바일에서는 챗봇 아래로 이동) */}
        <div className="order-2 lg:order-1">
          <CharacterPanel />
        </div>

        {/* 중앙: 챗봇 패널 */}
        <div className="order-1 lg:order-2 flex flex-col gap-4">
          <ChatbotPanel />

          <div className="mt-1 flex justify-center">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-full font-semibold text-base text-white tracking-wide transition-all duration-150 hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-cta/60"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-cta) 0%, var(--color-cta-strong) 100%)',
                boxShadow: 'var(--shadow-cta)',
              }}
              onClick={() => {
                const input = document.querySelector<HTMLInputElement>('#chatbot-input');
                if (input) input.focus();
              }}
            >
              <span aria-hidden="true" className="text-lg">
                💬
              </span>
              Start Chat
            </button>
          </div>
        </div>

        {/* 오른쪽: 게임 패널 (모바일에서는 챗봇 아래로 이동) */}
        <div className="order-3">
          <FeaturedGamesPanel />
        </div>
      </div>
    </section>
  );
}
