# 메인 히어로 비주얼 자산 기준 복구 기록 (GP-67)

## 요약

후속 병합 정리 작업이 참조하던 `workspace/assets/hero/main-hero-visual-05.png`는
**어떤 브랜치·커밋 이력에도 존재하지 않는 유령(phantom) 경로**다.
`-05` 변형은 생성된 적이 없으며, GP-55 작업이 실제로 만든 히어로 자산은 아래 4종이다.

## 기준 정본 위치

- 소스 브랜치: `codex/gp-55-메인-히어로-대표-비주얼-에셋-제작`
- 디렉터리: `workspace/assets/hero/`

| 파일 | blob 해시 | 추가 커밋 |
|---|---|---|
| `main-hero-visual.png` | `b4068a1f0d9dff2b462a0b2685476ca4adcb6a59` | `52d796fd` |
| `main-hero-visual-02.png` | `03b204432e927523c024cf1725af66baa0da81e6` | `56ef2e55` |
| `main-hero-visual-03.png` | `1c6ae32234e320bdd2a31b9c74239924ffd72526` | `2ed2037f` |
| `main-hero-visual-04.png` | `b73b057adcf8f134194d34ca4974a48501a92048` | `1ec40c25` |

각 PNG에는 동일 이름의 `*.codex-image.json` 사이드카가 함께 존재한다.

## 대표(정본) 변형

`main-hero-visual-04.png`가 GP-55에서 마지막으로 추가된 A-04 정본 방향 버전이다.
사이드카 `generation_notes`에 "기존 버전들을 덮어쓰지 않고 새 버전으로 추가했다"고 기록되어 있어,
`-04`가 최신 권장 히어로 비주얼이고 나머지는 반복 시안이다.

## 대상 브랜치 재지정 결론

- 히어로 자산의 기준 브랜치는 `codex/gp-55-메인-히어로-대표-비주얼-에셋-제작`이다.
- `AITest` 본류와 GP-65/GP-66 후속 브랜치 tip에는 `workspace/assets/hero/`가 존재하지 않는다
  (이들은 GP-55 자산이 없는 베이스에서 분기되어 있어 병합 정리 시 보존 대상이 비어 있었음).
- 따라서 후속 merge conflict repair 작업은 위 GP-55 자산 4종(+사이드카)을 **보존 대상 정본**으로 삼아야 한다.

## 복구 내용

본 작업트리에서 위 4종 PNG와 사이드카 JSON을 GP-55 브랜치에서 그대로 복구했으며,
`git hash-object` 비교로 원본 blob과 바이트 단위 일치를 검증했다.
이제 후속 작업자가 실제 파일 기준으로 보존 대상을 검증할 수 있다.
