#!/usr/bin/env bash
# 사용법:  tests/run.sh baseline   → 개편 전 텍스트 기준선 저장
#          tests/run.sh            → tests/browser/test-*.js 전부 실행
# 환경변수 VIEWPORT_W / VIEWPORT_H (기본 390 x 844 = 모바일)
set -euo pipefail
cd "$(dirname "$0")/.."

PORT=8080
URL="http://127.0.0.1:$PORT/"
if ! lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
  sleep 1
fi

AB="agent-browser --session kbbq-test"
$AB set viewport "${VIEWPORT_W:-390}" "${VIEWPORT_H:-844}" >/dev/null

# agent-browser eval 은 결과를 JSON 문자열로 감싼다. 안쪽 값만 꺼낸다.
unwrap() {
  python3 -c 'import sys, json
s = sys.stdin.read().strip()
try:
    v = json.loads(s)
except Exception:
    print(s); sys.exit()
print(v if isinstance(v, str) else json.dumps(v, ensure_ascii=False))'
}

fresh() {  # 저장된 언어를 지우고 첫 방문 상태로 다시 연다
  $AB open "$URL" >/dev/null
  $AB eval 'try{localStorage.clear()}catch(e){}; "ok"' >/dev/null
  $AB open "$URL" >/dev/null
  $AB wait --load networkidle >/dev/null
}

case "${1:-test}" in
  baseline)
    mkdir -p tests/baseline
    fresh
    $AB eval --stdin < tests/browser/capture-baseline.js | unwrap > tests/baseline/content-text.json
    echo "기준선 저장: $(python3 -c 'import json; print(len(json.load(open("tests/baseline/content-text.json"))))') 항목"
    ;;
  test)
    if [ -f tests/baseline/content-text.json ]; then
      PRE="const BASELINE = $(cat tests/baseline/content-text.json);"
    else
      PRE="const BASELINE = {};"
    fi
    fail=0
    for f in tests/browser/test-*.js; do
      fresh
      out=$( { echo "$PRE"; cat "$f"; } | $AB eval --stdin 2>&1 | unwrap )
      case "$out" in
        PASS*) echo "✅ $(basename "$f") — $out" ;;
        *)     echo "❌ $(basename "$f") — $out"; fail=1 ;;
      esac
    done
    exit $fail
    ;;
  *) echo "사용법: tests/run.sh [baseline|test]"; exit 2 ;;
esac
