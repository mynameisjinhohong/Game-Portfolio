# A-04 메인 페이지 에셋 명세

> 출처 시안: `workspace/assets/a-04/hero-first-concepts-04.png`
> 시안 메타데이터: `workspace/assets/a-04/hero-first-concepts-04.png.codex-image.json`
> 정본 방향: `PROJECT_DIRECTION.md` (Visual Direction 절)
> 게임별 썸네일·배지 등 콘텐츠 에셋: `workspace/docs/art-resource-manifest.md`

## 1. 문서의 목적

`PROJECT_DIRECTION.md`가 확정한 A-04 시안을 실제 웹 화면으로 구현하려면
배경 텍스처 한 장만으로는 부족하다.
시안에는 캐릭터 아바타, 스탯 카드, 챗봇 패널, HUD 아이콘, CTA 버튼, Tech Stack 아이콘 묶음 등
복수의 시각 컴포넌트가 함께 등장한다.

이 문서는 A-04 시안을 구성하는 모든 시각 컴포넌트를 식별하고,
컴포넌트별로 어떤 공용/장식 에셋이 필요한지 한 곳에 정리한다.
실제 PNG 자산 생성 작업(codex_imagegen)은 이 명세를 기준으로 분리된 후속 서브태스크에서 진행한다.

게임별 썸네일, 수상 배지, 데이터 파일 동기화처럼 콘텐츠 단위 에셋은
별도 문서인 `workspace/docs/art-resource-manifest.md`에서 관리한다.
이 문서는 그 명세와 중복되지 않도록 **시안 공용 시각 시스템에 한정**한다.

## 2. A-04 시안 컴포넌트 지도

A-04 시안을 위에서 아래·왼쪽에서 오른쪽 순서로 분해하면 다음 컴포넌트가 식별된다.

| ID | 영역 | 컴포넌트 | 시안 내 위치 |
|----|------|----------|--------------|
| C-01 | 전체 | 공용 배경 텍스처 | 화면 전체 |
| C-02 | 전체 | 가장자리 HUD 장식 | 코너·카드 모서리 |
| C-03 | 좌측 카드 | 캐릭터 아바타(픽셀형) | 좌측 상단 |
| C-04 | 좌측 카드 | 아바타 프레임 + Lv 배지 | 아바타 둘레 |
| C-05 | 좌측 카드 | 스탯 바(Creativity / Problem Solving / Teamwork) | 아바타 아래 |
| C-06 | 챗 패널 | 상단 상태 아이콘(하트·구슬·번개) | 패널 상단 |
| C-07 | 챗 패널 | 챗봇 아바타(작은 봇 마커) | 패널 상단 중앙 |
| C-08 | 챗 패널 | 챗 말풍선 프레임 | 패널 본문 |
| C-09 | 챗 패널 | 빠른 액션 버튼 아이콘(게임패드·코드·사람) | 패널 본문 |
| C-10 | 챗 패널 | 입력창 + 전송 아이콘(종이비행기) | 패널 하단 |
| C-11 | 우측 패널 | "Featured Games" 카드 프레임 | 우측 상단 |
| C-12 | 우측 패널 | "Tech Stack" 아이콘 그리드 프레임 | 우측 하단 |
| C-13 | CTA | "Start Chat" 오렌지 버튼 + 게임패드 아이콘 | 화면 하단 중앙 |

> 게임 썸네일(C-11 내부 이미지)과 Tech Stack의 실제 기술 로고(C-12 내부 이미지)는
> 외부 IP/콘텐츠에 해당하므로 본 명세가 직접 생성을 다루지 않는다.
> 카드 프레임·그리드 프레임 등 **컨테이너 장식**만 본 문서가 다룬다.

## 3. 에셋 카테고리

본 명세에서 관리하는 공용 시각 에셋은 다음 4개 카테고리로 묶는다.

| 카테고리 | 디렉터리 | 설명 |
|----------|----------|------|
| 배경 | `workspace/assets/backgrounds/` | 한 장으로 화면 전체를 받쳐 주는 텍스처 |
| 장식 | `workspace/assets/decor/` | 코너·모서리에 얹는 작은 HUD 오브젝트 |
| 캐릭터 | `workspace/assets/characters/` | 좌측 카드용 픽셀 아바타와 프레임 |
| HUD 아이콘 | `workspace/assets/icons/` | 챗 패널·CTA에서 반복 사용하는 작은 단일 아이콘 |

`characters/`와 `icons/`는 본 문서 시점에 아직 생성되지 않은 디렉터리이며,
후속 서브태스크에서 첫 자산이 생성될 때 함께 만든다.

## 4. 에셋별 명세

각 항목은 컴포넌트 ID → 에셋 파일 → 상태 → 생성 의도 순으로 정리한다.
"상태" 컬럼이 `생성됨`인 항목만 본 PR 시점에 실제 PNG가 존재한다.
나머지 항목은 후속 작업에서 생성될 예정이며,
본 PR은 그 계획 자체를 정본화하는 데 의의가 있다.

### 4-1. 배경 (`backgrounds/`)

| 컴포넌트 | 에셋 파일 | 상태 | 비고 |
|----------|-----------|------|------|
| C-01 | `home-shared-background.png` | 생성됨 | 메인 페이지 전체 공용 배경. 중앙 여백을 비우고 가장자리 위주 장식. |

### 4-2. 장식 (`decor/`)

| 컴포넌트 | 에셋 파일 | 상태 | 비고 |
|----------|-----------|------|------|
| C-02 | `home-edge-hud-accent-01.png` | 생성됨 | 좌상단/우상단 코너 또는 카드 모서리에 재사용하는 HUD 오브젝트. |
| C-11 | `featured-games-card-frame.png` | 예정 | Featured Games 카드 컨테이너용 얇은 HUD 프레임. |
| C-12 | `tech-stack-grid-frame.png` | 예정 | Tech Stack 그리드 컨테이너용 얇은 HUD 프레임. |
| C-08 | `chat-panel-frame.png` | 예정 | 중앙 챗 패널 외곽 프레임(말풍선·라운드 코너 포함). |

### 4-3. 캐릭터 (`characters/`)

| 컴포넌트 | 에셋 파일 | 상태 | 비고 |
|----------|-----------|------|------|
| C-03 | `hongjinho-avatar.png` | 예정 | 좌측 카드용 픽셀 아바타. 표정·복장은 시안 분위기를 따르되 graphite 라인 유지. |
| C-04 | `avatar-frame-with-level-badge.png` | 예정 | 아바타 둘레 프레임 + `Lv.18` 배지 디자인. |
| C-05 | `stat-bar-set.png` 또는 SVG | 예정 | Creativity·Problem Solving·Teamwork 스탯 바 장식. 색은 game-blue 계열. |

### 4-4. HUD 아이콘 (`icons/`)

아이콘류는 가능한 한 SVG로 생성해 다크/라이트 톤 변형이 쉽도록 한다.
codex_imagegen으로 생성할 때는 단일 PNG로 생성한 뒤 후속 작업에서 SVG화한다.

| 컴포넌트 | 에셋 파일 | 상태 | 비고 |
|----------|-----------|------|------|
| C-06 | `status-heart.png`, `status-orb.png`, `status-bolt.png` | 예정 | 상단 상태 아이콘 3종. teal·game-blue·orange 한 점만 허용. |
| C-07 | `bot-avatar.png` | 예정 | 챗봇 패널 상단 작은 봇 마커. |
| C-09 | `quick-action-gamepad.png`, `quick-action-code.png`, `quick-action-person.png` | 예정 | 빠른 액션 버튼 3종 아이콘. |
| C-10 | `send-paper-plane.png` | 예정 | 입력창 우측 전송 버튼 아이콘. |
| C-13 | `cta-start-chat-gamepad.png` | 예정 | "Start Chat" CTA 좌측 게임패드 아이콘. CTA 자체는 컴포넌트에서 합성. |

## 5. 색·금지 요소 공통 규약

모든 에셋은 다음 규약을 따른다. 위반 시 PR 단계에서 재생성한다.

- 사용 가능한 색: `soft cream (#F4ECD8)` 베이스, `graphite` 라인, `teal`, `game-blue`,
  CTA 한정 `orange accent`.
- 금지: 어두운 navy/black 배경, 강한 cyan glow, sci-fi cockpit·blue-only hologram 무드,
  과한 HUD 오버레이, 텍스트·캐릭터 로고·워터마크.
- HUD 장식은 얇은 라인과 작은 pixel motif 수준으로만 사용한다.

세부 규약은 `PROJECT_DIRECTION.md`의 Visual Direction 절을 정본으로 한다.
본 문서와 정본이 충돌하면 정본을 우선한다.

## 6. 작업 분할 원칙

본 명세에 따른 후속 codex_imagegen 작업은 다음 원칙으로 분할한다.

1. **카테고리별 분할**: 한 서브태스크는 한 카테고리 내의 동일한 무드 자산만 생성한다.
   배경과 아이콘을 한 작업에서 동시에 생성하지 않는다.
2. **단일 책임**: 한 서브태스크는 최대 3개의 관련 PNG만 다룬다.
   그래야 재작업 시 영향 범위가 좁다.
3. **메타데이터 동봉**: 각 PNG와 동일한 이름의 `*.codex-image.json` 메타데이터를 함께 둔다.
   메타데이터는 prompt, summary, generation_notes를 모두 포함한다.
4. **참조 일관성**: 새 PNG를 추가할 때 본 문서의 "상태" 컬럼을 `생성됨`으로 갱신하고,
   필요 시 `workspace/docs/art-resource-manifest.md`에도 cross-link을 남긴다.

## 7. 변경 이력

- 2026-06-07: 초기 작성. 기존 PR에서 배경·장식 2개 자산만 생성된 점에 대한 리뷰 피드백(GP-60)을 반영해
  A-04 시안의 모든 공용 시각 컴포넌트와 필요한 에셋 목록을 정본화했다.
