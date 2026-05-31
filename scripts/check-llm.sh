#!/usr/bin/env bash
# 로컬 LLM 서버(Ollama) 준비 상태 검증 스크립트
# 사용법: bash scripts/check-llm.sh [--url <base_url>] [--model <model_name>]

set -euo pipefail

BASE_URL="${LLM_BASE_URL:-http://localhost:11434}"
MODEL="${LLM_MODEL:-llama3}"

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

# 5. .env 설정 확인 (portfolio)
echo "[5] .env 설정 확인 (workspace/portfolio)"
ENV_FILE="workspace/portfolio/.env"
ENV_EXAMPLE="workspace/portfolio/.env.example"
if [[ -f "$ENV_FILE" ]]; then
  ok ".env 파일 존재"
  if grep -q "NEXT_PUBLIC_CHATBOT_API_URL" "$ENV_FILE"; then
    CONFIGURED_URL=$(grep "NEXT_PUBLIC_CHATBOT_API_URL" "$ENV_FILE" | cut -d'=' -f2 | tr -d '"' | tr -d "'")
    if [[ "$CONFIGURED_URL" == "$BASE_URL" ]]; then
      ok "NEXT_PUBLIC_CHATBOT_API_URL = $CONFIGURED_URL (서버 주소 일치)"
    else
      fail "NEXT_PUBLIC_CHATBOT_API_URL=$CONFIGURED_URL 와 검증 대상 서버 $BASE_URL 가 다름"
    fi
  else
    fail ".env 에 NEXT_PUBLIC_CHATBOT_API_URL 미설정"
    echo "  → .env.example 을 참고해 .env 를 작성하세요"
  fi
elif [[ -f "$ENV_EXAMPLE" ]]; then
  fail ".env 파일 없음 (.env.example 은 존재)"
  echo "  → cp $ENV_EXAMPLE $ENV_FILE 후 값을 수정하세요"
else
  fail ".env 및 .env.example 모두 없음"
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
