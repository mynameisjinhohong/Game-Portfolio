# 게임 소개 페이지 작업 목록 (Game Showcase Backlog)

> 최초 작성: 2026-05-10  
> 관련 Jira: GP-13 (parent: GP-11)

---

## 1. 화면 구조 및 콘텐츠 항목

### 1-1. 게임 목록 페이지 (Gallery View)
- [ ] 게임 카드 컴포넌트 설계
  - 썸네일 이미지 (16:9 비율 권장)
  - 게임 제목
  - 한 줄 설명 (30자 이내)
  - 장르 / 플랫폼 태그
  - Itch.io 배포 여부 배지
- [ ] 카드 그리드 레이아웃 구현 (반응형: 1/2/3열)
- [ ] 필터링 UI (장르, 기술 스택, 플랫폼 기준)
- [ ] 정렬 옵션 (최신순 / 추천순)

### 1-2. 게임 상세 섹션 (Detail View)
- [ ] 게임 소개 텍스트 (역할, 특징, 배경)
- [ ] 역할 명시 (개발자 / 디자이너 / 기획자 등)
- [ ] 사용 기술 스택 목록 (아이콘 + 텍스트)
- [ ] 주요 기능 / 특징 불릿 리스트
- [ ] 배운 점 섹션 (기술적 성장 중심으로 서술)
- [ ] 스크린샷 또는 GIF 슬라이더
- [ ] 플레이 영상 임베드 (YouTube / 자체 호스팅)

---

## 2. 외부 링크 정책 (Itch.io 및 기타)

| 링크 유형 | 표시 방식 | 조건 |
|---|---|---|
| Itch.io 배포 | 카드에 "플레이" 버튼 표시 | Itch.io URL 존재 시 |
| GitHub 소스 | 상세 섹션 하단 링크 | 공개 저장소 존재 시 |
| 영상 시연 | 임베드 또는 외부 링크 | 영상 URL 존재 시 |
| 비공개 게임 | "비공개" 뱃지, 링크 없음 | URL 없을 때 |

- 외부 링크는 모두 `target="_blank" rel="noopener noreferrer"` 처리
- Itch.io 링크가 없는 게임은 플레이 버튼 비활성화 또는 숨김

---

## 3. 게임별 표시 데이터 스키마

각 게임은 아래 데이터 구조를 기준으로 콘텐츠를 작성한다.

```ts
interface GameEntry {
  id: string;
  title: string;
  shortDescription: string;      // 카드용, 30자 이내
  description: string;           // 상세 소개
  role: string[];                // 예: ["개발", "기획"]
  techStack: string[];           // 예: ["Unity", "C#", "Photon"]
  features: string[];            // 주요 기능 목록
  learnings: string[];           // 배운 점
  thumbnail: string;             // 이미지 경로 또는 URL
  screenshots: string[];
  videoUrl?: string;
  itchUrl?: string;
  githubUrl?: string;
  genre: string[];               // 예: ["퍼즐", "플랫포머"]
  platform: string[];            // 예: ["WebGL", "Windows"]
  featured: boolean;             // 추천 게임 여부
  publishedAt: string;           // ISO date
}
```

---

## 4. 첫 방문자 탐색 흐름 (UX 흐름)

```
랜딩 → 게임 갤러리 진입
  └→ 추천(featured) 게임 상단 노출
       └→ 카드 클릭 → 상세 슬라이드 또는 섹션 전환
            └→ Itch.io 링크 클릭 → 새 탭에서 플레이
```

- 첫 방문 시 스크롤 없이 최소 2개 이상의 게임 카드가 보여야 한다
- 카드 hover 시 간략한 기술 스택 툴팁 표시
- "추천" 태그가 있는 게임은 상단 고정 또는 강조 표시

---

## 5. 구현 작업 단위 (스프린트 레디 수준)

### Phase 1 — 데이터 구조 및 콘텐츠 준비
- [ ] `GameEntry` 스키마 기반 게임 데이터 JSON 파일 작성 (`data/games.json`)
- [ ] 각 게임의 썸네일 이미지 수집 및 최적화
- [ ] 게임별 소개 텍스트, 배운 점, 기술 스택 콘텐츠 작성

### Phase 2 — 게임 카드 컴포넌트
- [ ] `GameCard` 컴포넌트 구현 (썸네일, 제목, 한 줄 소개, 태그)
- [ ] Itch.io 배포 배지 조건부 렌더링
- [ ] hover 상태 애니메이션 및 툴팁
- [ ] 반응형 그리드 레이아웃 (CSS Grid / Tailwind)

### Phase 3 — 게임 상세 화면
- [ ] 상세 섹션 레이아웃 설계 (슬라이드 패널 또는 전용 페이지)
- [ ] 기술 스택 아이콘 + 텍스트 렌더링
- [ ] 스크린샷 슬라이더 컴포넌트
- [ ] 배운 점 섹션 스타일링
- [ ] 외부 링크 버튼 (Itch.io, GitHub, 영상)

### Phase 4 — 필터링 및 탐색
- [ ] 장르 / 플랫폼 필터 UI
- [ ] 필터 상태 관리 (URL 파라미터 또는 로컬 상태)
- [ ] 추천 게임 상단 고정 로직

### Phase 5 — 접근성 및 성능
- [ ] 이미지 lazy loading 적용
- [ ] alt 텍스트 및 ARIA 레이블 추가
- [ ] 외부 링크 보안 속성 일괄 적용 (`noopener noreferrer`)
- [ ] 라이트하우스 접근성 점수 확인

---

## 6. 미결정 항목 (추후 결정 필요)

- 게임 상세 화면: 별도 페이지(`/games/[id]`) vs 오버레이 패널 중 선택 필요
- 필터 UI 위치: 사이드바 vs 상단 탭바
- 게임 데이터 관리: 정적 JSON vs CMS(Notion, Contentful 등)
- 비디오 자동재생 정책: 음소거 자동재생 허용 여부
