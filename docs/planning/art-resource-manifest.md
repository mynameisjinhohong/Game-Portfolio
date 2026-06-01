# 아트 리소스 명세서

> 작성 기준: GP-54 (GP-53 아트 리소스 제작 하위 작업)  
> 목적: 메인 페이지 시안을 기준으로 필요한 아트 리소스를 구분·목록화하고, 후속 이미지 생성 작업에서 바로 참조할 수 있는 기준을 제공한다.  
> 참조: `docs/content/section-content-map.md` (GP-52), `docs/planning/portfolio-foundation-plan.md`

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
| 게임 카드 더미: `<slug>-thumbnail-dummy` | `gravity-flip-thumbnail-dummy.webp` |
| 스크린샷 더미: `<slug>-screenshot-<n>-dummy` | `gravity-flip-screenshot-01-dummy.webp` |
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

## 1. 히어로 섹션 리소스

히어로 섹션은 첫 방문자가 10초 이내에 "게임 개발자 홍진호"를 인식하게 하는 핵심 구역이다.

### 1-1. 히어로 배경 이미지

| 항목 | 내용 |
|------|------|
| 용도 | 히어로 섹션 전체 배경 (오버레이 텍스트 위에 깔리는 배경) |
| 권장 크기 | 1920×1080px (16:9, 최대 1440px 너비로도 사용) |
| 포맷 | WebP (손실, 품질 75–80) |
| 투명 배경 | 불필요 (불투명 배경 이미지) |
| 저장 경로 | `public/images/hero/bg-hero.webp` |
| 이미지 특성 | 어두운 분위기(#0a0a0f 계열), 픽셀아트 또는 사이버펑크 감성, 게임 개발자 정체성 표현 |
| 추가 참고 | 텍스트 가독성을 위해 중앙 영역은 밝기를 낮게 유지 |

### 1-2. 대표 게임 피처드 이미지

| 항목 | 내용 |
|------|------|
| 용도 | 히어로 섹션 우측(또는 중앙 하단)에 표시되는 대표 게임 비주얼 |
| 권장 크기 | 800×450px (16:9) 또는 600×400px |
| 포맷 | WebP (손실, 품질 85) |
| 투명 배경 | 불필요 |
| 저장 경로 | `public/images/hero/hero-featured.webp` |
| 이미지 특성 | 대표 게임(Gravity Flip 또는 가장 완성도 높은 게임) 스크린샷 또는 키아트 |
| 추가 참고 | **실제 게임 스크린샷을 사람이 직접 교체**하는 것이 원칙. 초기 구현에서는 더미 이미지(`hero-featured-dummy.webp`)를 사용한다. |

### 1-3. 프로필 이미지 (선택)

| 항목 | 내용 |
|------|------|
| 용도 | 히어로 또는 소개 섹션의 개발자 프로필 사진 |
| 권장 크기 | 400×400px (정사각형) |
| 포맷 | WebP 또는 PNG |
| 투명 배경 | 선택 (원형 클립 처리 시 배경색 무관) |
| 저장 경로 | `public/images/hero/profile.webp` |
| 이미지 특성 | 실제 사진 사용 권장; AI 아바타로 대체 가능 |

---

## 2. 공용 배경 및 장식 요소

사이트 전체에 반복 사용되는 배경·장식 리소스. 섹션 분위기를 통일하는 역할.

### 2-1. 게임 갤러리 섹션 배경

| 항목 | 내용 |
|------|------|
| 용도 | 게임 카드 목록이 배치되는 섹션 배경 |
| 권장 크기 | 1920×600px 이상 (세로 가변) |
| 포맷 | WebP (손실, 품질 75) |
| 투명 배경 | 불필요 |
| 저장 경로 | `public/images/bg/bg-games-section.webp` |
| 이미지 특성 | 어두운 그라데이션 또는 격자 패턴, 히어로 배경과 시각적 연속성 유지 |

### 2-2. 챗봇 섹션 배경

| 항목 | 내용 |
|------|------|
| 용도 | 챗봇 UI가 표시되는 섹션 또는 플로팅 패널 배경 |
| 권장 크기 | 800×600px (챗봇 패널 내부) |
| 포맷 | WebP (손실, 품질 75) |
| 투명 배경 | 불필요 |
| 저장 경로 | `public/images/bg/bg-chatbot.webp` |
| 이미지 특성 | 미래적·기술적 분위기, 파란색 또는 보라색 계열 |

### 2-3. 픽셀아트 장식 파티클 (선택)

| 항목 | 내용 |
|------|------|
| 용도 | 히어로·섹션 전환 영역에 배치하는 소형 장식 요소 |
| 권장 크기 | 64×64px 또는 128×128px |
| 포맷 | PNG (투명 배경) |
| 투명 배경 | 필요 |
| 저장 경로 | `public/images/bg/deco-pixel-star.png`, `deco-pixel-dot.png` |
| 이미지 특성 | 픽셀아트 스타일, 별·점·다이아몬드 등 단순 형태 |

### 2-4. 섹션 구분선 장식

| 항목 | 내용 |
|------|------|
| 용도 | 섹션 간 경계 시각화 (Wave 또는 기울어진 분리선) |
| 권장 크기 | 1920×120px |
| 포맷 | SVG 또는 PNG (투명 배경) |
| 투명 배경 | 필요 |
| 저장 경로 | `public/images/bg/section-divider.svg` |
| 이미지 특성 | 단색 또는 그라데이션 Wave 형태 |

---

## 3. 게임 카드용 요소

게임 목록 섹션에서 각 게임 카드에 사용되는 리소스. 게임별로 독립 슬러그 폴더에 저장.

### 3-1. 게임 썸네일

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

#### 필요한 게임 슬러그 목록

| 슬러그 | 게임명 | 비고 |
|--------|--------|------|
| `gravity-flip` | Gravity Flip | Itch.io 배포 완료 |
| `zombie-survival` | Zombie Survival | 대표 게임 |
| `puzzle-platformer` | Puzzle Platformer | 이름 확정 필요 |
| `rpg-dungeon` | RPG Dungeon | 이름 확정 필요 |

> **주의**: 게임 슬러그와 실제 게임명은 `data/games.ts` 파일 확정 후 동기화 필요

### 3-2. 게임 상세 스크린샷

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

### 3-3. 기술 스택 아이콘 / 뱃지

| 항목 | 내용 |
|------|------|
| 용도 | 게임 카드 및 소개 섹션에서 사용 기술 시각화 |
| 권장 크기 | 32×32px (표시), 원본 SVG |
| 포맷 | SVG 우선, 없으면 PNG |
| 투명 배경 | 필요 |
| 저장 경로 | `public/images/ui/icon-<tech-name>.svg` |
| 항목 | `unity`, `csharp`, `blender`, `photoshop`, `github` |

### 3-4. 게임 장르 뱃지 (선택)

| 항목 | 내용 |
|------|------|
| 용도 | 게임 카드 코너에 표시하는 장르 구분 레이블 |
| 권장 크기 | 80×24px 텍스트 레이블 형태 또는 CSS로 처리 |
| 포맷 | CSS/SVG (이미지 없이 처리 권장) |
| 저장 경로 | CSS 처리 시 불필요 |
| 이미지 특성 | "플랫포머", "RPG", "퍼즐" 등 텍스트 레이블 |

---

## 4. AI 이미지 생성 작업 우선순위

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
| 게임 썸네일 (전 게임) | `games/<slug>/thumbnail-dummy.webp` | 실제 게임 캡처로 교체 |
| 게임 스크린샷 (각 게임 2–4장) | `games/<slug>/screenshot-0n-dummy.webp` | 실제 플레이 장면으로 교체 |
| 대표 게임 피처드 | `hero/hero-featured-dummy.webp` | 대표 게임 키아트 또는 스크린샷으로 교체 |

---

## 5. 리소스 현황 체크리스트

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

### 게임 카드 (gravity-flip) — 더미 이미지, 사람이 교체 필요

- [ ] `games/gravity-flip/thumbnail-dummy.webp` → 최종: `thumbnail.webp`
- [ ] `games/gravity-flip/screenshot-01-dummy.webp` → 최종: `screenshot-01.webp`
- [ ] `games/gravity-flip/screenshot-02-dummy.webp` → 최종: `screenshot-02.webp`

### 게임 카드 (zombie-survival) — 더미 이미지, 사람이 교체 필요

- [ ] `games/zombie-survival/thumbnail-dummy.webp` → 최종: `thumbnail.webp`
- [ ] `games/zombie-survival/screenshot-01-dummy.webp` → 최종: `screenshot-01.webp`
- [ ] `games/zombie-survival/screenshot-02-dummy.webp` → 최종: `screenshot-02.webp`

### 게임 카드 (추가 게임) — 더미 이미지, 사람이 교체 필요

- [ ] `games/<slug>/thumbnail-dummy.webp` × N → 최종: `thumbnail.webp`

### UI 아이콘

- [ ] `ui/icon-unity.svg`
- [ ] `ui/icon-csharp.svg`
- [ ] `ui/icon-github.svg`

---

## 6. 용어 정의

| 용어 | 정의 |
|------|------|
| 슬러그 | 게임 식별자, 소문자 하이픈 구분 (`gravity-flip`) |
| 피처드 이미지 | 히어로 섹션에서 대표로 강조 표시되는 게임 이미지 |
| 투명 배경 | 알파 채널이 있는 PNG 또는 WebP 무손실 |
| 키아트 | 게임의 인상을 대표하는 일러스트 또는 합성 이미지 |
