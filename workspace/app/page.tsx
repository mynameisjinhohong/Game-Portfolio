import { ChatbotSection } from "@/components/chatbot/ChatbotSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-hud-bg">
      {/* 내비게이션 */}
      <nav className="w-full px-6 py-3 border-b border-hud-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-mono text-sm text-hud-teal tracking-widest">
            hongjinho.dev
          </span>
          <span className="font-mono text-xs text-hud-text-dim tracking-widest">
            PORTFOLIO_v1
          </span>
        </div>
      </nav>

      {/* 챗봇 섹션 */}
      <ChatbotSection />
    </main>
  );
}
