# 로컬 LLM 설정 가이드

이 디렉토리는 챗봇 기능에서 사용하는 로컬 LLM 관련 설정 파일을 관리합니다.

## 디렉토리 구조

```
config/llm/
├── README.md                    # 이 파일
├── system_prompt.example.txt    # 시스템 프롬프트 예시 (행동 지침 전용)
├── system_prompt.txt            # 실제 사용 파일 (로컬에서 생성, 커밋 가능)
├── context.example.txt          # 컨텍스트 문서 예시 (홍진호 정보 요약)
└── context.txt                  # 실제 사용 파일 (로컬에서 생성, 커밋 가능)
```

## 시스템 프롬프트와 컨텍스트 분리 이유

두 파일은 역할이 다릅니다.

| 파일 | 역할 | 내용 |
|------|------|------|
| `system_prompt.txt` | 행동 지침 | 역할 정의, 보안 규칙, 응답 스타일. 자주 바뀌지 않음 |
| `context.txt` | 데이터 | 홍진호 정보 요약, 프로젝트 목록, FAQ. 업데이트 빈도 높음 |

분리하면 컨텍스트를 교체할 때 행동 지침을 건드리지 않아도 됩니다.
향후 RAG(검색 증강 생성) 방식으로 전환할 때도 컨텍스트만 교체하면 됩니다.

## 환경 변수 설정

루트의 `.env.example`을 `.env.local`로 복사한 뒤 값을 채웁니다.

```bash
cp .env.example .env.local
```

| 변수명 | 설명 | 기본값 |
|---|---|---|
| `LOCAL_LLM_BASE_URL` | Ollama 또는 로컬 LLM 서버 주소 | `http://localhost:11434` |
| `LOCAL_LLM_MODEL` | 사용할 모델명 | `llama3` |
| `LOCAL_LLM_TIMEOUT_MS` | 요청 타임아웃 (ms) | `30000` |
| `LOCAL_LLM_MAX_TOKENS` | 최대 생성 토큰 수 | `512` |
| `LOCAL_LLM_SYSTEM_PROMPT_PATH` | 시스템 프롬프트 파일 경로 | `./config/llm/system_prompt.txt` |
| `LOCAL_LLM_CONTEXT_PATH` | 컨텍스트 문서 파일 경로 | `./config/llm/context.txt` |
| `LOCAL_LLM_API_KEY` | API 키 (인증이 없으면 생략) | — |
| `CHATBOT_ENABLED` | 챗봇 활성화 여부 | `true` |

## 파일 생성 방법

```bash
cp config/llm/system_prompt.example.txt config/llm/system_prompt.txt
cp config/llm/context.example.txt config/llm/context.txt
```

이후 `context.txt`의 이메일 등 개인 정보를 실제 값으로 교체하세요.

## 컨텍스트 문서 상세 참조

`context.txt`는 요약 정보만 포함합니다. 구체적인 내용은 아래 문서를 참조하세요.

| 문서 | 내용 |
|------|------|
| `docs/research/developer-positioning.md` | 개발자 강점·포지셔닝 분석 (GP-51) |
| `docs/content/section-content-map.md` | 섹션별 콘텐츠·챗봇 타입 정의 (GP-52, GP-50 반영) |
| `data/games.ts` | 게임별 상세 데이터 |

## 챗봇 연동 코드 작성 시 참고

- 환경 변수는 `process.env.LOCAL_LLM_BASE_URL` 등으로 접근합니다.
- 챗봇 API 핸들러에서 `system_prompt.txt`와 `context.txt`를 각각 읽어 LLM에 전달합니다.
- `system_prompt.txt` 내용을 LLM의 `system` 역할 메시지로, `context.txt`를 첫 번째 컨텍스트 메시지로 주입하는 방식을 권장합니다.
- API 연동 코드는 `src/` 하위에 작성하며, 설정값은 반드시 환경 변수에서 읽어야 합니다.
- 하드코딩 금지.
