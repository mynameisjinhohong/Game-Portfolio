# Project Direction

이 문서는 AI Game Portfolio의 현재 확정 방향을 기록하는 정본이다.
티켓의 단편적인 문구, 과거 브레인스토밍 자료, 개별 작업 산출물이 이 문서와 충돌할 때는 이 문서를 우선한다.

## Project Goal

- 홍진호가 어떤 개발자인지 짧은 시간 안에 이해하고 기억할 수 있는 배포 가능한 게임 개발자 포트폴리오를 완성한다.
- 면접관과 채용 담당자가 대표 게임, 맡은 역할, 기술적 강점, 학습 경험을 빠르게 확인할 수 있게 한다.
- 홍진호 소개 챗봇을 실제 탐색 인터페이스로 제공해 방문자가 프로젝트와 경험을 자연스럽게 질문할 수 있게 한다.

## Current Direction

### Product Experience

- 챗봇은 포트폴리오의 핵심 차별점이자 첫 진입 경험이다.
- 챗봇이 주인공이어도 대표 게임과 주요 역량은 첫 화면 또는 짧은 탐색 안에서 분명하게 보여야 한다.
- 결과물과 실제 경험을 설명보다 먼저 보여주며, 참신함보다 이해 가능성과 채용 정보 전달을 우선한다.
- 인터랙션과 장식은 포트폴리오 이해를 돕는 범위에서만 사용한다.

### Visual Direction

- `A-04`를 현재 구현의 유일한 대표 시각 방향으로 사용한다.
- 밝은 `soft cream` 배경, `teal`, `game-blue`, 제한적인 `orange accent`, `graphite`를 핵심 팔레트로 사용한다.
- 게임 HUD 감성은 얇은 테두리, 아이콘, 절제된 pixel motif 같은 장식 수준으로만 사용한다.
- 화면은 playful하고 활기차되 실제 웹사이트처럼 정돈되고 읽기 쉬워야 한다.
- CTA의 오렌지 포인트는 제한적으로 사용해 시선을 분산시키지 않는다.

### Architecture And Workspace

- 실제 애플리케이션 루트는 `workspace/` 하나이며, `workspace/portfolio/` 같은 중첩 앱 루트를 만들지 않는다.
- 활성 개발 자료는 `workspace/`, 방향 확정 이전 탐색 자료는 `archive/`, 프로젝트 계획 문서는 `docs/planning/`에 둔다.
- 챗봇은 로컬 LLM 활용을 우선 고려하되, 배포와 운영 안정성을 해치지 않는 방식으로 구성한다.

## Non-Goals

- 어두운 cinematic sci-fi cockpit, blue-only hologram studio, 과도한 HUD 오버레이를 대표 시각 방향으로 사용하지 않는다.
- A-04와 무관한 과거 컨셉을 현재 구현 방향처럼 혼합하지 않는다.
- 챗봇 때문에 대표 게임과 채용 판단에 필요한 정보가 숨겨지는 구성을 만들지 않는다.
- 일반적인 SaaS 카드 모음처럼 보이는 무난한 랜딩 페이지를 목표로 하지 않는다.
- 같은 기능을 서로 다른 앱 루트나 중복 페이지에 구현하지 않는다.
- 장식 효과나 실험적 기능을 실제 배포 안정성보다 우선하지 않는다.

## Canonical References

- `PROJECT_CONTEXT.md`: 목표 사용자, 필수 기능, 구현 우선순위
- `docs/FOLDER_GUIDE.md`: 폴더 구조와 파일 배치 규칙의 정본
- `workspace/assets/a-04/hero-first-concepts-04.png`: 현재 대표 시각 시안
- `workspace/assets/a-04/hero-first-concepts-04.png.codex-image.json`: 대표 시안의 생성 의도, 팔레트, 금지 요소
- `workspace/docs/concept-analysis.md`: A-04 선택 근거와 구현 권장 방향
- `workspace/docs/art-resource-manifest.md`: 구현에 필요한 아트 리소스 명세

## Direction Change Policy

- 제품 목표, 핵심 사용자 경험, 대표 시각 언어, 주요 아키텍처, 정본 참조, 지속적인 운영 제약이 바뀌면 이 문서를 갱신한다.
- 방향을 변경한 작업은 변경 내용과 근거를 `Direction Change Log`에 함께 기록한다.
- 버그 수정, 내부 구현 세부사항, 한 번만 사용하는 절차, 기존 방향을 그대로 구현한 작업은 이 문서를 갱신하지 않는다.
- Jira 티켓이나 코멘트의 단편적인 문구만으로 현재 방향을 암묵적으로 덮어쓰지 않는다.
- 요청이 현재 방향과 충돌하면서 명시적인 방향 변경 승인이 없다면 작업을 중단하고 사람의 결정을 요청한다.

## Direction Change Log

- 2026-05-09: 컨셉 분석 결과를 바탕으로 A-04를 현재 대표 시각 방향으로 확정했다. 출처: `workspace/docs/concept-analysis.md`
- 2026-05-26: 실제 애플리케이션 루트를 `workspace/` 하나로 통합하고 중첩 앱 루트를 금지했다. 출처: `workspace-structure-cleanup`, `docs/FOLDER_GUIDE.md`
- 2026-06-04: 전체 프로젝트 방향을 모든 에이전트가 공유하고 검증할 수 있도록 이 정본 문서와 변경 정책을 명시했다. 출처: 운영자 결정
