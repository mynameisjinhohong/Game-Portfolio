'use client';

import { useState } from 'react';
import type { ChatMessage, SampleQuestion } from '@/types/chatbot';
import { ChatbotMessagePanel } from './ChatbotMessagePanel';
import { ChatbotSampleQuestions } from './ChatbotSampleQuestions';
import { ChatbotInputArea } from './ChatbotInputArea';

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  { id: 'q1', text: 'Tell me about your games', icon: '🎮' },
  { id: 'q2', text: 'What tech do you use?', icon: '💻' },
  { id: 'q3', text: 'About you', icon: '👤' },
];

const BOT_REPLIES: Record<string, string> = {
  'Tell me about your games':
    '수학의 제왕, 강한 토끼만이 살아남는다, 판다러쉬처럼 실제로 만든 게임들을 중심으로 작업 역할과 배운 점을 소개할 수 있어요. 🎮',
  'What tech do you use?':
    '주요 작업 스택은 Unity, C#, Git이고 프로젝트에 따라 Blender 같은 아트 툴과 협업 도구도 함께 사용했습니다. 💻',
  'About you':
    '홍진호는 플레이어가 탐색하고 반응하게 되는 시스템 중심 경험을 만드는 게임 개발자입니다. 👤',
};

const DEFAULT_REPLY =
  '아직 실시간 답변 연결을 마무리하는 중입니다. 아래 견본 질문으로 시작하면 현재 포트폴리오 내용 기준으로 안내할 수 있어요. 🤖';

function getBotReply(text: string): string {
  return BOT_REPLIES[text] ?? DEFAULT_REPLY;
}

export function ChatbotPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function handleSubmit(text: string) {
    const now = Date.now();
    const userMessage: ChatMessage = {
      id: `u-${now}-${crypto.randomUUID()}`,
      role: 'user',
      content: text,
      timestamp: new Date(now),
    };
    const botMessage: ChatMessage = {
      id: `b-${now}-${crypto.randomUUID()}`,
      role: 'assistant',
      content: getBotReply(text),
      timestamp: new Date(now + 1),
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  }

  function handleSampleSelect(question: string) {
    handleSubmit(question);
  }

  return (
    <div className="hud-panel flex h-full min-h-[420px] flex-col rounded sm:min-h-[500px] lg:max-h-[70vh]">
      {/* HUD 상단 바: 하트(왼쪽) / 배터리(오른쪽) — 추후 기능 연결 예정 */}
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-2 sm:px-4">
        <div className="flex min-w-[60px] items-center gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="text-sm leading-none text-[var(--color-heart-soft)]">
              ♥
            </span>
          ))}
        </div>
        <div className="flex min-w-[40px] items-center justify-end gap-1" aria-hidden="true">
          <div className="relative flex h-3 w-6 items-center rounded-sm border border-content-dim/30 px-0.5">
            <div className="h-1.5 w-2/3 rounded-sm bg-content-dim/20" />
            <div className="absolute -right-[3px] top-1/2 h-1.5 w-[3px] -translate-y-1/2 rounded-r-sm bg-content-dim/30" />
          </div>
        </div>
      </div>

      {/* 패널 헤더 */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded border border-accent/40 bg-accent-soft text-xs text-accent">
            🤖
          </span>
          <span className="font-mono text-xs tracking-widest text-accent">PORTFOLIO_BOT</span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-content-dim">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          ONLINE
        </span>
      </div>

      {/* 메시지 영역 */}
      <ChatbotMessagePanel messages={messages} />

      {/* 견본 질문 */}
      {messages.length === 0 && (
        <ChatbotSampleQuestions questions={SAMPLE_QUESTIONS} onSelect={handleSampleSelect} />
      )}

      {/* 입력 영역 */}
      <ChatbotInputArea onSubmit={handleSubmit} />
    </div>
  );
}
