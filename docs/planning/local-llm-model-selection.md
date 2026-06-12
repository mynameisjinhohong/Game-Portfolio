# 로컬 LLM 모델 선정안 (GP-59 / GP-61)

> 본 문서는 맥미니 환경에서 사용할 로컬 LLM 1종을 확정하고, 기존 `llama3` / `llama3.2:3b` 가정이 남아 있는 파일을 후속 작업에서 어떻게 바꿔야 할지 정리한 정본이다.
> 챗봇·환경 변수·계획 문서를 수정하는 후속 PR은 본 문서의 "교체 범위" 표를 기준으로 작업한다.

---

## 1. 결정 요약

| 항목 | 값 |
|---|---|
| 선정 모델 (1차) | **Qwen3-30B-A3B** (Hugging Face: `Qwen/Qwen3-30B-A3B`, Ollama 태그 후보: `qwen3:30b-a3b`) |
| 선정 양자화 | `Q6_K` (whichllm 자동 추천) |
| 폴백 모델 | `gpt-oss:20b` 또는 `qwen3:14b` |
| 런타임 | Ollama (`http://localhost:11434`) |
| 결정 근거 | 2026-06-10 맥미니 (Apple M4 / 32GB) 환경에서 whichllm `--profile general` 실행 결과 1순위 |
| 폐기되는 가정 | `llama3.2:3b`, 단순 `llama3` 태그 사용 가정 |

이후 모든 환경 변수, 코드, 계획 문서는 위 모델을 기본값으로 가정하고 교체한다.

---

## 2. 실행 환경 (whichllm 결과)

`whichllm hardware` 출력 기준:

| 항목 | 값 |
|---|---|
| GPU | Apple M4 (32.0 GB 공유 메모리, BW 120 GB/s) |
| CPU | Apple M4 (10 cores) |
| RAM | 32.0 GB |
| Disk free | 346.0 GB |
| OS | darwin |

명령: `whichllm -n 10 --profile general` (2026-06-10 실행)

상위 5개 모델 (whichllm Recommended Models):

| 순위 | 모델 | 파라미터 | 양자화 | 추정 속도 (tok/s) | 품질 점수 | 메모 |
|---|---|---|---|---|---|---|
| 1 | `Qwen/Qwen3-30B-A3B` | 30.5B (active 3.0B, MoE) | Q6_K | ~20.2 (7.1~40.4, low conf.) | 81.4 | full_gpu fit, Apache 2.0 |
| 2 | `Qwen/Qwen3.6-27B` | 27.8B | Q8_0 | ~1.5 (0.9~2.4) | 80.6 | full_gpu fit지만 속도 낮음 |
| 3 | `google/gemma-4-26B-A4B-it` | 26.5B (active 3.8B, MoE) | Q6_K | ~15.9 (5.6~31.9, low conf.) | 78.7 | Apache 2.0 |
| 4 | `google/gemma-4-31B-it` | 32.7B | Q6_K | ~1.85 (1.1~3.0) | 77.7 | 메모리 거의 가득 참 |
| 5 | `openai/gpt-oss-20b` | 21.5B (active 3.6B, MoE) | Q5_K_M | ~20.7 (7.2~41.3, low conf.) | 75.5 | Apache 2.0, MoE |

whichllm 본문 주의 사항: "Top pick confidence: Low (direct benchmark but very close, +0.8 vs #2)", 속도 추정 신뢰도는 #1, #3에서 낮음.

---

## 3. 최종 선정 사유

`Qwen3-30B-A3B`를 1차 선정 모델로 확정한다.

1. **품질**: whichllm `general` 프로파일 기준 직접 벤치마크 점수가 81.4로 후보 중 가장 높다.
2. **속도**: MoE(전체 30.5B / 활성 3.0B) 구조라 동급 dense 27~31B 모델 대비 추정 토큰 속도가 한 자릿수 배 이상 빠르다. 대화형 챗봇의 응답 대기 시간을 줄여 준다.
3. **메모리 적합성**: Q6_K 기준 VRAM 요구치 ~24.5GB로 Apple M4 32GB 공유 메모리에 `full_gpu`로 적재 가능하며, 컨텍스트 4096 토큰을 위한 KV 캐시 여유가 남는다.
4. **한국어 대응**: Qwen 계열은 중국어·영어·한국어를 포함한 다국어 학습 비중이 커서 `llama3.2:3b`에서 보고된 한국어 응답 시 영어/중국어 혼용 문제를 줄이는 데 유리하다.
5. **라이선스**: Apache 2.0 으로 포트폴리오 배포 시 라이선스 부담이 없다.

### 폴백 정책

| 상황 | 사용 모델 | 이유 |
|---|---|---|
| Q6_K 모델 다운로드 용량(~25GB) 또는 메모리 압박이 문제일 때 | `openai/gpt-oss:20b` (Q5_K_M, ~14.8GB) | MoE 구조라 응답 속도 유사, 메모리 여유 큼 |
| MoE 미지원/응답 불안정 시 | `qwen3:14b` (Q4_K_M, ~8.3GB) | 같은 Qwen 계열로 톤 일관성 유지, 메모리 매우 여유 |

폴백 모델로 교체할 때도 환경 변수와 문서의 모델명만 바꾸면 되도록 후속 작업은 모델 식별자를 단일 변수(`LLM_MODEL`, `NEXT_PUBLIC_CHATBOT_MODEL`)에서 일괄 관리한다.

### 운영상 주의 사항

- whichllm은 Top pick confidence가 "Low"라고 명시한다. 실제 응답 품질·속도는 사람이 Ollama에서 한국어 프롬프트로 검증한 뒤 폴백 모델로 전환할 수 있도록 환경 변수 기반 교체 구조를 유지한다.
- Ollama 레지스트리에 정확히 동일한 태그가 없으면 `qwen3:30b` 같은 가장 가까운 변형을 사용하고, 본 문서에 실제 사용한 태그를 함께 기록한다.
- MoE 모델은 Apple Silicon에서 Metal/MLX 런타임 커널에 따라 처리량이 크게 달라질 수 있다는 whichllm 주석을 그대로 반영한다.

---

## 4. 교체 범위 (후속 작업에서 수정 대상)

후속 PR은 아래 파일에서 기존 `llama3` / `llama3.2:3b` 가정을 본 문서에서 확정한 모델로 교체한다. 본 문서는 직접 수정하지 않고 변경 대상 목록만 정리한다.

### 4-1. 환경 변수 및 실행 스크립트

| 경로 | 현재 기본값 | 변경 방향 |
|---|---|---|
| `.env.example` | `NEXT_PUBLIC_CHATBOT_MODEL=llama3` | 1차 선정 모델 태그로 교체. 주석의 모델 예시 목록(`llama3, gemma3, mistral, qwen2`)도 1차/폴백 모델 중심으로 갱신 |
| `workspace/.env.example` | `NEXT_PUBLIC_CHATBOT_MODEL=llama3`, `LLM_MODEL=llama3` | 두 변수를 같은 모델 태그로 동기화 |
| `config/llm/README.md` | `LOCAL_LLM_MODEL` 기본값 `llama3` | 1차 선정 모델 태그로 교체, 폴백 모델 안내 추가 |
| `scripts/check-llm.sh` | `MODEL="${NEXT_PUBLIC_CHATBOT_MODEL:-llama3}"` 및 에러 메시지의 `ollama pull $MODEL` 예시 | 기본값과 안내 메시지의 모델 예시를 1차 선정 모델로 교체 |

### 4-2. 챗봇 코드

| 경로 | 변경 대상 | 변경 방향 |
|---|---|---|
| `workspace/src/lib/chatbot/llmService.ts` | `process.env.LLM_MODEL ?? 'llama3'` 하드코딩 폴백 | 폴백 문자열을 1차 선정 모델 태그로 교체. 환경 변수가 비어 있을 때도 본 문서와 같은 모델이 동작하도록 통일 |

### 4-3. 계획 및 운영 문서

| 경로 | 현재 가정 | 변경 방향 |
|---|---|---|
| `docs/planning/local-llm-setup-requirements.md` | "권장 모델" 표와 다운로드 명령이 `llama3.2:3b` 중심, 8GB RAM 기준 | 본 문서 선정 모델 기준으로 권장 모델 표·다운로드 명령·한국어 혼용 대응 섹션을 재작성. 8GB 가정 대신 32GB Apple Silicon 기준으로 갱신. 9번 "공유 정보 전달 방법" 예시의 `사용 모델 ID` 도 1차 선정 모델로 교체 |
| `docs/planning/chatbot-implementation-plan.md` | "Llama 3.2 3B / Gemma 3 4B" 후보 표기 | 1차 선정 모델과 폴백 모델로 표 갱신, "Ollama 설치 및 모델 다운로드" 단계의 모델명을 본 문서 기준으로 통일 |
| `docs/planning/tech-stack.md` | "모델: Ollama를 맥미니에 설치, `llama3` 또는 `gemma2` 계열 운영" 등 | 1차/폴백 모델로 교체. 폴백 후보(예: Mistral, Phi-3)도 본 문서의 폴백 정책에 맞춰 정리 |
| `docs/planning/execution-roadmap.md` | "infra: 로컬 LLM 서버 설정 … 모델 선택(Llama 3 등)" | 모델 선택 결과를 본 문서로 링크하고 모델명을 1차 선정 모델로 명시 |
| `docs/local-llm-verification.md` | `curl` 예시와 `ollama pull llama3` 안내 | 예시 모델 태그를 1차 선정 모델로 교체. 검증 단계 자체(서버 응답·모델 존재·추론 응답)는 그대로 유지 |
| `docs/content/section-content-map.md` | "Ollama 서버 다운 시" 폴백 문구 | 폴백 모델 흐름이 사용 가능한지 정리. 모델명 직접 노출 시 본 문서와 동기화 |

### 4-4. 변경하지 않는 영역

- `archive/` 아래의 모든 문서: 브레인스토밍 단계 보존 자료이므로 모델명을 수정하지 않는다.
- 본 문서 (`docs/planning/local-llm-model-selection.md`): 선정 정본이므로 후속 PR에서 덮어쓰지 말고, 모델을 다시 바꿀 때만 갱신한다.

---

## 5. 후속 작업 원칙

1. 모델 식별자는 항상 환경 변수(`LLM_MODEL`, `NEXT_PUBLIC_CHATBOT_MODEL`, `LOCAL_LLM_MODEL`)에서 단일 출처로 관리한다. 코드/문서에 모델명을 새로 하드코딩하지 않는다.
2. Ollama에 실제 등록된 태그가 본 문서의 표기와 다르면, 본 문서의 "결정 요약" 표에 사용 태그를 같이 적어 두고 후속 PR이 그 태그를 사용하도록 한다.
3. 사람(맥미니 운영자)이 `ollama pull` 등 다운로드·권한 작업을 수행해야 하는 단계는 `docs/planning/local-llm-setup-requirements.md`에 유지하고, 자동화 PR은 그 결과를 가정하고 진행한다.
4. 모델 응답 품질·속도가 기대치를 벗어나면 본 문서의 "폴백 정책" 표에 정의된 모델로 즉시 전환하고, 변경 사실과 사유를 본 문서에 1줄 추가한다.
5. 선정 모델이 더 좋은 후보로 교체될 때만 본 문서를 갱신한다. 그 외 후속 변경(코드/환경 변수/문서 동기화)은 본 문서를 참조해 다른 PR에서 수행한다.

---

## 6. 변경 이력

- 2026-06-10: `whichllm -n 10 --profile general` (Apple M4 / 32GB) 결과를 기준으로 `Qwen3-30B-A3B`를 1차 모델로 확정하고, `gpt-oss:20b` / `qwen3:14b`를 폴백으로 등록했다. `llama3.2:3b` 및 단순 `llama3` 가정은 후속 PR에서 교체한다. (GP-59 / GP-61)
