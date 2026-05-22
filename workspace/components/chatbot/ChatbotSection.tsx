import { CharacterPanel } from "./CharacterPanel";
import { ChatbotPanel } from "./ChatbotPanel";
import { FeaturedGamesPanel } from "./FeaturedGamesPanel";

export function ChatbotSection() {
  return (
    <section
      id="chatbot"
      aria-label="AI 챗봇 섹션"
      className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12"
    >
      {/* 3컬럼 그리드: 캐릭터 | 챗봇 | 게임 */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-4 items-stretch min-h-[520px]">
        {/* 왼쪽: 캐릭터 프로필 패널 */}
        <div className="hidden md:block">
          <CharacterPanel />
        </div>

        {/* 중앙: 챗봇 패널 */}
        <ChatbotPanel />

        {/* 오른쪽: 추천 게임 + 기술 스택 패널 */}
        <div className="hidden md:block">
          <FeaturedGamesPanel />
        </div>
      </div>

      {/* 모바일: 캐릭터 패널 아래 배치 */}
      <div className="md:hidden mt-4">
        <CharacterPanel />
      </div>
    </section>
  );
}
