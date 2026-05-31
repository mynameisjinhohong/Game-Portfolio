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
| `npm run start`        | 프로덕션 서버 실행        |
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

## 배포 가이드 (Mac mini 웹서버)

이 포트폴리오는 Mac mini를 웹서버로 활용하여 배포하는 것을 전제로 설계되었습니다.

### 프로덕션 빌드 및 실행

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행 (기본 포트 3000)
npm run start

# 특정 포트로 실행
npm run start -- -p 8080
```

### 환경 변수 (프로덕션)

`.env.local`에서 아래 값을 실제 환경에 맞게 수정합니다.

```env
# 구매한 도메인으로 변경
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Ollama가 Mac mini에서 실행 중인 경우
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
