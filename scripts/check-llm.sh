#!/usr/bin/env bash
# 로컬 LLM 서버(Ollama) 준비 상태 검증 스크립트
# 사용법: bash scripts/check-llm.sh [--url <base_url>] [--model <model_name>]
#
# 환경 변수 우선순위:
#   1. 명령행 인자 (--url, --model)
#   2. NEXT_PUBLIC_CHATBOT_API_URL / NEXT_PUBLIC_CHATBOT_MODEL 환경 변수
#   3. 기본값 (http://localhost:11434 / llama3)

set -euo pipefail

BASE_URL="${NEXT_PUBLIC_CHATBOT_API_URL:-http://localhost:11434}"
MODEL="${NEXT_PUBLIC_CHATBOT_MODEL:-llama3}"

# 인자 파싱
while [[ $# -gt 0 ]]; do
  case "$1" in
    --url) BASE_URL="$2"; shift 2 ;;
    --model) MODEL="$2"; shift 2 ;;
    *) echo "알 수 없는 옵션: $1"; exit 1 ;;
  esac
done

PASS=0
FAIL=0

ok()   { echo "  [OK]  $*"; ((PASS++)); }
fail() { echo "  [NG]  $*"; ((FAIL++)); }
info() { echo "  [--]  $*"; }

echo ""
echo "=============================="
echo "  로컬 LLM 준비 상태 검증"
echo "=============================="
echo "  대상 서버 : $BASE_URL"
echo "  대상 모델 : $MODEL"
echo ""

# 1. 서버 헬스체크
echo "[1] 서버 실행 여부 확인"
if curl -sf --max-time 5 "$BASE_URL/api/tags" -o /dev/null 2>/dev/null; then
  ok "서버 응답 정상 ($BASE_URL)"
else
  fail "서버 미실행 또는 연결 불가 ($BASE_URL)"
  echo ""
  echo "  → Ollama 서버를 먼저 시작하세요: ollama serve"
  echo ""
fi

# 2. 모델 목록 조회
echo "[2] 모델 목록 조회"
TAGS_RESPONSE=$(curl -sf --max-time 5 "$BASE_URL/api/tags" 2>/dev/null || echo "")
if [[ -n "$TAGS_RESPONSE" ]]; then
  ok "모델 목록 조회 성공"
  info "등록된 모델:"
  echo "$TAGS_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
models = data.get('models', [])
if models:
    for m in models:
        print('      -', m.get('name','?'))
else:
    print('      (모델 없음)')
" 2>/dev/null || echo "      (JSON 파싱 실패)"
else
  fail "모델 목록 조회 실패 (서버 미실행)"
fi

# 3. 지정 모델 존재 여부
echo "[3] 모델 존재 여부: $MODEL"
if [[ -n "$TAGS_RESPONSE" ]]; then
  if echo "$TAGS_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
names = [m.get('name','') for m in data.get('models',[])]
target = sys.argv[1]
# 이름 일치 또는 접두어 일치(예: llama3:latest)
found = any(n == target or n.startswith(target+':') for n in names)
sys.exit(0 if found else 1)
" "$MODEL" 2>/dev/null; then
    ok "모델 '$MODEL' 존재 확인"
  else
    fail "모델 '$MODEL' 없음"
    echo "  → ollama pull $MODEL  명령으로 모델을 다운로드하세요"
  fi
else
  fail "모델 확인 불가 (서버 미실행)"
fi

# 4. 간단한 추론 응답 테스트
echo "[4] 추론 응답 테스트 (5초 제한)"
if [[ -n "$TAGS_RESPONSE" ]]; then
  GENERATE_RESPONSE=$(curl -sf --max-time 10 "$BASE_URL/api/generate" \
    -H "Content-Type: application/json" \
    -d "{\"model\":\"$MODEL\",\"prompt\":\"Reply with only: OK\",\"stream\":false}" 2>/dev/null || echo "")
  if echo "$GENERATE_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
r = data.get('response','')
sys.exit(0 if r.strip() != '' else 1)
" 2>/dev/null; then
    ok "추론 응답 수신 성공"
  else
    fail "추론 응답 없음 또는 오류"
    echo "  → 모델이 설치됐는지, ollama run $MODEL 으로 직접 확인하세요"
  fi
else
  fail "추론 테스트 건너뜀 (서버 미실행)"
fi

# 5. .env.local / .env 설정 확인 (portfolio)
# Next.js 관례: .env.local 우선, 없으면 .env 검사
echo "[5] 환경 변수 설정 확인 (workspace/portfolio)"
ENV_LOCAL="workspace/portfolio/.env.local"
ENV_FILE="workspace/portfolio/.env"
ENV_EXAMPLE="workspace/portfolio/.env.example"

# 검사 대상 파일 결정 (.env.local 우선)
if [[ -f "$ENV_LOCAL" ]]; then
  ACTIVE_ENV="$ENV_LOCAL"
  ok ".env.local 파일 존재 (Next.js 로컬 설정 파일)"
elif [[ -f "$ENV_FILE" ]]; then
  ACTIVE_ENV="$ENV_FILE"
  ok ".env 파일 존재 (로컬 개발용 설정 파일)"
  info ".env.local 을 사용하면 git 에 실수로 커밋되는 위험을 줄일 수 있습니다"
else
  ACTIVE_ENV=""
  if [[ -f "$ENV_EXAMPLE" ]]; then
    fail "환경 설정 파일 없음 (.env.example 은 존재)"
    echo "  → cp $ENV_EXAMPLE $ENV_LOCAL  후 값을 수정하세요"
  else
    fail ".env.local / .env / .env.example 모두 없음"
  fi
fi

if [[ -n "$ACTIVE_ENV" ]]; then
  # NEXT_PUBLIC_CHATBOT_API_URL 검사
  if grep -q "NEXT_PUBLIC_CHATBOT_API_URL" "$ACTIVE_ENV"; then
    CONFIGURED_URL=$(grep "NEXT_PUBLIC_CHATBOT_API_URL" "$ACTIVE_ENV" | grep -v '^#' | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'" | tr -d ' ')
    if [[ -z "$CONFIGURED_URL" ]]; then
      fail "NEXT_PUBLIC_CHATBOT_API_URL 키가 존재하지만 값이 비어 있음"
      echo "  → $ACTIVE_ENV 에서 NEXT_PUBLIC_CHATBOT_API_URL 값을 입력하세요"
    elif [[ "$CONFIGURED_URL" == "$BASE_URL" ]]; then
      ok "NEXT_PUBLIC_CHATBOT_API_URL = $CONFIGURED_URL (검증 대상 서버 주소 일치)"
    else
      fail "NEXT_PUBLIC_CHATBOT_API_URL=$CONFIGURED_URL 와 검증 대상 서버 $BASE_URL 가 다름"
      echo "  → 일치시키려면: --url $CONFIGURED_URL 옵션으로 재실행하거나, $ACTIVE_ENV 값을 수정하세요"
    fi
  else
    fail "$ACTIVE_ENV 에 NEXT_PUBLIC_CHATBOT_API_URL 미설정"
    echo "  → .env.example 을 참고해 NEXT_PUBLIC_CHATBOT_API_URL 를 추가하세요"
  fi
fi

# 결과 요약
echo ""
echo "=============================="
echo "  검증 결과 요약"
echo "=============================="
echo "  통과: $PASS  /  실패: $FAIL"
echo ""
if [[ $FAIL -eq 0 ]]; then
  echo "  로컬 LLM 서버가 정상 준비됐습니다. 챗봇 개발을 시작할 수 있습니다."
else
  echo "  위의 [NG] 항목을 해결한 뒤 다시 실행하세요."
fi
echo ""
exit $FAIL
