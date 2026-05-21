import { ChatbotHeader } from "./ChatbotHeader";
import { ChatbotPanel } from "./ChatbotPanel";

export function ChatbotSection() {
  return (
    <section
      id="chatbot"
      aria-label="AI 챗봇 섹션"
      className="w-full max-w-5xl mx-auto px-4 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* 왼쪽: 제목 및 소개 */}
        <div className="md:sticky md:top-24">
          <ChatbotHeader />
        </div>

        {/* 오른쪽: 채팅 패널 */}
        <div>
          <ChatbotPanel />
        </div>
      </div>
    </section>
  );
}
