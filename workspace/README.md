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
