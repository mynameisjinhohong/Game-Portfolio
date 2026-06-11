# 디자인 토큰 기준안

**기준 컨셉:** A-04 — 밝은 Soft Cream 배경의 Game HUD 감성 테마  
**토큰 파일:** `workspace/src/styles/tokens.css`  
**로딩 위치:** `workspace/src/app/layout.tsx`, `workspace/src/app/globals.css`

> 이 문서는 새 컴포넌트를 만들거나 기존 스타일을 수정할 때의 기준안이다. 색상·간격·폰트 값을 직접 hex/px로 쓰지 말고 아래 토큰 변수를 사용한다.

## 사용 흐름 요약

1. `src/styles/tokens.css`에 CSS 변수를 정의한다(아래 표 참고).
2. `src/app/globals.css` 상단에서 `@import '../styles/tokens.css';`로 한 번만 import한다.
3. 컴포넌트는 `var(--color-bg-base)`, `var(--text-base)` 같은 변수만 참조한다.
4. 폰트는 `src/app/layout.tsx`에서 `next/font/google`로 로딩하며, 결과 CSS 변수(`--font-inter` 등)를 토큰에서 다시 참조한다.

---

## 컬러 토큰

### 배경 (Background)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--color-bg-base` | `#FDFCF7` | 페이지 최상위 배경 (Soft Cream) |
| `--color-bg-surface` | `#F4F0EB` | 카드·패널 배경 |
| `--color-bg-panel` | `rgba(244, 240, 235, 0.85)` | 반투명 HUD 패널 |
| `--color-bg-tab` | `#E9E3DB` | 탭 바 배경 |
| `--color-bg-input` | `rgba(0, 0, 0, 0.04)` | 인풋·버튼 기본 배경 |

### 텍스트 (Text)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--color-text-primary` | `#36454F` | 본문, 기본 레이블 (Graphite) |
| `--color-text-muted` | `#6C7B8A` | 보조 텍스트, 플레이스홀더 |
| `--color-text-white` | `#ffffff` | 이름·강조 텍스트 (다크 컨텐츠용) |
| `--color-text-inverse` | `#000000` | 밝은 배경 위 텍스트 (CTA 버튼 내) |

### 강조 (Accent)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--color-accent-primary` | `#00c8ff` | HUD 포인트, 링크, 포커스 링 (Teal-Cyan) |
| `--color-accent-secondary` | `#f4a23a` | 서브 강조, 경고 (Amber) |
| `--color-accent-cta` | `#f4845a` | CTA 버튼 (`START CHAT` 등) (Orange) |
| `--color-accent-success` | `#2ecc71` | 온라인 상태, 완료 (Green) |

### 테두리 (Border)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--color-border-default` | `#D3CDC7` | 패널·카드 테두리 |
| `--color-border-accent` | `var(--color-accent-primary)` | 포커스·호버 테두리 |

---

## 타이포그래피

### 폰트 패밀리

| 토큰 | 폰트 | 용도 |
|------|------|------|
| `--font-sans` | Inter | 본문, UI 레이블, 입력 |
| `--font-heading` | Rajdhani | 섹션 제목, 캐릭터 이름 |
| `--font-mono` | JetBrains Mono | 수치, 코드, HUD stat |

> 폰트는 `next/font/google`으로 로딩되며, CSS 변수 `--font-inter` / `--font-rajdhani` / `--font-jetbrains-mono`로 주입됩니다. 별도 폰트 파일을 `public/fonts`에 두지 않고 Next.js 폰트 최적화 파이프라인을 사용합니다.

### 폰트 로딩 설정 (`workspace/src/app/layout.tsx`)

```ts
// Inter: subsets latin, display swap
// Rajdhani: weight 400/500/600/700, subsets latin, display swap
// JetBrains Mono: subsets latin, display swap
```

세 폰트의 `variable` 값을 `<html>` className에 결합해 페이지 전역에서 CSS 변수로 사용할 수 있도록 합니다.

### 폰트 굵기 사용 규칙

| 굵기 | 토큰 | 주요 사용처 |
|------|------|------------|
| 400 | `--weight-regular` | 본문, 채팅 메시지 |
| 500 | `--weight-medium` | 보조 레이블 |
| 600 | `--weight-semibold` | 버튼, 게임 제목 |
| 700 | `--weight-bold` | 섹션 헤딩, 이름, 배지 |

### 폰트 크기 스케일

| 토큰 | 크기 | 용도 |
|------|------|------|
| `--text-xs` | 0.68rem (~11px) | 배지, 레이블 |
| `--text-sm` | 0.75rem (12px) | 보조 텍스트 |
| `--text-base` | 0.875rem (14px) | 기본 UI 텍스트 |
| `--text-md` | 1rem (16px) | 본문 |
| `--text-lg` | 1.125rem (18px) | 서브 헤딩 |
| `--text-xl` | 1.25rem (20px) | 헤딩 |
| `--text-2xl` | 1.5rem (24px) | 섹션 타이틀 |
| `--text-3xl` | 2rem (32px) | 히어로 타이틀 |

---

## 간격 (Spacing)

4px 기본 단위의 스케일. `--space-1`(4px) ~ `--space-10`(40px).

---

## 반경 (Border Radius)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--radius-sm` | 4px | 배지, 칩 |
| `--radius-md` | 6px | HUD 패널 기본 |
| `--radius-lg` | 8px | 버튼, 인풋 |
| `--radius-xl` | 12px | 채팅 버블 |
| `--radius-full` | 9999px | 아바타, 온라인 dot |

---

## 쉐도우 / 글로우

| 토큰 | 용도 |
|------|------|
| `--shadow-glow-primary` | 아바타·패널 Teal glow |
| `--shadow-glow-cta` | CTA 버튼 orange glow |

---

## 전환 (Transition)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--transition-fast` | 0.12s ease | 즉각 피드백 |
| `--transition-normal` | 0.18s ease | 기본 hover |
| `--transition-slow` | 0.3s ease | 페이드·슬라이드 |

---

## 레거시 HUD 별칭 (호환 매핑)

기존 GP-45 단계에서 도입된 `--color-hud-*` 변수는 `src/app/globals.css`에서 신규 시맨틱 토큰으로 매핑된다. 이미 사용 중인 컴포넌트는 그대로 두되, **새로 추가하는 코드에서는 시맨틱 토큰을 사용한다.**

| 레거시 변수 | 매핑 대상 |
|---|---|
| `--color-hud-bg` | `--color-bg-base` |
| `--color-hud-panel`, `--color-hud-surface` | `--color-bg-surface` |
| `--color-hud-border` | `--color-border-default` |
| `--color-hud-teal`, `--color-hud-accent` | `--color-accent-primary` |
| `--color-hud-orange` | `--color-accent-cta` |
| `--color-hud-green` | `--color-accent-success` |
| `--color-hud-text` | `--color-text-primary` |
| `--color-hud-muted` | `--color-text-muted` |
| `--color-hud-heading` | `--color-text-white` |

---

## 폰트 자산 운영 규칙

- 폰트 패밀리는 `next/font/google`이 제공하는 최적화 파이프라인만 사용한다. 따라서 `public/fonts/`에 별도 폰트 파일을 추가하지 않는다.
- `layout.tsx`에서 변수 이름(`--font-inter`, `--font-rajdhani`, `--font-jetbrains-mono`)을 지정하고, `<html>` className에 결합한다.
- `tokens.css`의 `--font-sans / --font-heading / --font-mono`는 이 변수를 1차로 참조하고, 시스템 폰트는 폴백으로만 둔다.
- 폰트 굵기는 [폰트 굵기 사용 규칙](#폰트-굵기-사용-규칙) 표에 정의된 4단계만 사용한다.

## 새 토큰 추가 절차

1. `workspace/src/styles/tokens.css`의 해당 섹션(컬러·타이포·간격 등)에 변수를 추가한다.
2. 이 문서의 해당 표에 토큰 이름·값·용도를 한 줄 추가한다.
3. 레거시 변수와 의미가 겹치면 [레거시 HUD 별칭](#레거시-hud-별칭-호환-매핑) 표를 갱신하고, `globals.css`의 별칭 매핑도 함께 수정한다.
4. 후속 작업자가 토큰 사용을 검토할 수 있도록 PR 설명에 적용 범위를 남긴다.
