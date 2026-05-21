# 포트폴리오 섹션별 콘텐츠 배치 정의서

> 작성 기준: GP-52 (GP-51 포지셔닝 문서 반영)  
> 목적: 구현팀이 UI 설계와 데이터 파일 작성을 바로 시작할 수 있도록 섹션별 목적·메시지·데이터 항목을 구체적으로 정의한다.  
> 참조: `docs/research/developer-positioning.md` (GP-51)

---

## 0. 데이터 파일 규칙

### 파일 위치 및 네이밍

| 파일 경로 | 내용 | 타입 |
|-----------|------|------|
| `data/hero.ts` | 히어로 섹션 데이터 | `HeroData` |
| `data/games.ts` | 게임 목록 + 상세 | `GameDetail[]` |
| `data/tech-stack.ts` | 기술 스택 목록 | `TechItem[]` |
| `data/about.ts` | 소개 섹션 데이터 | `AboutData` |
| `lib/chatbot-context.ts` | 챗봇 컨텍스트 데이터 | `ChatbotContext` |
| `lib/system-prompt.ts` | 챗봇 시스템 프롬프트 생성 함수 | `() => string` |

### 콘텐츠 파일 구조 규칙

- 모든 데이터 파일은 TypeScript로 작성하고 `as const` 또는 타입 어노테이션을 명시한다.
- 파일 자체가 데이터 소스이므로 JSON/YAML 파일은 별도로 만들지 않는다 (빌드 타임 정적 처리).
- 각 파일은 단일 named export 하나만 가진다 (`export const games: GameDetail[] = [...]`).
- 이미지 경로는 `public/` 기준 절대 경로로 통일한다 (예: `/images/games/slug/thumbnail.webp`).

### 타입 파일 위치

| 파일 경로 | 내보내는 타입 |
|-----------|--------------|
| `types/hero.ts` | `HeroData` |
| `types/game.ts` | `GameCard`, `GameDetail` |
| `types/tech.ts` | `TechItem` |
| `types/about.ts` | `AboutData` |
| `types/chatbot.ts` | `ChatbotContext`, `FaqItem` |

---

## 1. 히어로 섹션 (Hero Section)

### 목적

첫 방문자가 10초 이내에 "홍진호가 게임을 만드는 개발자"임을 인식하게 한다.  
긴 소개 대신 핵심 정체성과 대표 결과물을 즉시 노출한다.

### 핵심 메시지

> **"그 무엇이든 어떻게든 해내는 게임 개발자, 홍진호입니다."**

보조 문구: "일부 게임은 지금 바로 Itch.io에서 플레이할 수 있습니다."

*출처: GP-51 포지셔닝 문서 — 노션 이력서 슬로건 계승*

### 레이아웃 구성

| 위치 | 요소 | 내용 |
|------|------|------|
| 중앙 상단 | 이름 + 직함 | 홍진호 · 게임 개발자 |
| 이름 아래 | 슬로건 | "그 무엇이든 어떻게든 해내는 게임 개발자" |
| 슬로건 아래 | 한 줄 서브카피 | "Unity / C# · Itch.io에 플레이 가능한 게임 보유" |
| 우측 또는 배경 | 대표 게임 스크린샷 또는 루프 영상 | featured 게임 1종 |
| 하단 CTA | 버튼 2개 | "게임 갤러리 보기" (`#games`) / "Itch.io 바로가기" (외부) |
| 우하단 플로팅 | 챗봇 진입 버튼 | 전 섹션에서 고정 표시 |

### 필요한 데이터 항목

```ts
// types/hero.ts
export interface HeroData {
  name: string;           // "홍진호"
  title: string;          // "게임 개발자"
  slogan: string;         // "그 무엇이든 어떻게든 해내는 게임 개발자"
  subCopy: string;        // 한 줄 서브카피
  featuredMedia: {
    type: "image" | "video";
    src: string;          // "/images/hero/featured.webp" 또는 영상 URL
    alt: string;
  };
  cta: {
    primary: { label: string; href: string };   // 내부 앵커
    secondary: { label: string; href: string };  // 외부 URL
  };
  socialLinks: {
    github: string;       // "https://github.com/mynameisjinhohong"
    itchio: string;       // "https://mynameisjinhohong.itch.io"
    email: string;        // "ghddhksduq@gmail.com"
  };
}
```

### 콘텐츠 초안 (`data/hero.ts`)

```ts
import type { HeroData } from "@/types/hero";

export const hero: HeroData = {
  name: "홍진호",
  title: "게임 개발자",
  slogan: "그 무엇이든 어떻게든 해내는 게임 개발자",
  subCopy: "Unity / C#으로 직접 기획·개발하고 Itch.io에 배포한 게임들이 있습니다.",
  featuredMedia: {
    type: "image",
    src: "/images/hero/featured.webp",
    alt: "대표 게임 스크린샷",
  },
  cta: {
    primary: { label: "게임 갤러리 보기", href: "#games" },
    secondary: { label: "Itch.io 바로가기", href: "https://mynameisjinhohong.itch.io" },
  },
  socialLinks: {
    github: "https://github.com/mynameisjinhohong",
    itchio: "https://mynameisjinhohong.itch.io",
    email: "ghddhksduq@gmail.com",
  },
};
```

---

## 2. 게임 갤러리 섹션 (Game Gallery Section)

### 목적

홍진호가 만든 게임들을 카드 형태로 나열해 면접관이 실제 결과물에 빠르게 접근할 수 있도록 한다.  
텍스트 설명보다 스크린샷·링크·기술 태그를 우선 노출한다.

### 핵심 메시지

> "직접 플레이하거나 코드를 확인할 수 있는 게임들입니다."

### 레이아웃 구성

| 요소 | 설명 |
|------|------|
| 섹션 제목 | "게임 포트폴리오" |
| 필터 탭 | 플랫폼(전체 / Itch.io 플레이 가능 / Windows), 장르(전체 / 퍼즐 / 액션 / 기타) |
| 정렬 드롭다운 | 기본(추천순) / 최신순 / 수상작 먼저 |
| 카드 그리드 | 반응형: 모바일 1열 / 태블릿 2열 / 데스크톱 3열 |
| 추천 게임 | `featured: true`인 게임 상단 고정 + 강조 테두리 |

### 필터 및 정렬 기준 (구체화)

#### 필터 기준

| 필터 | 값 목록 | 비고 |
|------|---------|------|
| 플랫폼 | `"webgl"` (Itch.io WebGL), `"windows"` (PC 빌드), `"all"` | 게임별로 복수 플랫폼 가능 |
| 장르 | `"puzzle"`, `"action"`, `"rpg"`, `"etc"` | `genre` 배열의 첫 번째 값 기준으로 분류 |

#### 정렬 기준

| 정렬 옵션 | 로직 |
|-----------|------|
| 추천순 (기본) | `featured: true` 게임 우선, 이후 `publishedAt` 내림차순 |
| 최신순 | `publishedAt` 내림차순 |
| 수상작 먼저 | `awards` 배열 길이 내림차순, 이후 `publishedAt` 내림차순 |

### 게임 카드 표시 항목

| 항목 | 표시 방식 |
|------|-----------|
| 썸네일 | 16:9 비율 이미지 |
| 게임 제목 | Bold, 카드 하단 |
| 한 줄 설명 | 30자 이내, 제목 아래 |
| 장르 / 플랫폼 태그 | 작은 배지 |
| Itch.io 배포 배지 | 초록 배지 "플레이 가능" (`itchUrl`이 있을 때만) |
| 수상 배지 | 금색 배지 (예: "우수상") (`awards` 항목이 있을 때만) |
| Hover 시 | 기술 스택 툴팁 오버레이 |

### 타입 정의

```ts
// types/game.ts

export type Platform = "webgl" | "windows" | "mac";
export type Genre = "puzzle" | "action" | "rpg" | "simulation" | "etc";

export interface GameCard {
  id: string;             // URL slug (예: "rabbit-survival")
  title: string;
  shortDescription: string;   // 30자 이내
  thumbnail: string;          // "/images/games/{id}/thumbnail.webp"
  genre: Genre[];             // 첫 번째 값이 대표 장르
  platform: Platform[];       // 복수 플랫폼 허용
  techStack: string[];        // ["Unity", "C#"]
  itchUrl?: string;           // 없으면 배지 미표시
  githubUrl?: string;
  featured: boolean;
  awards: string[];           // 수상명 목록 (없으면 빈 배열)
}

export interface GameDetail extends GameCard {
  description: string;              // 상세 소개 (마크다운 허용)
  role: string[];                   // ["개발", "기획", "디자인"]
  features: string[];               // 주요 기능 불릿 목록
  learnings: string[];              // 배운 점 2~4개
  screenshots: string[];            // ["/images/games/{id}/01.webp", ...]
  videoUrl?: string;                // 유튜브 또는 직접 업로드 URL
  publishedAt: string;              // ISO 날짜 문자열 (예: "2024-03-15")
  projectPeriod: {
    start: string;                  // ISO 날짜 문자열 (예: "2024-01-01")
    end: string | "ongoing";        // 완료 날짜 또는 "ongoing"
  };
  teamSize: number;                 // 1 = 1인 개발, 2+ = 팀 프로젝트
}
```

### 콘텐츠 초안 (`data/games.ts`)

```ts
import type { GameDetail } from "@/types/game";

export const games: GameDetail[] = [
  {
    id: "rabbit-survival",
    title: "강한 토끼만이 살아남는다",
    shortDescription: "PlayX4 인디오락실 부스 전시·동아일보 게재",
    thumbnail: "/images/games/rabbit-survival/thumbnail.webp",
    genre: ["action"],
    platform: ["windows"],
    techStack: ["Unity", "C#"],
    githubUrl: "https://github.com/mynameisjinhohong",
    featured: true,
    awards: ["PlayX4 인디오락실 전시"],
    description: "...",
    role: ["개발", "기획"],
    features: [],
    learnings: [],
    screenshots: ["/images/games/rabbit-survival/01.webp"],
    publishedAt: "2024-05-01",
    projectPeriod: { start: "2024-01-01", end: "2024-05-01" },
    teamSize: 1,
  },
  // 나머지 게임은 실제 Itch.io 및 노션 데이터 기반으로 채운다
];
```

> **주의**: `publishedAt`과 `projectPeriod.start/end`는 모두 `"YYYY-MM-DD"` 형식의 ISO 날짜 문자열이다.  
> `projectPeriod.end`가 진행 중인 프로젝트의 경우 `"ongoing"` 문자열 리터럴을 사용한다.

---

## 3. 기술 스택 섹션 (Tech Stack Section)

### 목적

홍진호가 실제로 프로젝트에서 사용한 기술을 한눈에 파악하게 한다.  
단순 나열이 아니라 어떤 프로젝트에 사용했는지 연결고리를 제공하고, DevOps 실무 경험(Jenkins CI/CD)을 보조 증거로 배치한다.

### 핵심 메시지

> "각 기술을 실제 게임 개발과 실무에 적용한 경험이 있습니다."

### 레이아웃 구성

| 구분 | 설명 |
|------|------|
| 섹션 제목 | "기술 스택" |
| 카테고리 탭 | 게임 엔진 / 언어 / DevOps·도구 / 협업 |
| 아이콘 그리드 | 기술 아이콘 + 이름 + 숙련도 표시 |
| 기술 클릭 시 | 해당 기술을 사용한 게임 카드 링크 표시 (옵션) |

### 타입 정의

```ts
// types/tech.ts
export type TechCategory = "engine" | "language" | "devops" | "collaboration";
export type Proficiency = "primary" | "secondary";

export interface TechItem {
  name: string;
  category: TechCategory;
  iconSrc: string;              // "/icons/{name-lowercase}.svg"
  proficiency: Proficiency;
  description: string;          // 한 줄 설명 (예: "Unity CI/CD 구축 · 빌드 최적화")
  relatedGameIds: string[];     // 연결된 게임 ID. 없으면 빈 배열
}
```

### 카테고리별 기술 목록 초안 (`data/tech-stack.ts`)

```ts
import type { TechItem } from "@/types/tech";

export const techStack: TechItem[] = [
  // 게임 엔진
  {
    name: "Unity",
    category: "engine",
    iconSrc: "/icons/unity.svg",
    proficiency: "primary",
    description: "주력 게임 엔진 · URP 마이그레이션 · VContainer / MVP 패턴 적용",
    relatedGameIds: ["rabbit-survival"],  // 게임 데이터 확정 후 채운다
  },
  // 언어
  {
    name: "C#",
    category: "language",
    iconSrc: "/icons/csharp.svg",
    proficiency: "primary",
    description: "Unity 스크립팅 주력",
    relatedGameIds: [],
  },
  {
    name: "Python",
    category: "language",
    iconSrc: "/icons/python.svg",
    proficiency: "secondary",
    description: "툴 제작 · 데이터 처리",
    relatedGameIds: [],
  },
  {
    name: "TypeScript",
    category: "language",
    iconSrc: "/icons/typescript.svg",
    proficiency: "secondary",
    description: "포트폴리오 사이트",
    relatedGameIds: [],
  },
  // DevOps·도구
  {
    name: "Jenkins",
    category: "devops",
    iconSrc: "/icons/jenkins.svg",
    proficiency: "secondary",
    description: "Unity CI/CD 파이프라인 직접 구축 (인반트)",
    relatedGameIds: [],
  },
  {
    name: "Git",
    category: "devops",
    iconSrc: "/icons/git.svg",
    proficiency: "primary",
    description: "버전 관리",
    relatedGameIds: [],
  },
  // 협업
  {
    name: "Notion",
    category: "collaboration",
    iconSrc: "/icons/notion.svg",
    proficiency: "primary",
    description: "기획 문서 관리",
    relatedGameIds: [],
  },
  {
    name: "Jira",
    category: "collaboration",
    iconSrc: "/icons/jira.svg",
    proficiency: "primary",
    description: "이슈 트래킹 · Bitbucket-Confluence-Slack 연동 시스템 구축",
    relatedGameIds: [],
  },
];
```

---

## 4. 챗봇 섹션 및 챗봇 문맥 데이터

### 목적

방문자가 홍진호에 대한 궁금증을 직접 질문하고, 홍진호의 실제 경험 기반으로 답변을 받게 한다.  
단순 장식이 아니라 포트폴리오 탐색 경험을 실질적으로 개선하는 인터페이스다.

### 핵심 메시지

> "홍진호에 대해 궁금한 것을 물어보세요."

### UI 구성

| 요소 | 설명 |
|------|------|
| 진입점 | 화면 우하단 플로팅 버튼 (전 섹션 고정) |
| 챗봇 패널 | 슬라이드업 또는 사이드 패널 |
| 대화창 | 사용자 입력 + 스트리밍 응답 |
| 추천 질문 | 초기 진입 시 클릭 가능한 예시 질문 4개 표시 |
| 오류 상태 | "현재 AI가 응답할 수 없습니다. 이메일로 연락해 주세요." + 이메일 링크 |

### 챗봇 지식 소스 (Knowledge Sources)

챗봇이 답변에 활용하는 정보는 세 가지 계층으로 구성된다.

#### 계층 1 — 정적 컨텍스트 파일 (빌드 타임 주입)

| 파일 | 역할 | 주입 방식 |
|------|------|-----------|
| `lib/chatbot-context.ts` | 페르소나, 프로젝트 요약, FAQ | 시스템 프롬프트에 JSON 직렬화하여 삽입 |
| `data/games.ts` | 게임별 제목·역할·기술·링크 | `ChatbotContext.projects`로 매핑 |
| `data/tech-stack.ts` | 기술 스택 및 설명 | `ChatbotContext.skills`로 매핑 |

#### 계층 2 — FAQ 정형 응답 (시스템 프롬프트 규칙)

아래 질문 유형은 규칙 기반으로 응답해 LLM 환각을 방지한다.

| 질문 유형 | 정형 응답 방향 |
|-----------|---------------|
| 일반 코딩 질문 (포트폴리오 무관) | "저는 홍진호의 포트폴리오 안내 도우미입니다. 홍진호의 경험이나 프로젝트에 대해 물어봐 주세요." |
| 개인 정보·연락처 요청 | 이메일·GitHub 링크를 안내하고 직접 연락 유도 |
| 채용 제안·협업 요청 | 긍정적으로 수신하고 이메일로 연락 안내 |
| 챗봇 AI 모델 관련 질문 | "저는 로컬에서 동작하는 AI 도우미입니다. 구체적인 모델 정보는 공개하지 않습니다." |
| 욕설·부적절한 내용 | 정중하게 거절, 주제 전환 유도 |

#### 계층 3 — 폴백 (Ollama 서버 다운 시)

Ollama 서버 응답 없음 → 사전 정의된 FAQ 답변 목록에서 키워드 매칭 후 반환.  
매칭 실패 시 "현재 AI가 응답할 수 없습니다. 이메일(ghddhksduq@gmail.com)로 연락해 주세요." 표시.

### 챗봇 타입 정의

```ts
// types/chatbot.ts

export interface FaqItem {
  question: string;
  answer: string;
  keywords: string[];    // 폴백 매칭용 키워드
}

export interface ChatbotProject {
  title: string;
  role: string[];
  techStack: string[];
  itchUrl?: string;
  githubUrl?: string;
  awards: string[];
  summary: string;       // 챗봇 답변용 요약 (100자 이내)
}

export interface ChatbotContext {
  persona: {
    name: string;
    role: string;
    slogan: string;
    summary: string;     // 300자 이내 자기소개
    strengths: string[];
    contact: {
      email: string;
      github: string;
      itchio: string;
    };
  };
  projects: ChatbotProject[];
  skills: {
    name: string;
    description: string;
  }[];
  faq: FaqItem[];
}
```

### 챗봇 컨텍스트 초안 (`lib/chatbot-context.ts`)

```ts
import type { ChatbotContext } from "@/types/chatbot";

export const chatbotContext: ChatbotContext = {
  persona: {
    name: "홍진호",
    role: "게임 개발자",
    slogan: "그 무엇이든 어떻게든 해내는 게임 개발자",
    summary:
      "Unity와 C#을 주력으로 게임을 기획부터 개발·배포까지 직접 수행합니다. " +
      "Itch.io에 약 5개의 플레이 가능한 게임을 배포했고, " +
      "인반트에서 Jenkins Unity CI/CD 파이프라인을 직접 구축한 실무 경험이 있습니다. " +
      "웅진싱크빅 게임 개발 챌린지 우수상, 카카오테크 부트캠프 부하테스트 대상을 수상했습니다.",
    strengths: [
      "Itch.io에 배포된 플레이 가능한 게임 보유 (약 5개)",
      "Jenkins Unity CI/CD 파이프라인 직접 구축 경험",
      "수상·논문·언론 기사로 외부 검증된 이력",
      "기획·개발·DevOps를 모두 수행하는 실행형 엔지니어",
      "다양한 게임잼(8회 이상)에서 리더·개발자·기획 경험",
    ],
    contact: {
      email: "ghddhksduq@gmail.com",
      github: "https://github.com/mynameisjinhohong",
      itchio: "https://mynameisjinhohong.itch.io",
    },
  },
  projects: [
    // data/games.ts 로드 후 매핑 — 실제 게임 데이터가 확정되면 채운다
  ],
  skills: [
    { name: "Unity", description: "주력 게임 엔진 · URP 마이그레이션 · VContainer / MVP 패턴" },
    { name: "C#", description: "Unity 스크립팅 주력" },
    { name: "Jenkins", description: "Unity CI/CD 파이프라인 구축 (인반트 실무)" },
    { name: "Python", description: "툴 제작 · 데이터 처리" },
  ],
  faq: [
    {
      question: "어떤 게임 엔진을 사용하나요?",
      answer: "Unity를 주력으로 사용합니다. C#으로 스크립팅하며 URP 마이그레이션과 VContainer 적용 경험도 있습니다.",
      keywords: ["엔진", "unity", "게임엔진", "유니티"],
    },
    {
      question: "지금까지 만든 게임이 몇 개인가요?",
      answer: "Itch.io에 약 5개의 게임을 배포했습니다. 게임 갤러리에서 바로 플레이해볼 수 있는 작품들을 확인하세요.",
      keywords: ["게임", "몇개", "작품", "itch"],
    },
    {
      question: "실무 경험이 있나요?",
      answer: "인반트(2025.04~)에서 Jenkins Unity CI/CD 구축, 빌드 최적화, URP 마이그레이션, Jira 시스템 도입 등을 수행했습니다.",
      keywords: ["실무", "회사", "경력", "취업", "인반트", "jenkins", "ci"],
    },
    {
      question: "수상 이력이 있나요?",
      answer: "웅진싱크빅 게임 개발 챌린지 우수상, 카카오테크 부트캠프 AWS 부하테스트 대회 대상, 메이플스토리 게임 커리어 캠프 프로그래밍 MVP상 등을 수상했습니다.",
      keywords: ["수상", "대회", "상", "award"],
    },
    {
      question: "연락은 어떻게 하나요?",
      answer: "이메일 ghddhksduq@gmail.com 으로 연락해 주세요. GitHub(github.com/mynameisjinhohong)에서 코드도 확인할 수 있습니다.",
      keywords: ["연락", "이메일", "contact", "email"],
    },
  ],
};
```

### 추천 질문 (초기 진입 시 표시)

```ts
export const suggestedQuestions: string[] = [
  "어떤 게임 엔진을 주로 사용하시나요?",
  "지금까지 만든 게임 중 가장 자신 있는 작품은?",
  "실무 경험이나 수상 이력이 있나요?",
  "연락은 어떻게 하면 되나요?",
];
```

---

## 5. 소개 섹션 (About Section)

### 목적

히어로 섹션에서 전달한 정체성을 좀 더 구체화한다.  
면접관이 "이 사람이 어떤 개발자인가"를 추가로 확인하고 싶을 때 참조하는 섹션이다.

### 핵심 메시지

> "게임을 완성하고 배포한 경험이 있는 실행형 개발자입니다."

### 레이아웃 구성

| 요소 | 내용 |
|------|------|
| 사진 또는 아바타 | 프로필 이미지 |
| 자기소개 텍스트 | 3~4문장, 기술보다 가치관 중심 |
| 핵심 강점 카드 | 아이콘 + 한 줄 설명, 3개 |
| 수상/활동 뱃지 | 수상명 링크 배지 |
| 블로그 링크 | 네이버 블로그 (선택) |

### 타입 정의

```ts
// types/about.ts
export interface Highlight {
  icon: string;        // 이모지 또는 아이콘 이름
  title: string;
  description: string;
}

export interface AboutData {
  profileImageSrc: string;
  bio: string;           // 3~4문장 자기소개
  highlights: Highlight[];
  awards: {
    name: string;
    url?: string;        // 수상 증빙 URL (없으면 생략)
  }[];
  blogUrl?: string;
}
```

### 콘텐츠 초안 (`data/about.ts`)

```ts
import type { AboutData } from "@/types/about";

export const about: AboutData = {
  profileImageSrc: "/images/profile.webp",
  bio:
    "Unity와 C#으로 게임을 직접 기획하고 개발해 Itch.io에 배포한 경험이 있습니다. " +
    "혼자서 아이디어를 구현해 완성하는 과정을 즐기며, 플레이어가 재미를 느끼는 순간을 목표로 개발합니다. " +
    "새로운 기술을 배울 때도 실제 게임이나 서비스에 적용하며 체득하는 방식을 선호합니다.",
  highlights: [
    {
      icon: "🎮",
      title: "결과물 중심",
      description: "아이디어를 실제로 플레이 가능한 게임으로 완성한 경험",
    },
    {
      icon: "⚙️",
      title: "DevOps 실무",
      description: "Jenkins Unity CI/CD 파이프라인을 직접 구축한 경험",
    },
    {
      icon: "🏆",
      title: "외부 검증",
      description: "수상·논문·언론 기사로 검증된 이력 보유",
    },
  ],
  awards: [
    { name: "웅진싱크빅 게임 개발 챌린지 우수상" },
    { name: "카카오테크 부트캠프 AWS 부하테스트 대상" },
    { name: "메이플스토리 게임 커리어 캠프 프로그래밍 MVP상" },
    { name: "한국디지털콘텐츠학회 논문 게재" },
    { name: "PlayX4 인디오락실 부스 운영 · 동아일보 게재" },
  ],
  blogUrl: "https://blog.naver.com/ghddhksduq",
};
```

---

## 6. 섹션 순서 및 내비게이션 구조

```
[ 히어로 ] → [ 게임 갤러리 ] → [ 기술 스택 ] → [ 소개 ]
                                                    ↕
                                          [ 챗봇 플로팅 버튼 ] (전 섹션 고정)
```

| 내비게이션 항목 | 앵커 |
|----------------|------|
| 홈 | `#hero` |
| 게임 | `#games` |
| 기술 스택 | `#skills` |
| 소개 | `#about` |

---

## 7. 구현 우선순위

| 순위 | 섹션 | 이유 |
|------|------|------|
| 1 | 게임 갤러리 | 핵심 결과물 전달, 면접관이 가장 먼저 보는 콘텐츠 |
| 2 | 히어로 | 첫인상 결정, 게임 갤러리 진입 유도 |
| 3 | 챗봇 | 포트폴리오 탐색 경험 개선 |
| 4 | 기술 스택 | 보조 정보, 갤러리 완성 후 추가 |
| 5 | 소개 | 선택 사항, 필요 시 추가 |
