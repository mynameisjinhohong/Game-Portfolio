'use client';

import { useState } from 'react';

const SUGGESTIONS = [
  { icon: '🎮', text: '어떤 게임들을 만들었나요?' },
  { icon: '🔧', text: '주로 사용하는 기술 스택은 무엇인가요?' },
  { icon: '💡', text: '가장 인상 깊었던 프로젝트는 무엇인가요?' },
  { icon: '🚀', text: '개발자로서 어떤 강점을 가지고 있나요?' },
];

export default function ChatbotPanel() {
  const [inputValue, setInputValue] = useState('');

  function handleSuggestionClick(text: string) {
    setInputValue(text);
  }

  function handleSend() {
    if (!inputValue.trim()) return;
    // TODO: integrate with LLM API (GP-39 / Ollama)
    setInputValue('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend();
  }

  const isEmpty = inputValue.trim() === '';

  return (
    <>
      <div className="bot-header">
        <div className="bot-avatar">🤖</div>
        <div className="bot-online" />
      </div>

      <div className="chat-bubble">
        안녕하세요! 👋
        <br />
        저는 진호의 포트폴리오 봇이에요.
        <br />
        게임 프로젝트, 기술 스택, 개발 경험 등
        <br />
        무엇이든 질문해 보세요.
      </div>

      <div className="suggestion-label">추천 질문</div>

      <div className="suggestion-list">
        {SUGGESTIONS.map(({ icon, text }) => (
          <button
            key={text}
            className="suggestion-btn"
            type="button"
            onClick={() => handleSuggestionClick(text)}
          >
            <span>{icon}</span>
            <span>{text}</span>
          </button>
        ))}
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          type="text"
          placeholder="질문을 입력하거나 위 카드를 클릭하세요…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="send-btn"
          type="button"
          onClick={handleSend}
          disabled={isEmpty}
          style={{ opacity: isEmpty ? 0.45 : 1 }}
        >
          ➤
        </button>
      </div>

      <button className="start-chat-btn" type="button" onClick={handleSend} disabled={isEmpty}>
        💬 대화 시작
      </button>
    </>
  );
}
