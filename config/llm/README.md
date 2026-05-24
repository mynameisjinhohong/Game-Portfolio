# 로컬 LLM 설정 가이드

이 디렉토리는 챗봇 기능에서 사용하는 로컬 LLM 관련 설정 파일을 관리합니다.

## 디렉토리 구조

```
config/llm/
├── README.md              # 이 파일
└── system_prompt.txt      # 챗봇 시스템 프롬프트 (로컬에서 생성)
```

## 환경 변수 설정

루트의 `.env.example`을 `.env`로 복사한 뒤 값을 채웁니다.

```bash
cp .env.example .env
```

| 변수명 | 설명 | 기본값 |
|---|---|---|
| `LOCAL_LLM_BASE_URL` | Ollama 또는 로컬 LLM 서버 주소 | `http://localhost:11434` |
| `LOCAL_LLM_MODEL` | 사용할 모델명 | `llama3` |
| `LOCAL_LLM_TIMEOUT_MS` | 요청 타임아웃 (ms) | `30000` |
| `LOCAL_LLM_MAX_TOKENS` | 최대 생성 토큰 수 | `512` |
| `LOCAL_LLM_SYSTEM_PROMPT_PATH` | 시스템 프롬프트 파일 경로 | `./config/llm/system_prompt.txt` |
| `LOCAL_LLM_API_KEY` | API 키 (인증이 없으면 생략) | — |
| `CHATBOT_ENABLED` | 챗봇 활성화 여부 | `true` |

## system_prompt.txt 생성

이 파일은 `.gitignore`에 등록되어 있지 않으며, 내용에 민감 정보가 없다면 커밋해도 됩니다.
아래는 예시 내용입니다.

```
당신은 홍진호의 포트폴리오 사이트를 방문한 사람들을 안내하는 AI 어시스턴트입니다.
홍진호는 게임 개발자 겸 소프트웨어 엔지니어로, Unity와 웹 기술을 주로 사용합니다.
방문자의 질문에 친절하고 간결하게 답변하세요.
```

## 챗봇 연동 코드 작성 시 참고

환경 변수는 `process.env.LOCAL_LLM_BASE_URL` 등으로 접근합니다.
API 연동 코드는 `src/` 하위에 작성하며, 설정값은 반드시 환경 변수에서 읽어야 합니다.
하드코딩 금지.
