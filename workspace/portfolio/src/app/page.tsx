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
      {/* 헤더 */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-surface)",
          boxShadow: "var(--shadow-sm)",
          position: "sticky",
          top: 0,
          zIndex: 100,
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
        <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a
            href="#about"
            style={{
              color: "var(--color-fg-secondary)",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            소개
          </a>
          <a
            href="#projects"
            style={{
              color: "var(--color-fg-secondary)",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            프로젝트
          </a>
          <ThemeToggle />
        </nav>
      </header>

      {/* 히어로 */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8rem 2rem",
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
            lineHeight: 1.7,
          }}
        >
          Unity · C# · 인터랙티브 경험 설계
          <br />
          재미있는 경험을 코드로 구현합니다.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
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
          <a
            href="#about"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              backgroundColor: "transparent",
              color: "var(--color-teal)",
              borderRadius: "0.5rem",
              fontWeight: 600,
              textDecoration: "none",
              border: "2px solid var(--color-teal)",
            }}
          >
            소개 보기
          </a>
        </div>
      </section>

      {/* 소개 */}
      <section
        id="about"
        style={{
          padding: "4rem 2rem",
          maxWidth: "48rem",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            marginBottom: "1rem",
            color: "var(--color-game-blue)",
          }}
        >
          개발자 소개
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-fg-secondary)",
            lineHeight: 1.8,
          }}
        >
          Unity와 C#을 주력으로 게임 개발을 해 온 개발자입니다. 게임플레이 메카닉 설계부터
          실제 플레이어 경험까지, 결과물 중심으로 작업합니다.
        </p>
      </section>

      {/* 프로젝트 */}
      <section
        id="projects"
        style={{
          padding: "4rem 2rem",
          maxWidth: "64rem",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            marginBottom: "2rem",
            color: "var(--color-game-blue)",
          }}
        >
          게임 프로젝트
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* 프로젝트 카드 플레이스홀더 — 추후 실제 데이터로 교체 */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                borderRadius: "0.75rem",
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-bg-surface)",
                boxShadow: "var(--shadow-sm)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "10rem",
                  backgroundColor: "var(--color-bg-elevated)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-fg-muted)",
                  fontSize: "0.875rem",
                }}
              >
                게임 스크린샷
              </div>
              <div style={{ padding: "1.25rem" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--color-fg-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  프로젝트 {i}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-fg-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  게임 설명이 들어갑니다. 사용 기술, 역할, 배운 점 등.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
