# Game Portfolio

홍진호의 게임 개발 포트폴리오 사이트입니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
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

| 명령어                 | 설명                      |
| ---------------------- | ------------------------- |
| `npm run dev`          | 개발 서버 실행            |
| `npm run build`        | 프로덕션 빌드             |
| `npm run lint`         | ESLint 검사               |
| `npm run format`       | Prettier 포맷 적용        |
| `npm run format:check` | Prettier 포맷 검사 (CI용) |

## 프로젝트 구조

```
portfolio/
├── src/
│   └── app/          # Next.js App Router 페이지
├── .env.example      # 환경 변수 예시
├── .prettierrc       # Prettier 설정
├── eslint.config.mjs # ESLint 설정
└── tailwind.config.* # Tailwind 설정
```
