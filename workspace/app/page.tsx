import { ChatbotSection } from "@/components/chatbot/ChatbotSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      {/* 내비게이션 자리 (후속 작업) */}
      <nav className="w-full px-4 py-5 border-b border-graphite/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-mono text-sm text-graphite/60">HONG_JINHO.exe</span>
          <span className="font-mono text-xs text-teal tracking-widest">PORTFOLIO_v1</span>
        </div>
      </nav>

      {/* 챗봇 섹션 */}
      <ChatbotSection />
    </main>
  );
}
