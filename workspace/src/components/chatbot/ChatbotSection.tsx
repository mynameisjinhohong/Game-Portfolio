'use client';

import { CharacterPanel } from './CharacterPanel';
import { ChatbotHeader } from './ChatbotHeader';
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
      <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[minmax(220px,1fr)_minmax(0,2.4fr)_minmax(220px,1fr)] xl:gap-6">
        {/* 왼쪽: 캐릭터 패널 (모바일에서는 챗봇 아래로 이동) */}
        <div className="order-2 xl:order-1">
          <CharacterPanel />
        </div>

        {/* 중앙: 챗봇 패널 */}
        <div className="order-1 flex flex-col gap-4 xl:order-2">
          <ChatbotHeader />
          <ChatbotPanel />

          <div className="mt-1 flex justify-center">
            <button
              type="button"
              className="flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full px-6 py-3 text-base font-semibold tracking-wide text-white transition-all duration-150 hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-cta/60 sm:w-auto sm:px-8"
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
        <div className="order-3 xl:order-3">
          <FeaturedGamesPanel />
        </div>
      </div>
    </section>
  );
}
