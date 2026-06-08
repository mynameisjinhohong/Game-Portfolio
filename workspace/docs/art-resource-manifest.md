# 아트 리소스 명세서 (Art Resource Manifest)

> 작성 기준: GP-53 / GP-54 / GP-58 — A-04 메인 시안 기반 구현 명세 통합본
> 목적: 메인 페이지 시안을 기준으로 필요한 아트 리소스를 구분·목록화하고, 후속 이미지 생성 작업에서 바로 참조할 수 있는 단일 정본을 제공한다.
> 시각 방향: `PROJECT_DIRECTION.md` (A-04) — `soft cream` 배경 + `teal` / `game-blue` / 제한적 `orange accent` / `graphite`
> 게임 실데이터 출처: `docs/research/raw-data-survey.md`, `workspace/src/data/games.ts`
> 관련 문서: `docs/content/section-content-map.md` (GP-52), `docs/planning/portfolio-foundation-plan.md`
> 이미지 생성 프롬프트 위치: `workspace/assets/prompts/` | 참조 이미지: `workspace/assets/references/`

---

## 0. 네이밍 규칙 및 저장 경로

### 기본 저장 경로

모든 생성 이미지는 프로젝트 루트의 `public/` 디렉터리 아래에 저장한다.
Next.js 이미지 참조 기준: `/images/<카테고리>/<파일명>.<확장자>`

```
public/
└── images/
    ├── hero/          # 히어로 섹션 전용 이미지
    ├── games/         # 게임별 썸네일 및 스크린샷
    │   ├── slug-a/
    │   ├── slug-b/
    │   └── ...
    ├── bg/            # 공용 배경·장식 요소
    └── ui/            # 공용 UI 아이콘·뱃지 등
```

### 파일 네이밍 규칙

| 규칙 | 예시 |
|------|------|
| 소문자 + 하이픈 구분 | `hero-featured.webp` |
| 게임 카드 더미: `<slug>-thumbnail-dummy` | `math-king-thumbnail-dummy.webp` |
| 스크린샷 더미: `<slug>-screenshot-<n>-dummy` | `math-king-screenshot-01-dummy.webp` |
| 배경: `bg-<용도>` | `bg-hero.webp`, `bg-section.webp` |
| 장식: `deco-<설명>` | `deco-pixel-star.png` |
| UI 아이콘: `icon-<이름>` | `icon-unity.svg` |

### 더미 이미지 규칙

> 게임 썸네일·스크린샷처럼 실제 게임 결과물 기반이어야 하는 이미지는 AI로 생성하지 않는다.
> 대신 **`-dummy` 접미사**가 붙은 자리표시자 이미지를 생성하고, 사람이 나중에 실제 이미지로 교체한다.

| 구분 | 생성 방식 | 네이밍 |
|------|-----------|--------|
| 게임 썸네일 | 더미 (사람이 교체) | `thumbnail-dummy.webp` |
| 게임 스크린샷 | 더미 (사람이 교체) | `screenshot-01-dummy.webp` |
| 히어로 배경 | AI 생성 가능 | `bg-hero.webp` |
| 대표 게임 피처드 | AI 생성 가능 (실제 스크린샷 없을 때) | `hero-featured.webp` |
| 공용 배경·장식 | AI 생성 가능 | 각 섹션 명세 참조 |

### 포맷 선택 기준

| 상황 | 권장 포맷 |
|------|-----------|
| 사진·게임 스크린샷 | WebP (손실, 품질 80) |
| 투명 배경 필요 | PNG 또는 WebP (무손실) |
| 아이콘·벡터 | SVG |
| 애니메이션 | WebP animated 또는 MP4 |

---

## 1. 확정 게임 슬러그 목록

> 출처: `workspace/src/data/games.ts`, `docs/research/raw-data-survey.md`

| 슬러그 | 게임명 | 장르 | 플랫폼 | Featured | 비고 |
|--------|--------|------|--------|----------|------|
| `math-king` | 수학의 제왕 (HotSix) | 2D 횡스크롤 디펜스 | Android | ✅ | 웅진씽크빅 게임개발챌린지 우수상 |
| `strong-rabbit` | 강한 토끼만이 살아남는다 (Cardungeon) | 실시간 멀티플레이 덱빌딩 서바이벌 | PC + 모바일 | ✅ | 뒤끝 게임잼 수상, 인디크래프트 입상, PlayX4 부스 출품 |
| `panda-rush` | 판다러쉬 | 러닝게임 | Android (Google Play) | ✅ | 이븐아이 게임톤 대상, Google Play 런칭 |
| `black-fog-red-moon` | 검은 안개, 붉은 달 (unizam) | 한국형 오컬트 턴제 전략 | PC | ❌ | UniDev 게임잼 출품, ShaderLab 기반 |
| `universe` | Universe | 2D 메타버스 플랫폼 | PC | ❌ | 메타버스 아카데미 최종 프로젝트 |
| `inoriter` | 아이노리터 (Inoriter) | 인터렉티브 미니게임 플랫폼 | 빔프로젝터/전자칠판 | ❌ | TV스토리 외주 납품 (PM 역할) |

> **주의**: 슬러그·제목·장르·플랫폼은 `workspace/src/data/games.ts`의 `GAMES` 배열 및 `FEATURED_GAMES`와 항상 동기화 상태를 유지한다.

### 게임별 색상·아이콘 제안

각 게임 카드/썸네일이 다른 게임과 구분되도록 활용할 수 있는 강조색과 아이콘 컨셉 가이드.

| 슬러그 | 강조색 | 아이콘/모티프 제안 |
|--------|--------|---------------------|
| `math-king` | `#4A90D9` (파란 계열) | 수학 기호 + 디펜스 타워 조합 |
| `strong-rabbit` | `#E76F51` (주황-레드 계열) | 토끼 캐릭터 + 카드 모티프 |
| `panda-rush` | `#27AE60` (초록 계열) | 판다 캐릭터 + 달리기/죽순 모티프 |
| `black-fog-red-moon` | `#8E44AD` (보라 계열, 오컬트 분위기) | 안개·달·점술 모티프 |
| `universe` | `#2C3E50` (다크 네이비) | 별·궤도·메타버스 공간 모티프 |
| `inoriter` | `#E67E22` (주황 계열) | 빔프로젝터·인터랙션·도형 |

---

## 2. 히어로 섹션 리소스

히어로 섹션은 첫 방문자가 10초 이내에 "게임 개발자 홍진호"를 인식하게 하는 핵심 구역이다.

### 2-1. 히어로 배경 이미지

| 항목 | 내용 |
|------|------|
| 용도 | 히어로 섹션 전체 배경 (오버레이 텍스트 위에 깔리는 배경) |
| 권장 크기 | 1920×1080px (16:9, 최대 1440px 너비로도 사용) |
| 포맷 | WebP (손실, 품질 75–80) |
| 투명 배경 | 불필요 (불투명 배경 이미지) |
| 저장 경로 | `public/images/hero/bg-hero.webp` |
| 이미지 특성 | A-04 기반 `soft cream` 베이스에 `teal` / `game-blue` 톤의 부드러운 그라데이션, 얇은 픽셀 모티프 장식. 화려한 cinematic·사이버펑크·다크 cockpit 분위기는 피한다. |
| 추가 참고 | 텍스트 가독성을 위해 카피 영역 주변은 한 톤 더 밝게(또는 흰색 가까운 cream으로) 유지한다. |

### 2-2. 대표 게임 피처드 이미지

| 항목 | 내용 |
|------|------|
| 용도 | 히어로 섹션 우측(또는 중앙 하단)에 표시되는 대표 게임 비주얼 |
| 권장 크기 | 800×450px (16:9) 또는 600×400px |
| 포맷 | WebP (손실, 품질 85) |
| 투명 배경 | 불필요 |
| 저장 경로 | `public/images/hero/hero-featured.webp` |
| 이미지 특성 | Featured 게임(`math-king`, `strong-rabbit`, `panda-rush` 중 가장 임팩트 있는 한 장)의 실제 스크린샷 또는 키아트 |
| 추가 참고 | **실제 게임 스크린샷을 사람이 직접 교체**하는 것이 원칙. 초기 구현에서는 더미 이미지(`hero-featured-dummy.webp`)를 사용한다. |

### 2-3. 프로필 이미지 (선택)

| 항목 | 내용 |
|------|------|
| 용도 | 히어로 또는 소개 섹션의 개발자 프로필 사진 |
| 권장 크기 | 400×400px (정사각형) |
| 포맷 | WebP 또는 PNG |
| 투명 배경 | 선택 (원형 클립 처리 시 배경색 무관) |
| 저장 경로 | `public/images/hero/profile.webp` |
| 이미지 특성 | 실제 사진 사용 권장; AI 아바타로 대체 가능 |

---

## 3. 공용 배경 및 장식 요소

사이트 전체에 반복 사용되는 배경·장식 리소스. 섹션 분위기를 통일하는 역할.

### 3-1. 게임 갤러리 섹션 배경

| 항목 | 내용 |
|------|------|
| 용도 | 게임 카드 목록이 배치되는 섹션 배경 |
| 권장 크기 | 1920×600px 이상 (세로 가변) |
| 포맷 | WebP (손실, 품질 75) |
| 투명 배경 | 불필요 |
| 저장 경로 | `public/images/bg/bg-games-section.webp` |
| 이미지 특성 | `soft cream` 베이스에 옅은 `teal`/`game-blue` 격자 또는 가로 결 패턴. 히어로 배경과 시각적 연속성을 유지하되 카드 가독성을 해치지 않는 저채도 톤. |

### 3-2. 챗봇 섹션 배경

| 항목 | 내용 |
|------|------|
| 용도 | 챗봇 UI가 표시되는 섹션 또는 플로팅 패널 배경 |
| 권장 크기 | 800×600px (챗봇 패널 내부) |
| 포맷 | WebP (손실, 품질 75) |
| 투명 배경 | 불필요 |
| 저장 경로 | `public/images/bg/bg-chatbot.webp` |
| 이미지 특성 | `soft cream` 패널 바탕에 `teal` 톤 보조 그래픽과 얇은 game-blue 라인. 파란-보라 사이버 cockpit 톤은 피하고, 채팅 가독성을 위해 채도를 낮춘다. |

### 3-3. 픽셀아트 장식 파티클 (선택)

| 항목 | 내용 |
|------|------|
| 용도 | 히어로·섹션 전환 영역에 배치하는 소형 장식 요소 |
| 권장 크기 | 64×64px 또는 128×128px |
| 포맷 | PNG (투명 배경) |
| 투명 배경 | 필요 |
| 저장 경로 | `public/images/bg/deco-pixel-star.png`, `deco-pixel-dot.png` |
| 이미지 특성 | 픽셀아트 스타일, 별·점·다이아몬드 등 단순 형태 |

### 3-4. 섹션 구분선 장식

| 항목 | 내용 |
|------|------|
| 용도 | 섹션 간 경계 시각화 (Wave 또는 기울어진 분리선) |
| 권장 크기 | 1920×120px |
| 포맷 | SVG 또는 PNG (투명 배경) |
| 투명 배경 | 필요 |
| 저장 경로 | `public/images/bg/section-divider.svg` |
| 이미지 특성 | 단색 또는 그라데이션 Wave 형태 |

---

## 4. 게임 카드용 요소

게임 목록 섹션에서 각 게임 카드에 사용되는 리소스. 게임별로 독립 슬러그 폴더에 저장.

### 4-1. 게임 썸네일

각 게임마다 1장의 썸네일이 필요하다.

> **⚠️ 더미 이미지 정책**: 게임 썸네일은 실제 게임 스크린샷을 기반으로 해야 하므로 AI로 생성하지 않는다.
> 초기 구현에서는 `-dummy` 접미사가 붙은 자리표시자 이미지를 배치하고, 사람이 나중에 실제 게임 캡처로 교체한다.

| 항목 | 내용 |
|------|------|
| 용도 | 게임 카드 상단 이미지 (목록 페이지 기본 노출) |
| 권장 크기 | 640×360px (16:9) |
| 포맷 | WebP (손실, 품질 85) |
| 투명 배경 | 불필요 |
| 초기 저장 경로 | `public/images/games/<slug>/thumbnail-dummy.webp` |
| 최종 저장 경로 | `public/images/games/<slug>/thumbnail.webp` (사람이 교체 후 rename) |
| 이미지 특성 | 게임의 핵심 플레이 장면 또는 타이틀 화면, 밝고 식별하기 쉬운 구성 |

### 4-2. 게임 상세 스크린샷

상세 페이지 또는 모달에서 표시되는 추가 스크린샷.

> **⚠️ 더미 이미지 정책**: 실제 게임 플레이 캡처로만 의미가 있으므로 AI 생성 금지.
> 초기 구현에서는 `-dummy` 접미사 자리표시자를 배치하고, 사람이 교체한다.

| 항목 | 내용 |
|------|------|
| 용도 | 게임 상세 뷰에서 여러 장면 보여주기 |
| 권장 크기 | 1280×720px (16:9) |
| 포맷 | WebP (손실, 품질 85) |
| 투명 배경 | 불필요 |
| 초기 저장 경로 | `public/images/games/<slug>/screenshot-01-dummy.webp` ~ `screenshot-04-dummy.webp` |
| 최종 저장 경로 | `public/images/games/<slug>/screenshot-01.webp` ~ `screenshot-04.webp` (사람이 교체 후 rename) |
| 이미지 특성 | 플레이 장면, UI 포함 가능, 게임 분위기 전달 |
| 수량 | 게임당 최소 1장, 최대 4장 권장 |

### 4-3. 기술 스택 아이콘 / 뱃지

| 항목 | 내용 |
|------|------|
| 용도 | 게임 카드 및 소개 섹션에서 사용 기술 시각화 |
| 권장 크기 | 32×32px (표시), 원본 SVG |
| 포맷 | SVG 우선, 없으면 PNG |
| 투명 배경 | 필요 |
| 저장 경로 | `public/images/ui/icon-<tech-name>.svg` |
| 항목 | `unity`, `csharp`, `shaderlab`, `github`, `jenkins`, `aws`, `docker` (실데이터 기준 핵심 스택) |

### 4-4. 게임 장르 뱃지 (선택)

| 항목 | 내용 |
|------|------|
| 용도 | 게임 카드 코너에 표시하는 장르 구분 레이블 |
| 권장 크기 | 80×24px 텍스트 레이블 형태 또는 CSS로 처리 |
| 포맷 | CSS/SVG (이미지 없이 처리 권장) |
| 저장 경로 | CSS 처리 시 불필요 |
| 이미지 특성 | "디펜스", "덱빌딩", "러닝", "오컬트 전략", "메타버스", "인터렉티브" 등 실제 게임 장르 텍스트 레이블 |

---

## 5. 공용 UI 에셋

| 파일 경로 | 용도 | 규격 |
|-----------|------|------|
| `public/ui/avatar-frame.svg` | 캐릭터 카드 아바타 프레임 | 120×120 |
| `public/ui/panel-corner.svg` | HUD 패널 모서리 장식 | 12×12 |
| `public/ui/award-star.svg` | 수상 배지 공통 별 아이콘 | 16×16 |
| `public/ui/bot-avatar.svg` | 챗봇 아바타 | 48×48 |

게임별 수상·플랫폼 배지:

| 파일 경로 | 용도 |
|-----------|------|
| `public/games/math-king/badge-award.svg` | 우수상 배지 |
| `public/games/strong-rabbit/badge-award.svg` | 수상 배지 (복수) |
| `public/games/panda-rush/badge-googleplay.svg` | Google Play 배지 |

---

## 6. AI 이미지 생성 작업 우선순위

후속 `codex_imagegen` 작업에서 아래 순서로 생성을 진행한다.

> **중요**: 게임 썸네일·스크린샷은 AI 생성 대상이 아니다. 해당 항목은 더미 이미지 생성 작업으로 별도 처리한다.

### AI 생성 대상

| 우선순위 | 리소스 | 이유 |
|----------|--------|------|
| 1 | 히어로 배경 (`bg-hero.webp`) | 사이트 첫 인상에 직결 |
| 2 | 공용 배경·장식 | 전체 일관성 |
| 3 | 기술 스택 아이콘 | Simpleicons 또는 Devicons 외부 소스로 대체 가능 |

### 더미 이미지 생성 대상 (사람이 교체 필요)

| 리소스 | 더미 경로 | 교체 방법 |
|--------|-----------|-----------|
| 게임 썸네일 (전 6종) | `games/<slug>/thumbnail-dummy.webp` (`math-king`, `strong-rabbit`, `panda-rush`, `black-fog-red-moon`, `universe`, `inoriter`) | 실제 게임 캡처로 교체 |
| 게임 스크린샷 (Featured 3종 우선, 각 2–4장) | `games/<slug>/screenshot-0n-dummy.webp` (`math-king`, `strong-rabbit`, `panda-rush` 우선) | 실제 플레이 장면으로 교체 |
| 대표 게임 피처드 | `hero/hero-featured-dummy.webp` | Featured 3종 중 한 게임의 키아트 또는 스크린샷으로 교체 |

---

## 7. 리소스 현황 체크리스트

후속 작업 완료 기준 추적용.

### 히어로 섹션

- [ ] `bg-hero.webp` — 히어로 배경
- [ ] `hero-featured.webp` — 대표 게임 피처드
- [ ] `profile.webp` — 프로필 이미지 (선택)

### 공용 배경·장식

- [ ] `bg-games-section.webp` — 게임 갤러리 배경
- [ ] `bg-chatbot.webp` — 챗봇 배경
- [ ] `deco-pixel-star.png` — 픽셀 장식 (선택)
- [ ] `section-divider.svg` — 섹션 구분선

### 게임 카드 (math-king · 수학의 제왕) — Featured, 더미 후 실제 캡처 교체

- [ ] `games/math-king/thumbnail-dummy.webp` → 최종: `thumbnail.webp`
- [ ] `games/math-king/screenshot-01-dummy.webp` → 최종: `screenshot-01.webp`
- [ ] `games/math-king/screenshot-02-dummy.webp` → 최종: `screenshot-02.webp`

### 게임 카드 (strong-rabbit · 강한 토끼만이 살아남는다) — Featured, 더미 후 실제 캡처 교체

- [ ] `games/strong-rabbit/thumbnail-dummy.webp` → 최종: `thumbnail.webp`
- [ ] `games/strong-rabbit/screenshot-01-dummy.webp` → 최종: `screenshot-01.webp`
- [ ] `games/strong-rabbit/screenshot-02-dummy.webp` → 최종: `screenshot-02.webp`

### 게임 카드 (panda-rush · 판다러쉬) — Featured, 더미 후 실제 캡처 교체

- [ ] `games/panda-rush/thumbnail-dummy.webp` → 최종: `thumbnail.webp`
- [ ] `games/panda-rush/screenshot-01-dummy.webp` → 최종: `screenshot-01.webp`
- [ ] `games/panda-rush/screenshot-02-dummy.webp` → 최종: `screenshot-02.webp`

### 게임 카드 (black-fog-red-moon · 검은 안개, 붉은 달) — 갤러리 노출용

- [ ] `games/black-fog-red-moon/thumbnail-dummy.webp` → 최종: `thumbnail.webp`

### 게임 카드 (universe) — 갤러리 노출용

- [ ] `games/universe/thumbnail-dummy.webp` → 최종: `thumbnail.webp`

### 게임 카드 (inoriter · 아이노리터) — 갤러리 노출용

- [ ] `games/inoriter/thumbnail-dummy.webp` → 최종: `thumbnail.webp`

### UI 아이콘

- [ ] `ui/icon-unity.svg`
- [ ] `ui/icon-csharp.svg`
- [ ] `ui/icon-shaderlab.svg`
- [ ] `ui/icon-github.svg`
- [ ] `ui/icon-jenkins.svg`
- [ ] `ui/icon-aws.svg`
- [ ] `ui/icon-docker.svg`

---

## 8. 데이터 파일 동기화 상태

| 파일 | 상태 | 비고 |
|------|------|------|
| `workspace/src/data/games.ts` | ✅ 확정 슬러그 반영 완료 | GAMES 배열 + FEATURED_GAMES export |
| `workspace/src/app/page.tsx` | ⚠️ 확인 필요 | `data/games.ts` import로 교체되어 있어야 함 |

---

## 9. 향후 작업 항목

- [ ] `page.tsx`의 `FEATURED_GAMES` 상수를 `data/games.ts` import로 교체 (미반영 시)
- [ ] 각 게임 썸네일 이미지 제작 및 `public/images/games/` 디렉터리 배치
- [ ] 게임 상세 페이지(`/games/[slug]`) 라우트 생성 시 이 슬러그 목록 기준으로 작업

---

## 10. 용어 정의

| 용어 | 정의 |
|------|------|
| 슬러그 | 게임 식별자, 소문자 하이픈 구분 (`math-king`, `strong-rabbit` 등) |
| 피처드 이미지 | 히어로 섹션에서 대표로 강조 표시되는 게임 이미지 |
| 투명 배경 | 알파 채널이 있는 PNG 또는 WebP 무손실 |
| 키아트 | 게임의 인상을 대표하는 일러스트 또는 합성 이미지 |
