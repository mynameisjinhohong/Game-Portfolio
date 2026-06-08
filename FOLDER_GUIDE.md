# 폴더 구조 운영 가이드 (요약)

> 상세 버전: [`docs/FOLDER_GUIDE.md`](docs/FOLDER_GUIDE.md)

> **⚠️ AI 에이전트 필독**: 파일을 추가·수정·이동하기 전에 반드시 [`docs/FOLDER_GUIDE.md`](docs/FOLDER_GUIDE.md) 전체를 읽고 업데이트 절차를 따른다. 이 요약본만으로는 업데이트 지침을 파악할 수 없다.

## 폴더 구조 개요

```
.
├── workspace/          # [활성] A-04 기반 개발 작업 공간
├── archive/            # [보관] 브레인스토밍 단계 자료 (수정 금지)
├── docs/               # 프로젝트 계획·운영 문서
├── PROJECT_CONTEXT.md  # 프로젝트 전반 맥락 및 요구사항
└── PROJECT_DIRECTION.md # 현재 확정된 프로젝트 방향성 정본
```

## 빠른 판단 기준

| 자료 유형 | 위치 |
|---|---|
| 현재 개발 코드 | `workspace/src/` |
| Next.js 앱 루트·실행 설정 | `workspace/` |
| A-04 기반 문서·대표 시안 | `workspace/docs/`, `workspace/assets/a-04/` |
| 실제 화면용 배경·장식 비트맵 에셋 | `workspace/assets/backgrounds/`, `workspace/assets/decor/` |
| A-04 시안 공용 시각 시스템 에셋 명세 | `workspace/assets/a-04-asset-manifest.md` |
| 이미지 생성 프롬프트·참조 자료 | `workspace/assets/prompts/`, `workspace/assets/references/` |
| 프로젝트 계획·로드맵 | `docs/planning/` |
| 브레인스토밍·탐색 자료 | `archive/brainstorming/`, `archive/concepts/` |
| 현재 확정 방향과 정본 참조 | `PROJECT_DIRECTION.md` |

자세한 배치 기준과 혼용 방지 규칙은 [`docs/FOLDER_GUIDE.md`](docs/FOLDER_GUIDE.md)를 참고한다. `workspace/portfolio/`처럼 `workspace` 아래에 별도 앱 루트를 중첩해서 만들지 않는다.
