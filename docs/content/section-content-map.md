# 포트폴리오 섹션별 콘텐츠 배치 정의서

> 작성 기준: GP-52  
> 목적: 구현팀이 UI 설계와 데이터 파일 작성을 바로 시작할 수 있도록 섹션별 목적·메시지·데이터 항목을 구체적으로 정의한다.

---

## 1. 히어로 섹션 (Hero Section)

### 목적

첫 방문자가 10초 이내에 "홍진호가 게임을 만드는 개발자"임을 인식하게 한다.  
긴 소개 대신 핵심 정체성과 대표 결과물을 즉시 노출한다.

### 핵심 메시지

> **"게임을 만드는 개발자, 홍진호입니다."**

보조 문구: "Unity와 C#으로 직접 플레이 가능한 게임을 만들어 왔습니다."

### 레이아웃 구성

| 위치 | 요소 | 내용 |
|------|------|------|
| 중앙 상단 | 이름 + 직함 | 홍진호 · 게임 개발자 |
| 이름 아래 | 한 줄 소개 | "Unity / C# · Itch.io에 배포된 게임 보유" |
| 우측 또는 배경 | 대표 게임 스크린샷 또는 루프 영상 | 가장 완성도 높은 게임 1종 |
| 하단 CTA | 버튼 2개 | "게임 갤러리 보기" (내부 스크롤) / "GitHub" (외부 링크) |

### 필요한 데이터 항목

```ts
interface HeroData {
  name: string;                  // "홍진호"
  title: string;                 // "게임 개발자"
  tagline: string;               // 한 줄 소개
  featuredMedia: {               // 배경에 쓸 대표 미디어
    type: "image" | "video";
    src: string;                 // 이미지 경로 또는 영상 URL
    alt: string;
  };
  cta: {
    primary: { label: string; href: string };   // "게임 갤러리 보기"
    secondary: { label: string; href: string };  // "GitHub"
  };
  socialLinks: {
    github: string;
    itchio?: string;
    email: string;
  };
}
```

### 콘텐츠 초안

```json
{
  "name": "홍진호",
  "title": "게임 개발자",
  "tagline": "Unity와 C#으로 직접 플레이 가능한 게임을 만듭니다.",
  "cta": {
    "primary": { "label": "게임 갤러리 보기", "href": "#games" },
    "secondary": { "label": "GitHub", "href": "https://github.com/mynameisjinhohong" }
  },
  "socialLinks": {
    "github": "https://github.com/mynameisjinhohong",
    "email": "ghddhksduq@gmail.com"
  }
}
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
| 필터 탭 | 장르(전체 / 퍼즐 / 액션 / 기타), 플랫폼(WebGL / Windows) |
| 카드 그리드 | 반응형: 모바일 1열 / 태블릿 2열 / 데스크톱 3열 |
| 추천 게임 | featured=true인 게임 상단 고정 또는 강조 테두리 |

### 게임 카드 표시 항목

| 항목 | 표시 방식 |
|------|-----------|
| 썸네일 | 16:9 비율 이미지 |
| 게임 제목 | Bold, 카드 하단 |
| 한 줄 설명 | 30자 이내, 제목 아래 |
| 장르 / 플랫폼 태그 | 작은 배지 |
| Itch.io 배포 배지 | 초록 배지 "플레이 가능" |
| Hover 시 | 기술 스택 툴팁 오버레이 |

### 필요한 데이터 항목

```ts
interface GameCard {
  id: string;
  title: string;
  shortDescription: string;   // 30자 이내
  thumbnail: string;
  genre: string[];
  platform: string[];
  techStack: string[];
  itchUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
```

### 게임 상세 섹션 표시 항목 (카드 클릭 후)

| 항목 | 설명 |
|------|------|
| 역할 | 개발 / 기획 / 디자인 중 담당 영역 명시 |
| 상세 소개 | 게임 배경, 목표, 주요 메커닉 |
| 기술 스택 | 아이콘 + 텍스트 목록 |
| 주요 기능 | 불릿 리스트 |
| 배운 점 | 기술적 성장 포인트 2~4개 |
| 스크린샷 / GIF | 슬라이더 |
| 외부 링크 버튼 | Itch.io, GitHub, 영상 (존재하는 것만 표시) |

### 필요한 데이터 항목 (상세)

```ts
interface GameDetail extends GameCard {
  description: string;
  role: string[];
  features: string[];
  learnings: string[];
  screenshots: string[];
  videoUrl?: string;
  publishedAt: string;   // ISO date
}
```

---

## 3. 기술 스택 섹션 (Tech Stack Section)

### 목적

홍진호가 실제로 프로젝트에서 사용한 기술을 한눈에 파악하게 한다.  
단순 나열이 아니라 어떤 프로젝트에 사용했는지 연결고리를 제공한다.

### 핵심 메시지

> "각 기술을 실제 게임 개발에 적용한 경험이 있습니다."

### 레이아웃 구성

| 구분 | 설명 |
|------|------|
| 섹션 제목 | "기술 스택" |
| 카테고리 탭 | 게임 엔진 / 언어 / 도구 / 협업 |
| 아이콘 그리드 | 기술 아이콘 + 이름 |
| 기술 클릭 시 | 해당 기술을 사용한 게임 카드 링크 표시 (옵션) |

### 카테고리별 기술 목록 초안

#### 게임 엔진

| 기술 | 숙련도 | 사용 프로젝트 |
|------|--------|--------------|
| Unity | 주력 | (게임 목록에서 확인) |

#### 언어

| 기술 | 숙련도 | 비고 |
|------|--------|------|
| C# | 주력 | Unity 스크립팅 |
| Python | 보조 | 툴 제작, 데이터 처리 |
| TypeScript | 보조 | 포트폴리오 사이트 |

#### 도구

| 기술 | 용도 |
|------|------|
| Git / GitHub | 버전 관리 |
| Visual Studio | 개발 IDE |

#### 협업

| 기술 | 용도 |
|------|------|
| Notion | 기획 문서 관리 |
| Jira | 이슈 트래킹 |

### 필요한 데이터 항목

```ts
interface TechItem {
  name: string;
  category: "engine" | "language" | "tool" | "collaboration";
  iconSrc: string;           // SVG 또는 이미지 경로
  proficiency: "primary" | "secondary";
  relatedGameIds?: string[]; // 연결된 게임 ID 목록
}
```

### 콘텐츠 초안

```json
[
  { "name": "Unity", "category": "engine", "iconSrc": "/icons/unity.svg", "proficiency": "primary" },
  { "name": "C#", "category": "language", "iconSrc": "/icons/csharp.svg", "proficiency": "primary" },
  { "name": "Python", "category": "language", "iconSrc": "/icons/python.svg", "proficiency": "secondary" },
  { "name": "TypeScript", "category": "language", "iconSrc": "/icons/typescript.svg", "proficiency": "secondary" },
  { "name": "Git", "category": "tool", "iconSrc": "/icons/git.svg", "proficiency": "primary" },
  { "name": "Notion", "category": "collaboration", "iconSrc": "/icons/notion.svg", "proficiency": "primary" }
]
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
| 진입점 | 화면 우하단 플로팅 버튼 (어느 섹션에서도 접근 가능) |
| 챗봇 패널 | 슬라이드업 또는 사이드 패널 |
| 대화창 | 사용자 입력 + 스트리밍 응답 |
| 추천 질문 | 초기 진입 시 클릭 가능한 예시 질문 3~4개 표시 |
| 오류 상태 | "현재 AI가 응답할 수 없습니다. 이메일로 연락해 주세요." + 이메일 링크 |

### 챗봇 문맥 데이터 구조

챗봇 시스템 프롬프트에 주입할 홍진호 관련 데이터 항목이다.  
구현 파일: `lib/system-prompt.ts`

```ts
interface ChatbotContext {
  persona: {
    name: string;           // "홍진호"
    role: string;           // "게임 개발자"
    summary: string;        // 300자 이내 자기소개
    strengths: string[];    // 핵심 강점 3~5가지
    contact: {
      email: string;
      github: string;
    };
  };
  projects: {
    title: string;
    role: string[];
    techStack: string[];
    itchUrl?: string;
    summary: string;        // 챗봇 답변용 요약 (100자 이내)
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}
```

### 챗봇 문맥 콘텐츠 초안

#### 페르소나

```json
{
  "name": "홍진호",
  "role": "게임 개발자",
  "summary": "Unity와 C#을 주력으로 게임을 개발하며, 직접 기획부터 구현까지 담당한 프로젝트 경험이 있습니다. Itch.io에 배포한 게임을 보유하고 있으며, 게임의 재미와 완성도를 함께 고민하는 개발자입니다.",
  "strengths": [
    "Unity 기반 게임 개발 전 과정 경험",
    "기획·개발을 함께 담당한 1인 개발 경험",
    "Itch.io 배포를 통한 실제 서비스 경험",
    "결과물 중심의 문제 해결 접근"
  ],
  "contact": {
    "email": "ghddhksduq@gmail.com",
    "github": "https://github.com/mynameisjinhohong"
  }
}
```

#### 예상 FAQ 초안

| 질문 | 답변 방향 |
|------|-----------|
| "어떤 게임 엔진을 쓰나요?" | Unity 주력, C# 스크립팅, 게임 목록 링크 안내 |
| "지금까지 만든 게임이 몇 개인가요?" | 게임 갤러리 섹션으로 안내 |
| "협업 경험이 있나요?" | 팀 프로젝트 경험 언급, 관련 게임 소개 |
| "연락은 어떻게 하나요?" | 이메일(ghddhksduq@gmail.com) 안내 |
| "포트폴리오에서 어떤 게임을 추천하나요?" | featured 게임 소개 |

#### 추천 질문 (초기 진입 시 표시)

```json
[
  "어떤 게임 엔진을 주로 사용하시나요?",
  "지금까지 만든 게임 중 가장 자신 있는 작품은?",
  "어떤 역할을 맡아 개발하셨나요?",
  "연락은 어떻게 하면 되나요?"
]
```

---

## 5. (선택) 소개 섹션 (About Section)

### 목적

히어로 섹션에서 전달한 정체성을 좀 더 구체화한다. 면접관이 "이 사람이 어떤 개발자인가"를 추가로 확인하고 싶을 때 참조하는 섹션이다.

### 핵심 메시지

> "게임을 완성하고 배포한 경험이 있는 개발자입니다."

### 레이아웃 구성

| 요소 | 내용 |
|------|------|
| 사진 또는 아바타 | 프로필 이미지 |
| 자기소개 텍스트 | 3~4문장, 기술보다 가치관 중심 |
| 핵심 강점 카드 | 아이콘 + 한 줄 설명, 3개 |
| 블로그 링크 | 네이버 블로그 (선택, 글이 있는 경우) |

### 필요한 데이터 항목

```ts
interface AboutData {
  profileImageSrc: string;
  bio: string;               // 3~4문장 자기소개
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  blogUrl?: string;
}
```

### 콘텐츠 초안

```json
{
  "bio": "Unity와 C#으로 게임을 직접 기획하고 개발해 Itch.io에 배포한 경험이 있습니다. 혼자서 아이디어를 구현해 완성하는 과정을 즐기며, 플레이어가 재미를 느끼는 순간을 목표로 개발합니다. 새로운 기술을 배울 때도 실제 게임에 적용하며 체득하는 방식을 선호합니다.",
  "highlights": [
    { "title": "결과물 중심", "description": "아이디어를 실제로 플레이 가능한 게임으로 완성한 경험" },
    { "title": "전 과정 참여", "description": "기획부터 개발·배포까지 1인 개발 경험 보유" },
    { "title": "지속적 학습", "description": "실제 프로젝트 적용을 통해 기술을 익히는 방식 선호" }
  ],
  "blogUrl": "https://blog.naver.com/ghddhksduq"
}
```

---

## 6. 섹션 순서 및 내비게이션 구조

```
[ 히어로 ] → [ 게임 갤러리 ] → [ 기술 스택 ] → [ 소개 (선택) ]
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

---

## 8. 데이터 파일 위치 정의

| 파일 | 내용 |
|------|------|
| `data/games.ts` | 게임 목록 및 상세 데이터 (`GameDetail[]`) |
| `data/tech-stack.ts` | 기술 스택 목록 (`TechItem[]`) |
| `data/hero.ts` | 히어로 섹션 데이터 (`HeroData`) |
| `data/about.ts` | 소개 섹션 데이터 (`AboutData`) |
| `lib/system-prompt.ts` | 챗봇 시스템 프롬프트 생성 함수 |
| `lib/chatbot-context.ts` | 챗봇 문맥 데이터 (`ChatbotContext`) |
