# 폴더 구조 운영 가이드

## 목적

이 문서는 AI Game Portfolio 레포지토리의 폴더 구조와 운영 규칙을 정의한다.
**A-04 기반 활성 작업 자료**와 **과거 브레인스토밍 보관 자료**를 명확히 분리하여 혼용을 방지하는 것이 핵심 목표다.

---

## 폴더 구조 개요

```
.
├── workspace/                  # [활성] A-04 기반 개발 작업 공간
│   ├── assets/
│   │   ├── a-04/              # A-04 컨셉 기반 시각 자료 (디자인 시안)
│   │   ├── prompts/           # codex_imagegen 작업용 이미지 생성 프롬프트
│   │   └── references/        # 스타일 참조 이미지 및 색상 팔레트 메모
│   ├── docs/                  # A-04 기반 설계·분석 문서
│   ├── src/                   # 실제 소스 코드
│   ├── package.json           # 단일 Next.js 앱 루트
│   ├── .env.example           # 환경 변수 예시
│   └── README.md              # workspace 실행·배포 안내
│
├── archive/                    # [보관] 브레인스토밍 단계 자료 (수정 금지)
│   ├── brainstorming/         # 초기 아이디어·탐색 문서
│   └── concepts/              # 컨셉 후보 비교용 이미지
│
├── docs/
│   └── planning/              # 프로젝트 계획·로드맵 문서
│
└── PROJECT_CONTEXT.md         # 프로젝트 전반 맥락 및 목표
```

---

## 영역별 배치 기준

### `workspace/` — A-04 기반 활성 작업 자료

현재 진행 중인 개발에 직접 참조하거나 수정하는 자료를 둔다.

| 하위 경로 | 두는 자료 |
|---|---|
| `workspace/assets/a-04/` | A-04 컨셉 이미지, 디자인 시안 |
| `workspace/assets/prompts/` | codex_imagegen 작업용 이미지 생성 프롬프트 텍스트 파일 |
| `workspace/assets/references/` | 스타일 참조 이미지 또는 색상 팔레트 메모 |
| `workspace/docs/` | A-04 기반 컨셉 분석, 구현 계획, 기술 결정 근거, 컴포넌트 설계 |
| `workspace/src/` | 실제 구현 소스 코드 |
| `workspace/package.json` | 단일 Next.js 앱의 스크립트와 의존성 |
| `workspace/.env.example` | 로컬 LLM 및 사이트 URL 환경 변수 예시 |

**배치 기준**: "지금 개발에 참조하거나 수정해야 하는가?" → YES이면 `workspace/`

> `workspace/portfolio/`처럼 `workspace` 아래에 별도 Next.js 앱 루트를 중첩해서 만들지 않는다.
> 앱 루트는 `workspace/` 하나이며, 라우트와 컴포넌트는 `workspace/src/` 아래에 둔다.

### `archive/` — 브레인스토밍 보관 자료

방향이 확정되기 전에 생성된 탐색·아이디어 자료를 보존 목적으로 둔다.
**확정 후에는 수정하지 않는다.**

| 하위 경로 | 두는 자료 |
|---|---|
| `archive/brainstorming/` | 컨셉 후보 비교 분석, MVP 우선순위 초안, 기능 아이디어 목록 |
| `archive/concepts/` | 브레인스토밍 단계에서 생성한 컨셉 후보 이미지 |

**배치 기준**: "개발 방향이 확정되기 전에 만들어진 탐색 자료인가?" → YES이면 `archive/`

### `docs/planning/` — 프로젝트 계획 문서

로드맵, 백로그, 요구사항 등 프로젝트 전반 계획을 담는다.
특정 개발 컨셉(A-04)에 종속되지 않는 문서를 둔다.

---

## 새 파일 배치 결정 흐름

```
새 파일을 추가할 때 순서대로 확인한다.

1. 지금 개발 중인 코드인가?
   → YES: workspace/src/

2. A-04 기반으로 현재 개발에 참조할 문서·이미지인가?
   → 문서: workspace/docs/
   → 이미지: workspace/assets/a-04/

3. 프로젝트 계획·로드맵·요구사항 문서인가?
   → docs/planning/

4. 방향 확정 이전의 탐색·아이디어 자료인가?
   → 문서: archive/brainstorming/
   → 이미지: archive/concepts/
```

---

## 혼용 방지 규칙

| 금지 사항 | 이유 |
|---|---|
| `workspace/`에 브레인스토밍 단계 문서 추가 | 활성 참조 자료와 보관 자료가 섞여 혼란 발생 |
| `archive/` 내 파일 수정 | 보관 자료는 당시 맥락을 원본 그대로 보존해야 함 |
| A-04 외 컨셉 비교 문서를 `workspace/docs/`에 두기 | A-04 기반 자료만 workspace에 배치 |
| 신규 컨셉 이미지를 `archive/concepts/`에 추가 | archive는 보관 전용, 새 자료는 workspace에 |
| `workspace/portfolio/` 같은 중첩 앱 루트 생성 | 실행 기준과 PR 작업 범위가 갈라져 같은 화면을 두 번 구현하게 됨 |

---

## 에이전트 작업 시 가이드 업데이트 지침

> **이 문서(`docs/FOLDER_GUIDE.md`)가 정본이다.** 루트의 `FOLDER_GUIDE.md`는 이 문서를 가리키는 요약본이므로, 폴더 구조 규칙을 파악하거나 업데이트할 때는 반드시 이 파일을 기준으로 한다.

AI 에이전트(Codex, Claude 등)가 작업을 수행할 때 폴더 구조에 변경이 생기면 반드시 이 문서를 함께 업데이트해야 한다.

### 업데이트가 필요한 경우

| 작업 | 업데이트 내용 |
|---|---|
| 새 최상위 폴더 생성 | "폴더 구조 개요" 트리 및 "영역별 배치 기준"에 항목 추가 |
| 기존 폴더 이름 변경 | 모든 경로 참조 일괄 수정 |
| 하위 폴더 추가 | 해당 상위 영역의 배치 기준 표에 행 추가 |
| 폴더 삭제 또는 이동 | 트리, 배치 기준 표, 결정 흐름 동시 수정 |

### 업데이트 절차

1. `docs/FOLDER_GUIDE.md`의 "폴더 구조 개요" 트리를 실제 구조에 맞게 수정한다.
2. 해당 폴더에 어떤 자료를 두어야 하는지 "영역별 배치 기준" 표에 명시한다.
3. "새 파일 배치 결정 흐름"의 판단 순서가 여전히 유효한지 검토하고 필요 시 갱신한다.
4. "히스토리"에 변경 내용과 관련 티켓을 한 줄 추가한다.
5. 루트의 `FOLDER_GUIDE.md`(요약본) 테이블도 새 폴더를 반영하여 업데이트한다.

---

## 히스토리

- **GP-10**: A-04 기반 개발 방향 확정 후 폴더 구조를 workspace/archive로 분리 결정
- **GP-16**: 레포지토리 작업 영역 구조 초안 확정
- **GP-17**: 기존 자료를 workspace/archive 구조로 재배치 실행
- **GP-18**: 이 운영 가이드 문서 추가
- **GP-54**: `workspace/assets/` 하위에 `prompts/`, `references/` 폴더 추가 (이미지 생성 프롬프트 및 참조 자료 보관)
- **workspace-structure-cleanup**: 중첩 Next.js 앱(`workspace/portfolio`)을 제거하고 `workspace/` 단일 앱 루트로 정리
