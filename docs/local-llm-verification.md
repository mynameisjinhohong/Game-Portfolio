# 로컬 LLM 준비 상태 검증 가이드

챗봇 UI 개발에 앞서 로컬 LLM 서버(Ollama)가 올바르게 설정됐는지 확인하는 절차를 설명한다.

---

## 사전 조건

| 항목 | 확인 방법 |
|---|---|
| Ollama 설치 | `ollama --version` |
| 모델 다운로드 | `ollama list` |
| 서버 실행 | `ollama serve` (별도 터미널) |

---

## 빠른 검증 (스크립트)

```bash
# .env 파일을 루트에 생성한 뒤 실행 (권장)
cp .env.example .env
# NEXT_PUBLIC_CHATBOT_MODEL 값을 올바른 모델명으로 수정 후:
bash scripts/check-llm.sh

# 서버 주소·모델을 직접 지정
bash scripts/check-llm.sh --url http://localhost:11434 --model gemma3

# 환경 변수로 지정 (one-liner)
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:11434 NEXT_PUBLIC_CHATBOT_MODEL=gemma3 bash scripts/check-llm.sh
```

> 루트 `.env` 파일이 있으면 스크립트가 자동으로 읽어 서버 주소·모델명 기본값으로 사용한다.
> 설치된 모델은 `ollama list` 로 확인하고 `NEXT_PUBLIC_CHATBOT_MODEL` 값을 그 모델명으로 수정하면 된다.

스크립트는 다음 5단계를 순서대로 검증하고 결과를 출력한다.

| 단계 | 검증 항목 | 실패 시 조치 |
|---|---|---|
| 1 | 서버 실행 여부 | `ollama serve` 실행 |
| 2 | 모델 목록 조회 | 서버 재시작 |
| 3 | 지정 모델 존재 | `ollama pull <model>` |
| 4 | 추론 응답 수신 | `ollama run <model>` 으로 직접 확인 |
| 5 | 환경 변수 설정 | `.env.local` 생성 후 값 입력 (아래 참고) |

모든 단계가 통과([OK])되면 챗봇 개발을 시작할 수 있다.

---

## 수동 확인 절차

스크립트 없이 curl 로 직접 확인하는 방법이다.

### 1. 서버 헬스체크

```bash
curl http://localhost:11434/api/tags
# 응답 예: {"models":[{"name":"llama3:latest",...}]}
# 연결 실패 시: curl: (7) Failed to connect
```

### 2. 모델 목록 확인

```bash
ollama list
# NAME              ID              SIZE    MODIFIED
# llama3:latest     365c0bd3c000    4.7 GB  ...
```

### 3. 추론 응답 테스트

```bash
curl http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model":"llama3","prompt":"Reply with only: OK","stream":false}'
# {"model":"llama3","response":"OK",...}
```

### 4. 환경 변수 설정 확인

Next.js 프로젝트는 `.env.local` 을 로컬 전용 환경 파일로 사용한다. 이 파일은 `.gitignore` 에 포함되어 있어 실수로 커밋되지 않는다.

```bash
# .env.local 파일이 없으면 예시 파일로부터 생성
cp workspace/portfolio/.env.example workspace/portfolio/.env.local

# NEXT_PUBLIC_CHATBOT_API_URL 이 Ollama 서버 주소와 일치하는지 확인
grep NEXT_PUBLIC_CHATBOT_API_URL workspace/portfolio/.env.local
```

**환경 변수 명명 규칙:**

| 변수명 | 용도 |
|---|---|
| `NEXT_PUBLIC_CHATBOT_API_URL` | Ollama 서버 주소 (예: `http://localhost:11434`) |
| `NEXT_PUBLIC_CHATBOT_MODEL` | 사용할 모델명 (예: `llama3`) |

> **참고:** 스크립트 실행 시 `NEXT_PUBLIC_CHATBOT_API_URL` 환경 변수가 설정되어 있으면 그 값을 기본 서버 주소로 사용한다.

---

## 검증 결과 해석

| 상태 | 의미 |
|---|---|
| 모든 항목 [OK] | 챗봇 API 연동 개발 시작 가능 |
| 1번 [NG] | Ollama 서버 미실행 — `ollama serve` 로 시작 |
| 3번 [NG] | 모델 미설치 — `ollama pull llama3` 실행 |
| 4번 [NG] | 모델 로딩 지연 또는 오류 — 터미널에서 `ollama run llama3` 으로 직접 확인 |
| 5번 [NG] | 환경 변수 미설정 — `.env.example` 을 `.env.local` 로 복사 후 값 수정 |

---

## 후속 챗봇 개발 전 체크리스트

- [ ] `bash scripts/check-llm.sh` 결과 전 항목 통과
- [ ] `workspace/portfolio/.env.local` 에 `NEXT_PUBLIC_CHATBOT_API_URL` 설정 완료 (`.env.example` 참고)
- [ ] 선택한 모델명을 챗봇 API 호출 코드에 동일하게 반영
