# 아트 리소스 명세 (Art Resource Manifest)

> 기준: 메인 시안 HUD 레이아웃 (2026-06-03)
> 출처: `raw-data-survey.md` 기반 실제 게임 목록 확정

---

## 1. 확정 게임 슬러그 목록

| 슬러그 | 게임명 | 장르 | 플랫폼 | Featured |
|--------|--------|------|--------|----------|
| `math-king` | 수학의 제왕 (HotSix) | 2D 횡스크롤 디펜스 | Android | ✅ |
| `strong-rabbit` | 강한 토끼만이 살아남는다 (Cardungeon) | 실시간 멀티플레이 덱빌딩 서바이벌 | PC + 모바일 | ✅ |
| `panda-rush` | 판다러쉬 | 러닝게임 | Android (Google Play) | ✅ |
| `black-fog-red-moon` | 검은 안개, 붉은 달 (unizam) | 한국형 오컬트 턴제 전략 | PC | ❌ |
| `universe` | Universe | 2D 메타버스 플랫폼 | PC | ❌ |
| `inoriter` | 아이노리터 (Inoriter) | 인터렉티브 미니게임 플랫폼 | 빔프로젝터/전자칠판 | ❌ |

---

## 2. Featured Games 패널 아트 리소스 (우측 패널)

### 2-1. math-king (수학의 제왕)

- **썸네일 색상**: `#4A90D9` (파란 계열)
- **아이콘 제안**: 수학 기호 + 디펜스 타워 조합
- **필요 에셋**:
  - `public/games/math-king/thumb.webp` — 게임 화면 캡처 또는 키아트 (160×90)
  - `public/games/math-king/badge-award.svg` — 우수상 배지

### 2-2. strong-rabbit (강한 토끼만이 살아남는다)

- **썸네일 색상**: `#E76F51` (주황-레드 계열)
- **아이콘 제안**: 토끼 캐릭터 + 카드 모티프
- **필요 에셋**:
  - `public/games/strong-rabbit/thumb.webp` — 게임 화면 캡처 또는 키아트 (160×90)
  - `public/games/strong-rabbit/badge-award.svg` — 수상 배지 (복수)

### 2-3. panda-rush (판다러쉬)

- **썸네일 색상**: `#27AE60` (초록 계열)
- **아이콘 제안**: 판다 캐릭터 + 달리기/죽순 모티프
- **필요 에셋**:
  - `public/games/panda-rush/thumb.webp` — 게임 화면 캡처 또는 키아트 (160×90)
  - `public/games/panda-rush/badge-googleplay.svg` — Google Play 배지

---

## 3. 갤러리 전체 목록 아트 리소스

### 3-1. black-fog-red-moon (검은 안개, 붉은 달)

- **썸네일 색상**: `#8E44AD` (보라 계열, 오컬트 분위기)
- **필요 에셋**:
  - `public/games/black-fog-red-moon/thumb.webp` (160×90)

### 3-2. universe

- **썸네일 색상**: `#2C3E50` (다크 네이비)
- **필요 에셋**:
  - `public/games/universe/thumb.webp` (160×90)

### 3-3. inoriter (아이노리터)

- **썸네일 색상**: `#E67E22` (주황 계열)
- **필요 에셋**:
  - `public/games/inoriter/thumb.webp` (160×90)

---

## 4. 공통 UI 에셋

| 파일 경로 | 용도 | 규격 |
|-----------|------|------|
| `public/ui/avatar-frame.svg` | 캐릭터 카드 아바타 프레임 | 120×120 |
| `public/ui/panel-corner.svg` | HUD 패널 모서리 장식 | 12×12 |
| `public/ui/award-star.svg` | 수상 배지 공통 별 아이콘 | 16×16 |
| `public/ui/bot-avatar.svg` | 챗봇 아바타 | 48×48 |

---

## 5. 데이터 파일 동기화 상태

| 파일 | 상태 | 비고 |
|------|------|------|
| `src/data/games.ts` | ✅ 확정 슬러그 반영 완료 | GAMES 배열 + FEATURED_GAMES export |
| `src/app/page.tsx` | ⚠️ 임시 하드코딩 잔존 | `data/games.ts` import로 교체 필요 |

---

## 6. 향후 작업 항목

- [ ] `page.tsx`의 `FEATURED_GAMES` 상수를 `data/games.ts` import로 교체
- [ ] 각 게임 썸네일 이미지 제작 및 `public/games/` 디렉터리 배치
- [ ] 게임 상세 페이지(`/games/[slug]`) 라우트 생성 시 이 슬러그 목록 기준으로 작업
