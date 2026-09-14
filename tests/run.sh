#!/usr/bin/env bash
# 사용법:  tests/run.sh baseline   → 개편 전 텍스트 기준선 저장 (문구 변경이 의도된 경우에만!)
#          tests/run.sh            → tests/browser/test-*.js 전부 실행
# 환경변수 VIEWPORT_W / VIEWPORT_H (기본 390 x 844 = 모바일)
#
# 규칙
# - 8080 에 서버가 이미 있으면 그대로 쓰되, 이 사이트가 맞는지 확인한다(아니면 중단).
# - 이 스크립트가 직접 띄운 서버와 브라우저 세션(kbbq-test)은 끝날 때 정리한다.
# - 검사 스크립트는 첫 방문 상태(저장 언어 없음, 언어 모달 열림)에서 시작한다.
#   그래서 대부분의 검사는 첫 줄에서 언어 버튼을 클릭해 모달을 닫고 시작한다.
# - 검사 스크립트는 문자열 "PASS…" 또는 "FAIL: 이유" 를 반환한다.
set -euo pipefail
shopt -s nullglob
cd "$(dirname "$0")/.."

MODE="${1:-test}"
case "$MODE" in
  baseline|test) ;;
  *) echo "사용법: tests/run.sh [baseline|test]"; exit 2 ;;
esac

# bash 3.2(macOS 기본)에서는 빈 배열의 "${files[@]}" 확장이 set -u 에 걸리므로 이 가드가 필요하다
if [ "$MODE" = test ]; then
  files=(tests/browser/test-*.js)
  if [ ${#files[@]} -eq 0 ]; then echo "검사 스크립트 없음 (tests/browser/test-*.js)"; exit 0; fi
fi

PORT=8080
URL="http://127.0.0.1:$PORT/"
STARTED_SERVER=""
if ! lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
  STARTED_SERVER=$!
fi

# 이 사이트가 맞는지 확인 (최대 5초 대기)
site_ok() { curl -fsS "$URL" 2>/dev/null | grep -q 'data-lang-code'; }
for _ in 1 2 3 4 5 6 7 8 9 10; do
  site_ok && break
  sleep 0.5
done
if ! site_ok; then
  echo "8080 에 이 사이트가 아닌 것이 떠 있거나 서버가 뜨지 않았습니다. 확인 후 다시 실행하세요."
  [ -n "$STARTED_SERVER" ] && kill "$STARTED_SERVER" 2>/dev/null || true
  exit 2
fi

AB=(agent-browser --session kbbq-test)

cleanup() {
  "${AB[@]}" close >/dev/null 2>&1 || true
  if [ -n "$STARTED_SERVER" ]; then kill "$STARTED_SERVER" 2>/dev/null || true; fi
  rm -f "${tmp:-}"
}
trap cleanup EXIT

"${AB[@]}" set viewport "${VIEWPORT_W:-390}" "${VIEWPORT_H:-844}" >/dev/null

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
  "${AB[@]}" open "$URL" >/dev/null
  "${AB[@]}" eval 'try{localStorage.clear()}catch(e){}; "ok"' >/dev/null
  "${AB[@]}" open "$URL" >/dev/null
  "${AB[@]}" wait --load networkidle >/dev/null
}

case "$MODE" in
  baseline)
    mkdir -p tests/baseline
    fresh
    tmp="$(mktemp)"
    "${AB[@]}" eval --stdin < tests/browser/capture-baseline.js | unwrap > "$tmp"
    # 검증 통과 전에는 기존 기준선을 건드리지 않는다
    python3 - "$tmp" <<'PY'
import json, sys
d = json.load(open(sys.argv[1]))
bad = [k for k, v in d.items() if not v or v == "(버튼 없음)" or "{{" in v]
assert len(d) == 104, f"항목 수 {len(d)} (기대 104)"
assert not bad, f"비정상 항목: {bad[:5]}"
print(f"기준선 검증 OK: {len(d)} 항목")
PY
    chmod 644 "$tmp"
    mv "$tmp" tests/baseline/content-text.json
    echo "기준선 저장: tests/baseline/content-text.json"
    ;;
  test)
    PRE="const BASELINE = {};"
    if [ -f tests/baseline/content-text.json ]; then
      PRE="const BASELINE = $(cat tests/baseline/content-text.json);"
    fi
    fail=0
    for f in "${files[@]}"; do
      fresh
      out=$( { echo "$PRE"; cat "$f"; } | "${AB[@]}" eval --stdin 2>&1 | unwrap ) || true
      case "$out" in
        PASS*) echo "✅ $(basename "$f") — $out" ;;
        *)     echo "❌ $(basename "$f") — $out"; fail=1 ;;
      esac
    done
    exit $fail
    ;;
esac
