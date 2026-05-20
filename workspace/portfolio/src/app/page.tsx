import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg-base)",
        color: "var(--color-fg-primary)",
      }}
    >
      {/* 헤더 — 테마 토글 노출 */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-surface)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <span
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--color-teal)",
            letterSpacing: "-0.01em",
          }}
        >
          홍진호
        </span>
        <ThemeToggle />
      </header>

      {/* 히어로 */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "6rem 2rem",
          gap: "1.5rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "var(--color-fg-primary)",
            lineHeight: 1.15,
          }}
        >
          게임을 만드는 개발자
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--color-fg-secondary)",
            maxWidth: "40rem",
          }}
        >
          Unity · C# · 인터랙티브 경험 설계
        </p>
        <a
          href="#projects"
          style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            backgroundColor: "var(--color-orange)",
            color: "#ffffff",
            borderRadius: "0.5rem",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "var(--shadow-md)",
          }}
        >
          프로젝트 보기
        </a>
      </section>

      {/* 컬러 토큰 확인용 팔레트 (개발 중 시각화) */}
      <section
        id="projects"
        style={{
          padding: "3rem 2rem",
          maxWidth: "48rem",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
            color: "var(--color-game-blue)",
          }}
        >
          테마 토큰 팔레트
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {[
            { label: "bg-base", var: "--color-bg-base" },
            { label: "bg-surface", var: "--color-bg-surface" },
            { label: "bg-elevated", var: "--color-bg-elevated" },
            { label: "fg-primary", var: "--color-fg-primary" },
            { label: "fg-secondary", var: "--color-fg-secondary" },
            { label: "teal", var: "--color-teal" },
            { label: "game-blue", var: "--color-game-blue" },
            { label: "orange", var: "--color-orange" },
          ].map((token) => (
            <div
              key={token.var}
              style={{
                borderRadius: "0.5rem",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  height: "3rem",
                  backgroundColor: `var(${token.var})`,
                  border: "1px solid var(--color-border-strong)",
                }}
              />
              <div
                style={{
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.75rem",
                  color: "var(--color-fg-secondary)",
                  backgroundColor: "var(--color-bg-elevated)",
                }}
              >
                {token.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
