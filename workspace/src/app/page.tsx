import { ChatbotSection } from '@/components/chatbot/ChatbotSection';
import { SiteHeader } from '@/components/common/SiteHeader';
import { SiteFooter } from '@/components/common/SiteFooter';

export default function Home() {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-bg text-content">
      <SiteHeader />
      <main className="flex-1">
        <ChatbotSection />
      </main>
      <SiteFooter />
    </div>
  );
}
