# Game Portfolio

홍진호의 게임 개발 포트폴리오 사이트입니다.

이 레포지토리의 활성 개발 코드는 `workspace/src/`에 둡니다. `workspace/portfolio/` 같은 중첩 Next.js 앱을 새로 만들지 말고, Next.js 앱 루트는 항상 `workspace/` 하나만 사용합니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Lint**: ESLint (next/core-web-vitals)
- **Format**: Prettier

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local`을 열어 필요한 값을 채웁니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 주요 스크립트

| 명령어                 | 설명               |
| ---------------------- | ------------------ |
| `npm run dev`          | 개발 서버 실행     |
| `npm run build`        | 프로덕션 빌드      |
| `npm run start`        | 프로덕션 서버 실행 |
| `npm run lint`         | ESLint 검사        |
| `npm run format`       | Prettier 포맷 적용 |
| `npm run format:check` | Prettier 포맷 검사 |

## 반응형·테마 가이드

### 모바일 우선 레이아웃

- 모든 화면은 모바일 폭(약 360–414px)에서 검증한 뒤 데스크톱 폭으로 확장합니다.
- Tailwind 브레이크포인트는 기본값을 그대로 사용합니다. `sm:` (≥640px), `md:` (≥768px), `lg:` (≥1024px), `xl:` (≥1280px).
- hover 의존 표현은 모바일에서 항상 보이도록 대체합니다. CSS에서 `@media (hover: none)` 분기(`workspace/src/app/globals.css`의 `.hud-panel-clickable`)를 활용하거나 컴포넌트에서 hover 상태를 기본 노출로 바꿉니다.
- 카드·리스트는 `grid`가 무너지지 않도록 모바일에서 1열, 태블릿에서 2열, 데스크톱에서 3열 이상으로 단계적으로 늘립니다.
- 이미지·미디어는 `aspect-*` 또는 명시적 비율 래퍼로 감싸 비율을 고정하고, 좁은 화면에서 잘리지 않게 `object-cover` 또는 `object-contain`을 선택합니다.

### 라이트/다크 테마 시스템

- 테마 토글은 `workspace/src/lib/theme/ThemeProvider.tsx`가 담당합니다. `<html>`에 `dark` 클래스를 토글해 라이트(기본)와 다크 모드를 전환합니다.
- 초기 테마는 (1) `localStorage('portfolio-theme')` 저장값 → (2) 사용자 시스템의 `prefers-color-scheme` → (3) 라이트 순으로 결정됩니다. SSR 깜빡임을 막기 위해 `workspace/src/app/layout.tsx` 상단에서 인라인 부트스트랩 스크립트를 실행합니다.
- 색은 절대 하드코딩하지 않습니다. `workspace/src/app/globals.css`의 `:root` / `:root.dark` CSS 변수를 사용하고, Tailwind에서는 `workspace/tailwind.config.ts`에 등록된 의미 토큰만 사용합니다.
  - 권장: `bg-bg`, `bg-bg-elevated`, `bg-panel`, `text-content`, `text-content-dim`, `border-border`, `bg-accent-soft`, `text-accent`, `text-cta`, `bg-cta-soft` 등.
  - 하위 호환: 과거에 사용하던 `hud-*` 계열(`bg-hud-bg`, `text-hud-text` 등)은 동일 CSS 변수로 매핑되어 있어 라이트/다크 모두에서 자동으로 색이 바뀝니다. 새 코드에서는 의미 토큰을 우선 사용합니다.
- 새 색이 필요하면 `globals.css`의 `:root`와 `:root.dark` 두 곳을 함께 정의하고, `tailwind.config.ts`의 `theme.extend.colors`에 토큰을 추가합니다. 한쪽만 정의해 테마 전환 시 튀는 색이 남지 않도록 합니다.
- 접근성: 모든 텍스트와 인터랙티브 컴포넌트는 두 모드 모두에서 대비를 검증합니다. 입력 박스·버튼 등 폼 컨트롤은 라이트/다크 모드 각각에서 placeholder와 disabled 상태가 읽히는지 확인합니다.
- 디버깅: 헤더의 `ThemeToggle` 버튼으로 즉시 전환할 수 있고, 시스템 설정에서 다크 모드를 켜둔 첫 방문이라면 자동으로 다크가 적용됩니다.

## 프로젝트 구조

```text
workspace/
├── assets/           # A-04 기반 이미지, 프롬프트, 참조 자료
├── docs/             # A-04 기반 설계/분석 문서
│   └── design/       # 디자인 토큰·타이포 등 디자인 시스템 문서
├── src/
│   ├── app/          # Next.js App Router 루트, 전역 스타일(globals.css)
│   ├── components/   # 화면별 UI 컴포넌트
│   ├── data/         # 컴포넌트가 참조하는 정적 데이터
│   ├── lib/          # 공통 유틸리티
│   ├── styles/       # 디자인 토큰 CSS 변수(tokens.css)
│   └── types/        # 공용 타입 정의
├── .env.example      # 환경 변수 예시
├── .prettierrc       # Prettier 설정
├── eslint.config.mjs # ESLint 설정
└── package.json      # 단일 Next.js 앱 루트
```

## 디자인 토큰과 폰트

전체 색상·타이포·간격 토큰의 기준안은 [`workspace/docs/design/design-tokens.md`](docs/design/design-tokens.md)에서 확인합니다.

- 토큰 CSS 변수는 `src/styles/tokens.css`에 정의하고 `src/app/globals.css`에서 한 번만 import합니다. 새 컴포넌트는 직접 hex 색상을 쓰지 말고 토큰 변수(`var(--color-...)`, `var(--text-...)`)를 사용합니다.
- 폰트는 `next/font/google`로 로딩하며(`src/app/layout.tsx`), Inter / Rajdhani / JetBrains Mono가 각각 `--font-inter`, `--font-rajdhani`, `--font-jetbrains-mono` 변수로 주입됩니다. 별도 폰트 파일은 저장소에 두지 않습니다.
- 기존 컴포넌트가 사용하는 `--color-hud-*` 등 레거시 변수는 `globals.css`에서 신규 토큰으로 매핑되어 있어 동시 사용이 가능합니다.

## 배포 가이드 (Mac mini 웹서버)

이 포트폴리오는 Mac mini를 웹서버로 활용하여 배포하는 것을 전제로 설계되었습니다.

### 프로덕션 빌드 및 실행

```bash
npm run build
npm run start
```

특정 포트로 실행하려면 다음처럼 지정합니다.

```bash
npm run start -- -p 8080
```

### 환경 변수 (프로덕션)

`.env.local`에서 아래 값을 실제 환경에 맞게 수정합니다.

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:11434
NODE_ENV=production
```

### 도메인 연결

1. 도메인 구매 후 DNS A 레코드를 Mac mini의 공인 IP로 설정합니다.
2. 리버스 프록시(nginx 또는 Caddy)를 통해 80/443 포트를 Next.js 서버로 포워딩합니다.
3. SSL 인증서는 Let's Encrypt(certbot)를 사용하여 무료로 발급받을 수 있습니다.

### 프로세스 관리

서버 재시작 시 자동으로 실행되도록 PM2를 권장합니다.

```bash
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```
