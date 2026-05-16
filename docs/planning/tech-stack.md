# 기술 스택 및 프로젝트 구조 초안

## 1. 기술 스택 선택

### 1.1 프론트엔드 프레임워크: Next.js (App Router)

| 항목 | 선택 | 비고 |
|------|------|------|
| **선택** | Next.js 14+ (App Router) | |
| **대안 1** | Vite + React SPA | 정적 배포는 쉽지만 SEO·이미지 최적화 추가 작업 필요 |
| **대안 2** | Astro | 콘텐츠 중심 사이트에 적합하나 챗봇 인터랙션 구현 시 복잡도 증가 |
| **대안 3** | Vue 3 + Nuxt | 생태계 친숙도가 낮아 개발 속도 저하 우려 |

**선택 이유**
- SSG(정적 생성)와 SSR(서버 렌더링)을 페이지별로 유연하게 혼용 가능
- 이미지 최적화(`next/image`), 폰트 최적화, 코드 스플리팅이 기본 내장
- Vercel 배포와 궁합이 가장 좋아 CI/CD 설정 비용 최소화
- 챗봇 API 라우트를 동일 레포에서 관리 가능 (`app/api/chat/route.ts`)

---

### 1.2 스타일링: Tailwind CSS + shadcn/ui

| 항목 | 선택 | 비고 |
|------|------|------|
| **선택** | Tailwind CSS v3 + shadcn/ui | |
| **대안 1** | CSS Modules | 컴포넌트 격리는 좋지만 디자인 토큰 관리 비용 증가 |
| **대안 2** | Styled Components | 런타임 CSS-in-JS는 LCP에 불리 |
| **대안 3** | Chakra UI | 번들 사이즈가 크고 커스터마이징 자유도가 낮음 |

**선택 이유**
- 유틸리티 클래스 기반으로 디자인 일관성을 코드 레벨에서 강제
- shadcn/ui는 컴포넌트를 소스 코드로 직접 가져오므로 번들 사이즈 최소화
- 다크 모드 토글을 `class` 전략으로 간단히 구현 가능
- 포트폴리오 특성상 CSS 프레임워크보다 빠른 반응형 프로토타이핑이 중요

**테마 방향**: 다크 모드 기본, 게임 개발자 정체성에 맞게 진한 배경 + 네온 계열 강조색

---

### 1.3 상태 관리: React Server Components + Zustand (최소한)

| 항목 | 선택 | 비고 |
|------|------|------|
| **선택** | RSC 우선, 클라이언트 상태는 Zustand | |
| **대안 1** | Redux Toolkit | 보일러플레이트 과도, 포트폴리오 규모에 과잉 |
| **대안 2** | Jotai / Recoil | Zustand 대비 생태계 성숙도 낮음 |
| **대안 3** | Context API only | 챗봇 대화 기록 등 전역 상태가 많아지면 re-render 이슈 |

**선택 이유**
- 게임 목록, 프로젝트 상세 데이터는 빌드 타임에 정적으로 처리(RSC)
- 챗봇 대화 기록, UI 상태(모달, 사이드바)만 클라이언트 상태로 관리
- Zustand는 설정 없이 바로 사용 가능하고 번들 크기가 작음(~1KB)

---

### 1.4 언어: TypeScript

- 전체 코드베이스에 TypeScript 적용 (strict mode)
- 게임 데이터 타입, API 응답 타입을 `types/` 디렉터리에 중앙 관리
- JavaScript 혼용 금지 (`.js` 파일 허용 안 함)

---

### 1.5 배포: Vercel

| 항목 | 선택 | 비고 |
|------|------|------|
| **선택** | Vercel | |
| **대안 1** | Netlify | Next.js App Router 일부 기능 제한 |
| **대안 2** | AWS Amplify | 설정 복잡도 높고 냉각 비용 발생 가능 |
| **대안 3** | GitHub Pages | Next.js SSR/API 라우트 사용 불가 |

**선택 이유**
- Next.js 공식 호스팅 플랫폼으로 Zero-config 배포 지원
- 브랜치별 Preview URL 자동 생성 → PR 리뷰 시 직접 확인 가능
- Edge Function으로 챗봇 프록시 엔드포인트 운영 가능
- 무료 플랜으로 개인 포트폴리오 운영 가능

---

## 2. 챗봇 연동 방향

### 2.1 로컬 LLM 기반 (1차 목표)

- **모델**: Ollama를 맥미니에 설치, `llama3` 또는 `gemma2` 계열 운영
- **연동 구조**:
  ```
  브라우저 → Next.js API Route (/api/chat) → 맥미니 Ollama 서버 (HTTP)
  ```
- **컨텍스트 주입**: 홍진호의 이력, 프로젝트 데이터를 시스템 프롬프트로 주입
- **포트 포워딩**: 맥미니 로컬 IP 또는 ngrok/Cloudflare Tunnel로 외부 노출

### 2.2 폴백 전략 (로컬 서버 다운 시)

- Ollama 서버 응답 없음 → 사전 정의된 FAQ 답변 반환
- UI에 "현재 AI가 응답할 수 없습니다. 직접 연락해 주세요." 메시지 표시
- 연락처(이메일, GitHub) 링크 제공

### 2.3 초기 구현 범위

- [ ] 기본 대화 흐름 (질문 입력 → 스트리밍 응답 출력)
- [ ] 홍진호 소개 데이터 시스템 프롬프트 구성
- [ ] 대화 기록 세션 내 유지 (새로고침 시 초기화)
- [ ] 로딩 스피너 및 오류 처리 UI

### 2.4 초기 범위 제외

- 대화 기록 영구 저장 (DB 불필요)
- 멀티턴 RAG 파이프라인 (1차에서는 시스템 프롬프트로 대체)
- 사용자 인증 또는 대화 로그 수집

---

## 3. 초기 디렉터리 구조

```
/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # 공통 레이아웃 (헤더, 챗봇 버튼)
│   ├── page.tsx                # 메인(게임 목록) 페이지
│   ├── games/
│   │   └── [slug]/
│   │       └── page.tsx        # 게임 상세 페이지
│   └── api/
│       └── chat/
│           └── route.ts        # 챗봇 API 엔드포인트
│
├── components/
│   ├── ui/                     # shadcn/ui 기본 컴포넌트
│   ├── GameCard.tsx            # 게임 목록 카드
│   ├── ChatBot.tsx             # 챗봇 UI 컴포넌트
│   └── NavBar.tsx              # 공통 내비게이션
│
├── data/
│   └── games.ts                # 게임 데이터 (정적)
│
├── types/
│   ├── game.ts                 # 게임 데이터 타입
│   └── chat.ts                 # 챗봇 메시지 타입
│
├── lib/
│   ├── ollama.ts               # Ollama API 클라이언트
│   └── system-prompt.ts        # 챗봇 시스템 프롬프트
│
├── public/
│   └── images/games/           # 게임 스크린샷
│
├── docs/                       # 프로젝트 문서 (현재 디렉터리)
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. 개발 원칙

### 4.1 코드 품질

- TypeScript strict mode 필수
- ESLint + Prettier 설정으로 코드 스타일 통일
- 컴포넌트는 단일 책임 원칙 준수

### 4.2 성능

- 이미지는 모두 `next/image` 사용 (자동 최적화)
- 게임 데이터는 빌드 타임에 정적 생성 (getStaticProps 대신 RSC)
- 챗봇 컴포넌트는 `dynamic import`로 지연 로딩

### 4.3 접근성

- 모든 인터랙티브 요소에 키보드 접근 가능
- 이미지에 `alt` 텍스트 필수
- 색상 대비 WCAG AA 기준 준수

### 4.4 배포 전 체크리스트

- [ ] 모든 외부 링크(Itch.io) 동작 확인
- [ ] 모바일(375px) 레이아웃 검증
- [ ] Ollama 서버 다운 시 폴백 UI 동작 확인
- [ ] Lighthouse 점수 Performance 80점 이상

---

## 5. 기술 부채 및 추후 검토 사항

| 항목 | 현재 결정 | 추후 검토 트리거 |
|------|-----------|-----------------|
| 챗봇 모델 | 로컬 Ollama | 응답 품질 불만족 시 Claude API 전환 고려 |
| 데이터 저장 | 정적 파일 | 게임이 10개 이상으로 늘면 CMS 도입 검토 |
| 인증 | 없음 | 관리자 기능 필요 시 추가 |
| 다국어 | 한국어 단일 | 영문 버전 요청 시 next-intl 도입 |
