import type { Metadata } from 'next';
import { FEATURED_GAMES } from '@/data/games';

export const metadata: Metadata = {
  title: 'Hong Jinho | Game Developer',
  description: '홍진호 게임 개발자 포트폴리오',
};

const STATS = [
  { label: 'Creativity', value: 85 },
  { label: 'Problem Solving', value: 78 },
  { label: 'Teamwork', value: 72 },
];

const TECH_ICONS = [
  { label: 'Unity', bg: '#333' },
  { label: 'C#', bg: '#512BD4' },
  { label: 'Git', bg: '#F1502F' },
  { label: 'Blender', bg: '#EA7600' },
  { label: 'Ps', bg: '#31A8FF' },
  { label: 'Notion', bg: '#444' },
];

const SUGGESTIONS = [
  { icon: '🎮', text: 'Tell me about your games' },
  { icon: '🔧', text: 'What tech do you use?' },
  { icon: '👤', text: 'About you' },
];

export default function Home() {
  return (
    <div className="hud-root">
      {/* Browser-style tab bar */}
      <div className="tab-bar">
        <div className="tab-active">
          <span>🎮</span>
          <span>Hong Jinho | Game Developer</span>
        </div>
        <div className="address-bar">hongjinho.dev</div>
      </div>

      {/* Three-column HUD layout */}
      <main className="hud-layout">
        {/* ── LEFT: Character card ── */}
        <aside className="hud-panel panel-left">
          <div className="panel-corner tl" />
          <div className="panel-corner tr" />
          <div className="panel-corner bl" />
          <div className="panel-corner br" />

          <div className="level-badge">Lv. 18</div>

          <div className="avatar-wrap">
            <div className="avatar-frame">
              <span className="avatar-emoji">🧑‍💻</span>
            </div>
          </div>

          <div className="char-name">Hong Jinho</div>
          <div className="char-class">Game Developer</div>

          <p className="char-bio">
            I build playful experiences
            <br />
            and systems that players
            <br />
            love to explore.
          </p>

          <div className="stat-list">
            {STATS.map(({ label, value }) => (
              <div key={label} className="stat-row">
                <span className="stat-icon">⚡</span>
                <div className="stat-info">
                  <span className="stat-label">{label}</span>
                  <div className="stat-track">
                    <div className="stat-fill" style={{ width: `${value}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ── CENTER: Chatbot ── */}
        <section className="hud-panel panel-center">
          <div className="panel-corner tl" />
          <div className="panel-corner tr" />
          <div className="panel-corner bl" />
          <div className="panel-corner br" />

          <div className="bot-header">
            <div className="bot-avatar">🤖</div>
            <div className="bot-online" />
          </div>

          <div className="chat-bubble">
            Hello! 👋
            <br />
            I&apos;m Jinho&apos;s Portfolio Bot.
            <br />
            What would you like to know?
          </div>

          <div className="suggestion-list">
            {SUGGESTIONS.map(({ icon, text }) => (
              <button key={text} className="suggestion-btn" type="button">
                <span>{icon}</span>
                <span>{text}</span>
              </button>
            ))}
          </div>

          <div className="chat-input-row">
            <input className="chat-input" type="text" placeholder="Ask me anything..." readOnly />
            <button className="send-btn" type="button">
              ➤
            </button>
          </div>

          <button className="start-chat-btn" type="button">
            💬 Start Chat
          </button>
        </section>

        {/* ── RIGHT: Featured Games + Tech Stack ── */}
        <aside className="hud-panel panel-right">
          <div className="panel-corner tl" />
          <div className="panel-corner tr" />
          <div className="panel-corner bl" />
          <div className="panel-corner br" />

          <h3 className="panel-heading">Featured Games</h3>
          <div className="game-list">
            {FEATURED_GAMES.map(({ title, subtitle, color }) => (
              <div key={title} className="game-item">
                <div className="game-thumb" style={{ background: color }}>
                  🎮
                </div>
                <div className="game-meta">
                  <div className="game-title">{title}</div>
                  <div className="game-sub">{subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="panel-heading" style={{ marginTop: '1.25rem' }}>
            Tech Stack
          </h3>
          <div className="tech-grid">
            {TECH_ICONS.map(({ label, bg }) => (
              <div key={label} className="tech-chip" style={{ background: bg }}>
                {label}
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
