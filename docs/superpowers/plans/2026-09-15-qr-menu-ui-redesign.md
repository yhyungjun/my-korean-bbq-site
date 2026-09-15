# QR 메뉴판 UI 개편 Implementation Plan

> 상태: 완료 (2026-09-15) — 커밋 b8c3fdf … 마지막 커밋은 git log 참고.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 테이블 QR 메뉴판에서 코스 3개의 가격·구성과 사이드 가격이 탭 없이 첫 화면에 보이도록 `index.html`·`style.css`·`js/app.js`를 재구성한다. 문구(`js/content.js`)와 가격(`js/prices.js`)은 한 글자도 바꾸지 않는다.

**Architecture:** `content.js`의 HTML 블록은 모두 같은 뼈대(제목 → 가격 줄 → `<br>` → 구성)라서, 새 모듈 `js/render.js`가 DOM 수준에서 세 조각으로 잘라 카드/가격표에 배치한다. 언어 전환은 지금처럼 `data-lang` + `hidden`으로 13개 언어 버전을 미리 렌더해 두고 보이기만 바꾼다. 검증은 `agent-browser`로 실행하는 브라우저 스크립트(`tests/browser/*.js`)와, 개편 **전**에 캡처한 텍스트 기준선(`tests/baseline/content-text.json`) 대조로 한다.

**Tech Stack:** 순수 HTML/CSS/ES 모듈, 빌드 없음, GitHub Pages. 로컬 서버 `python3 -m http.server 8080`. 브라우저 검증 `agent-browser` 0.25.x (이미 설치됨). 스펙: `docs/superpowers/specs/2026-09-15-qr-menu-ui-redesign-design.md`.

---

## 읽기 전에

- 모든 명령은 저장소 루트 `/Users/hyungjuny/orca/my-korean-bbq-site`에서 실행한다.
- 미리보기 서버가 8080에 떠 있지 않으면 `tests/run.sh`가 띄운다. 이미 떠 있으면 그대로 쓴다.
- `agent-browser eval --stdin`은 결과를 **JSON 문자열로 감싸서** 출력한다(`"PASS"`처럼 따옴표 포함). `tests/run.sh`가 벗겨 준다.
- 커밋 메시지에 **백틱(`)을 쓰지 말 것** — 이 저장소의 git 훅이 명령 문자열의 백틱을 막는다.
- `js/content.js`, `js/prices.js`는 **절대 수정하지 않는다.** 마지막 Task에서 `git diff`가 비어 있음을 확인한다.

## 파일 구조

| 파일 | 역할 | 이번 작업 |
|---|---|---|
| `index.html` | 페이지 뼈대. 13개 언어 UI 문구는 `data-lang` 요소 | Task 2에서 생성 스크립트로 재작성 |
| `style.css` | 전체 스타일 | Task 4 규칙 추가, Task 6 죽은 규칙 삭제 |
| `js/app.js` | 언어·모달·접이식·초기 렌더 | Task 3·5 수정 |
| `js/render.js` | **신규.** 콘텐츠 블록 → 카드/가격표 DOM | Task 3 생성 |
| `js/content.js` `js/prices.js` | 문구·가격 | **무변경** |
| `tests/run.sh` | 테스트 실행기 | Task 1 생성 |
| `tests/browser/capture-baseline.js` | 개편 전 텍스트 캡처 | Task 1 |
| `tests/browser/test-*.js` | 브라우저 검사 스크립트 (`PASS` / `FAIL: 이유` 반환) | Task 1~8 |
| `tests/baseline/content-text.json` | 개편 전 기준선 (커밋됨) | Task 1 |
| `README.md` | 안내 | Task 8 |

---

### Task 0: 작업 브랜치

**Files:** 없음

- [x] **Step 1: 브랜치 생성**

```bash
git checkout fix/site-audit-2026-09
git checkout -b feat/qr-menu-ui
git branch --show-current
```
Expected: `feat/qr-menu-ui`

---

### Task 1: 테스트 실행기 + 개편 전 기준선 캡처

개편 전 화면에서 13개 언어 × 8개 콘텐츠의 텍스트를 저장해 둔다. 이후 모든 Task의 "문구 무손실" 검사가 이 파일과 비교한다. **반드시 index.html을 바꾸기 전에 실행한다.**

**Files:**
- Create: `tests/run.sh`
- Create: `tests/browser/capture-baseline.js`
- Create: `tests/baseline/content-text.json` (스크립트가 생성)

- [x] **Step 1: 실행기 작성**

`tests/run.sh`:

```bash
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
    mv "$tmp" tests/baseline/content-text.json
    echo "기준선 저장: tests/baseline/content-text.json"
    ;;
  test)
    files=(tests/browser/test-*.js)
    if [ ${#files[@]} -eq 0 ]; then
      echo "검사 스크립트 없음 (tests/browser/test-*.js)"
      exit 0
    fi
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
```

- [x] **Step 2: 기준선 캡처 스크립트 작성**

`tests/browser/capture-baseline.js` — **개편 전 DOM**(버튼을 눌러 상세박스를 여는 방식)에서 동작한다:

```js
(() => {
  const LANGS = ["ko","en","zh","ja","vi","th","ph","fr","es","pt","ar","ru","tr"];
  const KEYS = ["courseA","courseB","courseF","side","usage","tips","gamasot","ssam"];
  const norm = (t) => t.replace(/\s+/g, " ").trim();
  const out = {};
  for (const lang of LANGS) {
    document.querySelector(`[data-lang-code="${lang}"]`).click();
    for (const key of KEYS) {
      const btn = [...document.querySelectorAll(`[data-content="${key}"]`)].find((b) => b.offsetParent !== null);
      // 버튼이 안 보이면 본문이 숨김 상태라는 뜻 — 조용히 넘기지 말고 실패시킨다
      if (!btn) throw new Error(`보이는 버튼 없음: ${key}|${lang}`);
      btn.click();
      const box = document.getElementById(btn.dataset.target);
      const p = box.querySelector(`p[data-lang="${lang}"]`).cloneNode(true);
      // 사이드의 "사이드메뉴" 제목은 개편 후 섹션 제목으로 빠지므로 기준선에서도 뺀다.
      // 코스(A/B/F)의 제목은 개편 후에도 카드 안에 남으므로 그대로 둔다.
      if (key === "side") p.querySelector(".menu-subtitle")?.remove();
      out[`${key}|${lang}`] = norm(p.textContent);
    }
  }
  return JSON.stringify(out);
})()
```

- [x] **Step 3: 실행 권한 부여 후 기준선 저장**

```bash
chmod +x tests/run.sh
tests/run.sh baseline
```
Expected: `기준선 검증 OK: 104 항목` + `기준선 저장: tests/baseline/content-text.json`

- [x] **Step 4: 기준선 내용 확인**

```bash
python3 -c "
import json; d=json.load(open('tests/baseline/content-text.json'))
print(d['courseA|ko'][:80]); print(d['side|ja'][:80]); print(sum(1 for v in d.values() if '{{' in v), '개 토큰 미치환')"
```
Expected: 첫 줄에 `A돼지모듬 무한리필 1인 17,900원 돼지모듬(삼겹살/…`, 둘째 줄 일본어 사이드(제목 없이 `咸興冷麺`으로 시작), 마지막 `0 개 토큰 미치환`

- [x] **Step 5: 커밋**

```bash
git add tests/
git commit -m "test: 브라우저 테스트 실행기와 개편 전 텍스트 기준선"
```

---

### Task 2: index.html 재구성 (생성 스크립트)

13개 언어 문구를 손으로 옮기면 오타가 난다. 현재 `index.html`에서 문구를 **프로그램으로 추출**해 새 구조에 넣는다. 이 Task가 끝나면 카드·가격표 자리는 비어 있고(Task 3에서 채움), 히어로는 사라지고, 접이식 4개는 동작한다.

**Files:**
- Create: `tests/browser/test-structure.js`
- Modify: `index.html` (전체 재작성)

- [x] **Step 1: 실패하는 구조 검사 작성**

`tests/browser/test-structure.js`:

```js
(() => {
  const errs = [];
  const LANGS = ["ko","en","zh","ja","vi","th","ph","fr","es","pt","ar","ru","tr"];
  const WANT = [...LANGS].sort().join(",");
  document.querySelector('[data-lang-code="ko"]')?.click();

  const need = (sel, n, label) => {
    const c = document.querySelectorAll(sel).length;
    if (c !== n) errs.push(`${label}: ${c}개 (기대 ${n})`);
  };
  // 언어 "집합"을 본다 — 개수만 세면 ko 둘·zh 없음도 13개로 통과한다
  const needLangs = (sel, label) => {
    const got = [...document.querySelectorAll(sel)].map((e) => e.dataset.lang).sort().join(",");
    if (got !== WANT) errs.push(`${label}: 언어 집합 불일치 [${got}]`);
  };

  need("header.topbar", 1, "상단 바");
  need("h1.topbar-brand", 1, "상단 바 매장명(h1)");
  needLangs("h1.topbar-brand [data-lang]", "상단 바 매장명");
  need("#topbarLangName", 1, "언어 버튼 이름");
  needLangs(".bell [data-lang]", "벨 안내");
  needLangs("#menuTitle [data-lang]", "코스 제목");
  need("#courseCards", 1, "코스 컨테이너");
  needLangs("#sideTitle [data-lang]", "사이드 제목");
  need("#sideList", 1, "사이드 컨테이너");
  need(".acc-head", 4, "접이식 헤더");
  for (const key of ["usage", "tips", "gamasot", "ssam"]) {
    const head = document.querySelector(`.acc-head[data-content="${key}"]`);
    if (!head) { errs.push(`접이식 ${key}: 헤더 없음`); continue; }
    needLangs(`.acc-head[data-content="${key}"] [data-lang]`, `접이식 ${key} 라벨`);
    if (head.dataset.target !== head.getAttribute("aria-controls")) errs.push(`접이식 ${key}: data-target ≠ aria-controls`);
    if (!document.getElementById(head.dataset.target)) errs.push(`접이식 ${key}: 박스 #${head.dataset.target} 없음`);
  }
  need("section.hero", 0, "히어로(삭제돼야 함)");
  need(".footer-branches", 0, "푸터 지점 링크 행(삭제돼야 함)");
  needLangs("footer .tagline [data-lang]", "푸터 슬로건");
  needLangs("footer .footer-brand [data-lang]", "푸터 ©");
  need("footer .store-info .store", 3, "지점 카드");
  {
    const got = [...document.querySelectorAll("#langModal [data-lang-code]")].map((e) => e.dataset.langCode).sort().join(",");
    if (got !== WANT) errs.push(`언어 모달 버튼: 언어 집합 불일치 [${got}]`);
  }
  return errs.length ? "FAIL: " + errs.join(" / ") : "PASS";
})()
```

- [x] **Step 2: 실패 확인**

```bash
tests/run.sh
```
Expected: `❌ test-structure.js — FAIL: 상단 바: 0개 (기대 1) / …`

- [x] **Step 3: 생성 스크립트 작성 후 실행**

아래를 `/tmp/build-index.py`로 저장하고 실행한다. 현재 `index.html`을 읽어 같은 자리에 새 파일을 쓴다.

```python
import re, sys
P = 'index.html'
h = open(P, encoding='utf-8').read()
LANGS = ['ko','en','zh','ja','vi','th','ph','fr','es','pt','ar','ru','tr']

def grab(pattern, block, label, n=13):
    """data-lang 요소 13개를 {lang: innerHTML} 로 뽑는다. 개수가 다르면 중단."""
    got = {m.group(1): m.group(3).strip() for m in re.finditer(pattern, block, re.S)}
    missing = [l for l in LANGS if l not in got]
    assert not missing and len(got) == n, f'{label}: {len(got)}개, 누락 {missing}'
    return got

head = h[:h.index('<body>') + len('<body>')]
hero = re.search(r'<div class="hero-texts">(.*?)</div>', h, re.S).group(1)
store_name = grab(r'<h1 data-lang="(\w\w)"( hidden)?>(.*?)</h1>', hero, '매장명')
tagline    = grab(r'<p data-lang="(\w\w)"( hidden)?>(.*?)</p>', hero, '슬로건')
menu_sec   = re.search(r'<section id="menu".*?</section>', h, re.S).group(0)
menu_title = grab(r'<h2 data-lang="(\w\w)"( hidden)?>(.*?)</h2>', menu_sec, '메뉴 제목')
side_title = grab(r'data-content="side" data-lang="(\w\w)"( hidden)?>(.*?)</button>', h, '사이드 라벨')

# 접이식 라벨: <div data-lang="xx"> 안의 버튼 2개 (usage/tips, gamasot/ssam)
acc = {}
for m in re.finditer(r'<div data-lang="(\w\w)"( hidden)?>\s*(<button.*?</button>)\s*(<button.*?</button>)\s*</div>', h, re.S):
    lang = m.group(1)
    for b in (m.group(3), m.group(4)):
        key = re.search(r'data-content="(\w+)"', b).group(1)
        label = re.search(r'>(.*?)</button>', b, re.S).group(1).strip()
        acc.setdefault(key, {})[lang] = label
for key in ('usage', 'tips', 'gamasot', 'ssam'):
    assert sorted(acc[key]) == sorted(LANGS), f'접이식 {key}: {sorted(acc[key])}'

foot = h[h.index('<footer>'):h.index('</footer>')]
brand = {}
for m in re.finditer(r'<p data-lang="(\w\w)"[^>]*>\s*<span class="footer-brand">(.*?)</span>', foot, re.S):
    brand[m.group(1)] = m.group(2).strip()
assert sorted(brand) == sorted(LANGS), f'푸터 ©: {sorted(brand)}'
store_info = re.search(r'(  <!-- 매장 안내.*?\n  </div>\n)</footer>', h, re.S).group(1)
modal = h[h.index('<!-- 언어 선택 -->'):h.index('<script type="module"')]

BELL = {
 'ko': '주문·리필은 테이블 벨을 눌러주세요',
 'en': 'Press the table bell to order or get a refill',
 'zh': '点餐或续餐请按桌上的呼叫铃',
 'ja': '注文・おかわりはテーブルのベルを押してください',
 'vi': 'Bấm chuông bàn để gọi món hoặc lấy thêm',
 'th': 'กดกริ่งที่โต๊ะเพื่อสั่งอาหารหรือรีฟิล',
 'ph': 'Pindutin ang table bell para mag-order o mag-refill',
 'fr': 'Appuyez sur la sonnette de table pour commander ou être resservi',
 'es': 'Pulse el timbre de la mesa para pedir o repetir',
 'pt': 'Toque a campainha da mesa para pedir ou repetir',
 'ar': 'اضغط جرس الطاولة للطلب أو لإعادة التعبئة',
 'ru': 'Нажмите кнопку вызова на столе, чтобы заказать или получить добавку',
 'tr': 'Sipariş veya yenileme için masa zilini kullanın',
}

def spans(d, indent='      '):
    return '\n'.join(f'{indent}<span data-lang="{l}"{"" if l == "ko" else " hidden"}>{d[l]}</span>' for l in LANGS)

ACC = [('usage', 'usageDetailBox'), ('tips', 'courseTipBox'), ('gamasot', 'gamasotDetailBox'), ('ssam', 'ssamDetailBox')]
acc_html = '\n'.join(f'''    <div class="acc">
      <button type="button" class="acc-head i18n-inline" data-action="detail"
              data-target="{box}" data-content="{key}" aria-expanded="false" aria-controls="{box}">
{spans(acc[key], '        ')}
      </button>
      <div id="{box}" class="usage-detail detail-box" hidden></div>
    </div>''' for key, box in ACC)

body = f'''

<!-- 상단 고정 바: 로고 + 매장명 + 언어 -->
<header class="topbar">
  <h1 class="topbar-brand i18n-inline">
    <img src="images/logo.png" alt="" width="28" height="28">
{spans(store_name, '    ')}
  </h1>
  <button type="button" class="topbar-lang" data-action="open-lang" aria-haspopup="dialog">
    <span aria-hidden="true">🌐</span> <span id="topbarLangName">한국어</span> <span aria-hidden="true">▾</span>
  </button>
</header>

<!-- 벨 안내 (유일한 신규 문구) -->
<p class="bell i18n-inline"><span aria-hidden="true">🔔</span>
{spans(BELL, '  ')}
</p>

<main class="menu-sheet">
  <section id="menu" aria-labelledby="menuTitle">
    <h2 id="menuTitle" class="i18n-inline">
{spans(menu_title, '      ')}
    </h2>
    <div id="courseCards"></div>
  </section>

  <section id="side" aria-labelledby="sideTitle">
    <h2 id="sideTitle" class="i18n-inline">
{spans(side_title, '      ')}
    </h2>
    <div id="sideList"></div>
  </section>

  <!-- 접이식 안내 4개: 기존 상세박스를 그대로 아래에 연다 -->
  <section id="guide">
{acc_html}
  </section>
</main>

<footer>
  <p class="tagline i18n-inline">
{spans(tagline, '    ')}
  </p>
  <p class="footer-brand i18n-inline">
{spans(brand, '    ')}
  </p>
{store_info}</footer>

{modal}<script type="module" src="js/app.js"></script>
</body>
</html>
'''
open(P, 'w', encoding='utf-8').write(head + body)
print('index.html 재작성:', (head + body).count('\n') + 1, '줄')
```

이 스크립트는 개편 전 마크업(히어로·버튼 그리드)을 전제로 하므로 한 번만 실행할 수 있다. 재실행하면 첫 정규식에서 AttributeError 로 멈추고 index.html 은 건드리지 않는다.

```bash
python3 /tmp/build-index.py
```
Expected: `index.html 재작성: <숫자> 줄` (AssertionError가 나면 추출 패턴이 현재 파일과 안 맞는 것 — 메시지의 항목을 index.html에서 확인)

- [x] **Step 4: 구조 검사 통과 확인**

```bash
tests/run.sh
```
Expected: `✅ test-structure.js — PASS`

- [x] **Step 4b: UI 문구 검사 생성**

이동한 UI 문구(매장명·슬로건·메뉴 제목·사이드 제목·접이식 라벨 4개·푸터 ©) 13개 언어 × 9그룹 = 117개를 자동 대조하는 검사를 만든다. 개편 전 `index.html`(커밋 `59bed54`)에서 문구를 뽑아 기대값으로 박아 넣는다.

아래를 `/tmp/gen-ui-strings.py`로 저장하고 실행한다.

```python
import re, json, subprocess
old = subprocess.run(['git', 'show', '59bed54:index.html'], capture_output=True, text=True, check=True).stdout
LANGS = ['ko','en','zh','ja','vi','th','ph','fr','es','pt','ar','ru','tr']
strip = lambda s: re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', s)).strip()

def grab(pattern, block, label):
    got = {m.group(1): strip(m.group(3)) for m in re.finditer(pattern, block, re.S)}
    assert sorted(got) == sorted(LANGS), f'{label}: {sorted(got)}'
    return got

hero = re.search(r'<div class="hero-texts">(.*?)</div>', old, re.S).group(1)
menu = re.search(r'<section id="menu".*?</section>', old, re.S).group(0)
foot = old[old.index('<footer>'):old.index('</footer>')]
groups = {
  'storeName': (grab(r'<h1 data-lang="(\w\w)"( hidden)?>(.*?)</h1>', hero, 'storeName'), 'h1.topbar-brand'),
  'tagline':   (grab(r'<p data-lang="(\w\w)"( hidden)?>(.*?)</p>', hero, 'tagline'), 'footer .tagline'),
  'menuTitle': (grab(r'<h2 data-lang="(\w\w)"( hidden)?>(.*?)</h2>', menu, 'menuTitle'), '#menuTitle'),
  'sideTitle': (grab(r'data-content="side" data-lang="(\w\w)"( hidden)?>(.*?)</button>', old, 'sideTitle'), '#sideTitle'),
  'brand':     ({}, 'footer .footer-brand'),
}
for m in re.finditer(r'<p data-lang="(\w\w)"[^>]*>\s*<span class="footer-brand">(.*?)</span>', foot, re.S):
    groups['brand'][0][m.group(1)] = strip(m.group(2))
assert sorted(groups['brand'][0]) == sorted(LANGS)
acc = {}
for m in re.finditer(r'<div data-lang="(\w\w)"( hidden)?>\s*(<button.*?</button>)\s*(<button.*?</button>)\s*</div>', old, re.S):
    for b in (m.group(3), m.group(4)):
        key = re.search(r'data-content="(\w+)"', b).group(1)
        acc.setdefault(key, {})[m.group(1)] = strip(re.search(r'>(.*?)</button>', b, re.S).group(1))
for key in ('usage', 'tips', 'gamasot', 'ssam'):
    assert sorted(acc[key]) == sorted(LANGS), key
    groups[f'acc.{key}'] = (acc[key], f'.acc-head[data-content="{key}"]')

expected = {f'{g}|{l}': v for g, (d, _) in groups.items() for l, v in d.items()}
selectors = {g: sel for g, (_, sel) in groups.items()}
assert len(expected) == 117, len(expected)

js = f'''// 자동 생성: 커밋 59bed54 의 index.html(개편 전)에서 뽑은 UI 문구 117개.
// 생성 스크립트는 docs/superpowers/plans/2026-09-15-qr-menu-ui-redesign.md Task 2 참고.
(() => {{
  const EXPECTED = {json.dumps(expected, ensure_ascii=False, indent=2)};
  const SELECTORS = {json.dumps(selectors, ensure_ascii=False, indent=2)};
  const norm = (t) => t.replace(/\\s+/g, " ").trim();
  const errs = [];
  document.querySelector('[data-lang-code="ko"]')?.click();
  for (const [id, want] of Object.entries(EXPECTED)) {{
    const [group, lang] = id.split("|");
    const el = document.querySelector(`${{SELECTORS[group]}} [data-lang="${{lang}}"]`);
    if (!el) {{ errs.push(`${{id}}: 요소 없음`); continue; }}
    const got = norm(el.textContent);
    if (got !== want) errs.push(`${{id}}: '${{got}}' ≠ '${{want}}'`);
  }}
  return errs.length ? `FAIL: ${{errs.length}}/117 — ` + errs.slice(0, 6).join(" / ") : "PASS (117 UI 문구 일치)";
}})()
'''
open('tests/browser/test-ui-strings.js', 'w', encoding='utf-8').write(js)
print('생성: tests/browser/test-ui-strings.js —', len(expected), '문구')
```

```bash
python3 /tmp/gen-ui-strings.py
```
Expected: `생성: tests/browser/test-ui-strings.js — 117 문구`

```bash
tests/run.sh
```
Expected: `✅ test-ui-strings.js — PASS (117 UI 문구 일치)`

> 이후 벨 안내 13문장(`bell` 그룹)은 이 생성 스크립트가 다루지 않는 신규 문구라 `tests/browser/test-ui-strings.js`에 손으로 추가했다(총 130개).

- [x] **Step 5: 브라우저에서 눈으로 확인**

http://127.0.0.1:8080 을 열면 상단 빨간 바, 노란 벨 띠, "메뉴 소개"·"사이드 메뉴" 제목(내용은 아직 비어 있음), 접이식 4개, 푸터가 보인다. 접이식을 누르면 기존 상세박스가 열린다. 제목 글자가 아주 작게 보이는 건 정상 — Task 4에서 CSS로 잡는다.

- [x] **Step 6: 커밋**

```bash
git add index.html tests/browser/test-structure.js
git commit -m "feat: index.html을 상단 바·벨 안내·카드 자리·접이식 구조로 재구성"
```

---

### Task 3: render.js — 콘텐츠 블록을 카드·가격표로 자르기

**Files:**
- Create: `js/render.js`
- Create: `tests/browser/test-course-cards.js`
- Create: `tests/browser/test-side-list.js`
- Modify: `js/app.js` (전체 교체)

- [x] **Step 1: 실패하는 카드 검사 작성**

`tests/browser/test-course-cards.js`:

```js
(() => {
  const errs = [];
  const cards = document.querySelectorAll("#courseCards article.course-card");
  if (cards.length !== 3) return `FAIL: 카드 ${cards.length}개 (기대 3)`;
  for (const card of cards) {
    const key = card.dataset.course;
    const panes = card.querySelectorAll(":scope > [data-lang]");
    if (panes.length !== 13) errs.push(`${key}: pane ${panes.length}개`);
    const visible = [...panes].filter((p) => !p.hidden);
    if (visible.length !== 1) errs.push(`${key}: 보이는 pane ${visible.length}개`);
    for (const p of panes) {
      const id = `${key}/${p.dataset.lang}`;
      if (!p.querySelector(".course-title .menu-subtitle")) errs.push(`${id}: 제목 없음`);
      if (!p.querySelector(".course-price .price")?.textContent.trim()) errs.push(`${id}: 가격 없음`);
      if (!p.querySelector(".course-body")) errs.push(`${id}: 본문 없음`);
      if (/\{\{/.test(p.textContent)) errs.push(`${id}: 가격 토큰 미치환`);
      if ([...p.querySelectorAll(".course-body span.small-note")].some((s) => s.textContent.trim() === "+")) errs.push(`${id}: + 구분자 미처리`);
    }
  }
  if (!document.querySelector('.course-card[data-course="courseF"].is-featured > .course-chips')) errs.push("Full 카드 강조/칩 없음");
  return errs.length ? "FAIL: " + errs.slice(0, 6).join(" / ") : "PASS";
})()
```

`tests/browser/test-side-list.js`:

```js
(() => {
  const errs = [];
  const panes = document.querySelectorAll("#sideList .side-pane");
  if (panes.length !== 13) return `FAIL: pane ${panes.length}개 (기대 13)`;
  for (const p of panes) {
    const rows = p.querySelectorAll(".side-row");
    if (rows.length !== 9) errs.push(`${p.dataset.lang}: 행 ${rows.length}개 (기대 9)`);
    rows.forEach((r, i) => {
      if (!r.querySelector(".side-name")?.textContent.trim()) errs.push(`${p.dataset.lang} ${i + 1}행: 이름 없음`);
      if (!r.querySelector(".side-price .price")?.textContent.trim()) errs.push(`${p.dataset.lang} ${i + 1}행: 가격 없음`);
    });
    if (/\{\{/.test(p.textContent)) errs.push(`${p.dataset.lang}: 가격 토큰 미치환`);
  }
  return errs.length ? "FAIL: " + errs.slice(0, 6).join(" / ") : "PASS";
})()
```

- [x] **Step 2: 실패 확인**

```bash
tests/run.sh
```
Expected: `❌ test-course-cards.js — FAIL: 카드 0개 (기대 3)` 와 `❌ test-side-list.js — FAIL: pane 0개 (기대 13)`

- [x] **Step 3: render.js 작성**

`js/render.js`:

```js
// content.js 의 HTML 블록을 카드/가격표 DOM 으로 자른다. 문구는 손대지 않는다.
//
// 코스 블록 뼈대:  <span class="menu-subtitle">제목</span> 가격줄 <br> 구성…
// 사이드 블록 뼈대: <span class="menu-subtitle">…</span><br> 이름 (설명) 가격<br> …
import { CONTENT, LANGS } from "./content.js";
import { fillPrices } from "./prices.js";

const SEPARATOR_TEXT = " · "; // "+" 구분자를 이걸로 바꾼다 (기준선 대조 때 +·는 무시)

function toFragment(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
}

const isBr = (n) => n.nodeType === Node.ELEMENT_NODE && n.tagName === "BR";
const isBlankText = (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim() === "";

function el(tag, className, children = []) {
  const node = document.createElement(tag);
  node.className = className;
  children.forEach((c) => node.appendChild(c));
  return node;
}

/** 코스 블록 → { title, priceLine[], body[] }. 뼈대가 다르면 null. */
export function splitCourseBlock(html) {
  const frag = toFragment(html);
  const title = frag.querySelector(".menu-subtitle");
  if (!title) return null;
  title.remove();
  const nodes = [...frag.childNodes];
  const br = nodes.findIndex(isBr);
  if (br === -1) return null;
  return { title, priceLine: nodes.slice(0, br), body: nodes.slice(br + 1) };
}

/** 사이드 블록 → [{ name[], price[] }, …] (제목 줄 제외, 빈 줄 제외) */
export function splitSideBlock(html) {
  const frag = toFragment(html);
  frag.querySelector(".menu-subtitle")?.remove();
  const lines = [[]];
  for (const n of [...frag.childNodes]) {
    if (isBr(n)) lines.push([]);
    else lines[lines.length - 1].push(n);
  }
  return lines
    .filter((nodes) => nodes.some((n) => !isBlankText(n)))
    .map((nodes) => {
      const i = nodes.findIndex((n) => n.nodeType === Node.ELEMENT_NODE && n.classList.contains("price"));
      // 가격 뒤에 붙는 꼬리말("per person")은 가격 칸에 함께 둔다
      return i === -1 ? { name: nodes, price: [] } : { name: nodes.slice(0, i), price: nodes.slice(i) };
    });
}

function markSeparators(root) {
  root.querySelectorAll("span.small-note").forEach((s) => {
    if (s.textContent.trim() === "+") {
      s.classList.replace("small-note", "sep");
      s.textContent = SEPARATOR_TEXT;
    }
  });
}

/**
 * 코스 카드 한 장. 13개 언어 pane 을 모두 넣고 현재 언어만 보인다.
 * @param {string} contentKey  "courseA" | "courseB" | "courseF"
 * @param {string} currentLang
 * @param {{icon?: string, featured?: boolean, chips?: string[]}} options
 */
export function buildCourseCard(contentKey, currentLang, { icon = "", featured = false, chips = [] } = {}) {
  const card = el("article", featured ? "course-card is-featured" : "course-card");
  card.dataset.course = contentKey;

  for (const lang of LANGS) {
    const pane = el("div", "course-pane");
    pane.dataset.lang = lang;
    pane.hidden = lang !== currentLang;
    const raw = CONTENT[contentKey]?.[lang];

    if (raw == null) {
      console.warn(`[render] 콘텐츠 없음: ${contentKey}/${lang}`);
    } else {
      const html = fillPrices(raw, lang);
      const parts = splitCourseBlock(html);
      if (!parts) {
        console.warn(`[render] 뼈대 불일치, 통째로 표시: ${contentKey}/${lang}`);
        pane.innerHTML = html;
      } else {
        const title = el("div", "course-title", [parts.title]);
        if (icon) title.dataset.icon = icon; // CSS ::before 로 그린다 (textContent 에 안 들어감)
        const head = el("div", "course-head", [title, el("div", "course-price", parts.priceLine)]);
        const body = el("div", "course-body", parts.body);
        markSeparators(body);
        pane.append(head, body);
      }
    }
    card.appendChild(pane);
  }

  if (chips.length) {
    const row = el("div", "course-chips");
    row.setAttribute("aria-hidden", "true"); // 본문에 이미 글로 있는 정보의 시각 강조일 뿐
    chips.forEach((c) => {
      const chip = el("span", "chip");
      chip.textContent = c;
      row.appendChild(chip);
    });
    card.appendChild(row);
  }
  return card;
}

/** 사이드 가격표. 13개 언어 pane, 현재 언어만 보인다. */
export function buildSideList(currentLang) {
  const list = el("div", "side-list");
  for (const lang of LANGS) {
    const pane = el("div", "side-pane");
    pane.dataset.lang = lang;
    pane.hidden = lang !== currentLang;
    const raw = CONTENT.side?.[lang];
    if (raw == null) {
      console.warn(`[render] 콘텐츠 없음: side/${lang}`);
    } else {
      for (const row of splitSideBlock(fillPrices(raw, lang))) {
        pane.appendChild(el("div", "side-row", [el("div", "side-name", row.name), el("div", "side-price", row.price)]));
      }
    }
    list.appendChild(pane);
  }
  return list;
}
```

- [x] **Step 4: app.js 전체 교체**

`js/app.js` — 기존 파일을 아래로 **통째로** 바꾼다. 바뀐 점: render.js 임포트와 renderMenu(), hidden-body/revealPage 제거, 상단 바 언어 이름 갱신, 접이식 aria-expanded 동기화. 상세박스 안의 ✕ 닫기 버튼은 접이식 헤더가 닫기를 맡으므로 없앴다(CLOSE_LABELS·close-detail 액션 삭제).

```js
import { LANGS, LANG_NAMES, CONTENT } from "./content.js";
import { fillPrices } from "./prices.js";
import { buildCourseCard, buildSideList } from "./render.js";

const DEFAULT_LANG = "ko";
const STORAGE_KEY = "kbbq.lang";
const RTL_LANGS = ["ar"];
const SCROLL_OFFSET_PX = 80;
const FADE_OUT_MS = 300;

// 첫 화면에 항상 펼쳐 두는 코스 카드. 이모지는 언어와 무관한 시각 앵커.
const COURSES = [
  { key: "courseA", icon: "🥩" },
  { key: "courseB", icon: "🥩" },
  { key: "courseF", icon: "🥩", featured: true, chips: ["🍗", "🥤", "🍚", "🍜"] },
];

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// ─────────────────────────── 언어 저장 (localStorage 차단 환경 대비) ──────────

function readSavedLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return LANGS.includes(saved) ? saved : null;
  } catch {
    return null;
  }
}

function saveLang(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* 저장 실패는 치명적이지 않다 — 이번 방문에만 적용된다. */
  }
}

// ─────────────────────────── 언어 적용 ───────────────────────────────────────

function showOnlyLang(root, lang) {
  root.querySelectorAll("[data-lang]").forEach((el) => {
    el.hidden = el.dataset.lang !== lang;
  });
}

function currentLang() {
  const lang = document.documentElement.lang;
  return LANGS.includes(lang) ? lang : DEFAULT_LANG;
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";

  showOnlyLang(document, lang);

  document.querySelectorAll("[data-lang-code]").forEach((btn) => {
    btn.classList.toggle("active-lang", btn.dataset.langCode === lang);
    btn.setAttribute("aria-pressed", String(btn.dataset.langCode === lang));
  });

  const topbarName = document.getElementById("topbarLangName");
  if (topbarName) topbarName.textContent = LANG_NAMES[lang] || lang;
}

// ─────────────────────────── 첫 화면 메뉴 렌더 ─────────────────────────────

function renderMenu(lang) {
  const cards = document.getElementById("courseCards");
  const side = document.getElementById("sideList");
  if (!cards || !side) {
    console.error("[app] #courseCards / #sideList 가 index.html 에 없습니다.");
    return;
  }
  cards.replaceChildren(...COURSES.map((c) => buildCourseCard(c.key, lang, c)));
  side.replaceChildren(buildSideList(lang));
}

// ─────────────────────────── 언어 선택 모달 ──────────────────────────────────

const modal = () => document.getElementById("langModal");
let lastFocusedBeforeModal = null;

function openLangModal() {
  const el = modal();
  if (!el) return;
  lastFocusedBeforeModal = document.activeElement;
  el.classList.add("open");
  el.hidden = false;
  document.body.classList.add("scroll-locked");
  const first = el.querySelector(FOCUSABLE);
  if (first) first.focus();
}

function closeLangModal() {
  const el = modal();
  if (!el) return;
  el.classList.remove("open");
  el.hidden = true;
  document.body.classList.remove("scroll-locked");
  if (lastFocusedBeforeModal instanceof HTMLElement) lastFocusedBeforeModal.focus();
}

function trapFocus(event) {
  const el = modal();
  if (!el || el.hidden || event.key !== "Tab") return;
  const items = [...el.querySelectorAll(FOCUSABLE)].filter((n) => !n.hidden);
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function selectLang(lang) {
  if (!LANGS.includes(lang)) return;
  applyLang(lang);
  saveLang(lang);
  closeLangModal();
}

// ─────────────────────────── 접이식 안내 (상세박스 4개) ────────────────────

// 13개 언어 문단을 모두 넣고 현재 언어만 보인다. 닫기는 접이식 헤더가 맡는다.
function renderDetail(contentKey, lang) {
  const section = CONTENT[contentKey];
  if (!section) {
    console.error(`[app] 콘텐츠를 찾을 수 없습니다: ${contentKey}`);
    return "";
  }
  return LANGS.map(
    (code) =>
      `<p data-lang="${code}"${code === lang ? "" : " hidden"}>` +
      fillPrices(section[code], code) +
      `</p>`
  ).join("");
}

function setExpanded(boxId, expanded) {
  document
    .querySelectorAll(`[data-action="detail"][data-target="${boxId}"]`)
    .forEach((btn) => btn.setAttribute("aria-expanded", String(expanded)));
}

function closeDetail(boxId) {
  const box = document.getElementById(boxId);
  if (!box) return;
  box.classList.remove("show");
  box.classList.remove("is-open");
  setExpanded(boxId, false);
  window.setTimeout(() => {
    if (!box.classList.contains("is-open")) box.hidden = true;
  }, FADE_OUT_MS);
}

function openDetail(boxId, contentKey) {
  const box = document.getElementById(boxId);
  if (!box) {
    console.error(`[app] 상세박스를 찾을 수 없습니다: ${boxId}`);
    return;
  }
  // 열려 있는 박스를 다시 누르면 닫는다.
  if (box.classList.contains("is-open") && box.dataset.content === contentKey) {
    closeDetail(boxId);
    return;
  }
  // 한 번에 하나만 열린다.
  document.querySelectorAll(".detail-box.is-open").forEach((other) => {
    if (other.id !== boxId) closeDetail(other.id);
  });

  const lang = currentLang();
  box.dataset.content = contentKey;
  box.innerHTML = renderDetail(contentKey, lang);
  box.hidden = false;
  box.classList.add("is-open");
  setExpanded(boxId, true);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      box.classList.add("show");
      // 헤더까지 보이도록 접이식 래퍼로 스크롤한다 (고정 바 52px 아래에 헤더가 오게)
      scrollToElement(box.closest(".acc") || box);
    });
  });
}

function scrollToElement(el) {
  const top = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET_PX;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─────────────────────────── 이벤트 (위임) ──────────────────────────────────

const ACTIONS = {
  "open-lang": openLangModal,
  "close-lang": closeLangModal,
  lang: (el) => selectLang(el.dataset.langCode),
  detail: (el) => openDetail(el.dataset.target, el.dataset.content),
};

function onClick(event) {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;
  const handler = ACTIONS[trigger.dataset.action];
  if (handler) handler(trigger);
}

function onKeydown(event) {
  const el = modal();
  if (el && !el.hidden) {
    if (event.key === "Escape") closeLangModal();
    else trapFocus(event);
  }
}

function onBackdropClick(event) {
  if (event.target === modal()) closeLangModal();
}

function init() {
  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKeydown);
  modal()?.addEventListener("click", onBackdropClick);

  const saved = readSavedLang();
  const startLang = saved || DEFAULT_LANG;
  renderMenu(startLang);
  applyLang(startLang);
  document.body.classList.add("fade-in");

  // 첫 방문: 본문(한국어)은 그대로 두고 모달만 위에 띄운다.
  if (!saved) openLangModal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
```

- [x] **Step 5: 문법 검사**

```bash
for f in js/render.js js/app.js; do cp "$f" /tmp/chk.mjs && node --check /tmp/chk.mjs && echo "OK $f"; done; rm -f /tmp/chk.mjs
```
Expected: `OK js/render.js` `OK js/app.js`

- [x] **Step 6: 검사 통과 확인**

```bash
tests/run.sh
```
Expected: `test-structure.js`, `test-course-cards.js`, `test-side-list.js` 모두 `✅ … PASS`

- [x] **Step 7: 콘솔 오류 확인**

```bash
agent-browser --session kbbq-test open http://127.0.0.1:8080/ >/dev/null && agent-browser --session kbbq-test wait --load networkidle >/dev/null && agent-browser --session kbbq-test console 2>/dev/null | grep -iE "error|warn" || echo "콘솔 오류/경고 없음"
```
Expected: `콘솔 오류/경고 없음` (`[render] 뼈대 불일치` 경고가 있으면 해당 블록을 `js/content.js`에서 확인 — 나오면 안 된다)

- [x] **Step 8: 커밋**

```bash
git add js/render.js js/app.js tests/browser/test-course-cards.js tests/browser/test-side-list.js
git commit -m "feat: content.js 블록을 잘라 코스 카드와 사이드 가격표를 첫 화면에 렌더"
```

---

### Task 4: 새 레이아웃 CSS

**Files:**
- Create: `tests/browser/test-styles.js`
- Modify: `style.css` (끝에 추가)

- [x] **Step 1: 실패하는 스타일 검사 작성**

`tests/browser/test-styles.js`:

```js
(() => {
  const errs = [];
  const cs = (sel) => getComputedStyle(document.querySelector(sel));
  if (cs("header.topbar").position !== "sticky") errs.push("상단 바가 sticky 아님");

  const h2 = document.querySelector("#menuTitle");
  const span = h2.querySelector("[data-lang]:not([hidden])");
  if (getComputedStyle(span).fontSize !== getComputedStyle(h2).fontSize)
    errs.push(`제목 span ${getComputedStyle(span).fontSize} ≠ h2 ${getComputedStyle(h2).fontSize}`);

  const pane = cs(".course-card [data-lang]:not([hidden])");
  if (pane.marginTop !== "0px") errs.push(`카드 pane margin-top ${pane.marginTop}`);
  if (!["start", "left"].includes(pane.textAlign)) errs.push(`카드 pane text-align ${pane.textAlign}`);

  if (cs(".course-title .menu-subtitle").display !== "inline") errs.push("카드 제목 subtitle 이 block");
  if (cs(".course-head").display !== "flex") errs.push("카드 헤더 flex 아님");
  if (cs(".side-row").display !== "flex") errs.push("사이드 행 flex 아님");

  const head = cs(".acc-head");
  if (head.backgroundColor !== "rgba(0, 0, 0, 0)") errs.push(`접이식 헤더 배경 ${head.backgroundColor}`);
  if (head.width === "auto" || parseFloat(head.width) < 300) errs.push(`접이식 헤더 너비 ${head.width}`);

  const bell = cs(".bell [data-lang]:not([hidden])");
  if (bell.display !== "inline") errs.push("벨 문구 span 이 inline 아님");

  // ④ 캐스케이드: 옛 규칙을 실제로 이겼는지 (존재가 아니라 결과를 잰다)
  const tagSpan = document.querySelector("footer .tagline [data-lang]:not([hidden])");
  const brandSpan = document.querySelector("footer .footer-brand [data-lang]:not([hidden])");
  if (tagSpan && brandSpan && tagSpan.getBoundingClientRect().bottom > brandSpan.getBoundingClientRect().top)
    errs.push("푸터 슬로건이 © 줄과 겹침");
  if (parseInt(cs(".acc-head").fontWeight, 10) < 700) errs.push(`접이식 헤더 굵기 ${cs(".acc-head").fontWeight} (기대 ≥700)`);
  if (parseInt(cs(".topbar-lang").fontWeight, 10) < 700) errs.push(`언어 버튼 굵기 ${cs(".topbar-lang").fontWeight}`);

  // 접이식 본문 크기는 언어와 무관해야 한다 (ko 와 zh 비교)
  document.querySelector('.acc-head[data-content="usage"]').click();
  const sizeOf = (lang) => {
    document.querySelector(`[data-lang-code="${lang}"]`).click();
    return getComputedStyle(document.querySelector('#usageDetailBox p[data-lang]:not([hidden])')).fontSize;
  };
  const koSize = sizeOf("ko"), zhSize = sizeOf("zh");
  if (koSize !== zhSize) errs.push(`접이식 본문 크기 언어별 상이 ko ${koSize} / zh ${zhSize}`);
  document.querySelector('.acc-head[data-content="usage"]').click(); // 닫기

  // 라틴 문자 제목이 가격에 밀려 찢기지 않는지 (en, B코스)
  document.querySelector('[data-lang-code="en"]').click();
  const enHead = document.querySelector('.course-card[data-course="courseB"] [data-lang="en"] .course-head');
  const enTitle = enHead.querySelector(".course-title").getBoundingClientRect().width;
  if (enTitle < enHead.getBoundingClientRect().width * 0.55) errs.push(`en 제목 칸 ${Math.round(enTitle)}px — 헤더의 55% 미만`);
  document.querySelector('[data-lang-code="ko"]').click();
  return errs.length ? "FAIL: " + errs.join(" / ") : "PASS";
})()
```

- [x] **Step 2: 실패 확인**

```bash
tests/run.sh 2>&1 | grep test-styles
```
Expected: `❌ test-styles.js — FAIL: 상단 바가 sticky 아님 / …`

- [x] **Step 3: CSS 추가**

`style.css` **맨 끝**에 아래를 붙인다 (뒤에 올수록 이기므로 기존 규칙과의 충돌을 위치로 해결한다). 추가로 레거시 규칙 두 개도 이 자리에서 함께 고친다: 옛 `footer { line-height: 0.5 }`는 © 한 줄짜리 레이아웃용 꼼수였는데 슬로건 문단이 내려오며 글자가 겹쳤으므로 `1.6`으로, 옛 `body.fade-in { animation: fadeInPage 1.8s … }`는 QR 손님이 메뉴를 읽기까지 너무 오래 걸려 `0.6s`로 바꾼다.

```css

/* ============================= */
/* 🔹 QR 메뉴판 레이아웃 (2026-09 개편) */
/* ============================= */

/* 이 블록이 이겨야 하는 옛 규칙들 — 지우기 전엔 여기 규칙이 왜 !important/명시값을 쓰는지 참고:
   · body, p, button { font-weight: 500 !important }
   · footer { line-height } (1.6 으로 고침)
   · .usage-detail p:first-child / p:nth-child(2) (위치 기반 크기)
   · [data-lang] { margin; max-width; font-size; text-align } + @media 변형 */

/* 인라인 다국어 라벨: [data-lang] 의 블록용 레이아웃 규칙(margin·max-width·font-size·padding)을 받지 않는다 */
.i18n-inline [data-lang] {
  display: inline;
  margin: 0;
  padding: 0;
  max-width: none;
  font-size: inherit;
  line-height: inherit;
  text-align: inherit;
}

/* 상단 고정 바 */
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 14px;
  background: #d50000;
  color: #fff;
}

.topbar-brand {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 1.05rem;
  font-weight: 800;
}

.topbar-brand img {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  flex: none;
}

.topbar-brand [data-lang] {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topbar-lang {
  flex: none;
  margin: 0;
  padding: 6px 12px;
  border: 0;
  border-radius: 999px;
  background: #fff;
  color: #d50000;
  font-size: 0.9rem;
  font-weight: 700 !important; /* body, p, button { font-weight: 500 !important } 를 이긴다 */
  box-shadow: none;
  cursor: pointer;
}

/* 벨 안내 띠 */
.bell {
  margin: 0;
  padding: 9px 14px;
  background: #fff3cd;
  color: #6b4e00;
  font-size: 0.95rem;
  text-align: center;
}

/* 메뉴 시트(코스·사이드·접이식 공통 폭) */
.menu-sheet {
  max-width: 640px;
  margin: 0 auto;
  padding: 6px 14px 24px;
}

.menu-sheet section {
  padding: 0;
  margin: 0 0 18px;
}

.menu-sheet h2 {
  margin: 14px 0 8px;
  font-size: 1.1rem;
  color: #7a2a2a;
  text-align: start;
}

/* 카드·가격표 안의 언어 pane 은 블록이지만 [data-lang] 레이아웃 규칙은 받지 않는다 */
.course-card [data-lang],
.side-list [data-lang] {
  display: block;
  margin: 0;
  padding: 0;
  max-width: none;
  font-size: inherit;
  line-height: 1.6;
  text-align: start;
}

/* 코스 카드 */
.course-card {
  margin: 0 0 10px;
  padding: 12px 14px;
  background: #fff;
  border: 1px solid #f0c9d0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.course-card.is-featured {
  border-color: #d50000;
  background: #fffafa;
}

.course-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}

.course-title {
  flex: 1 1 0;
  min-width: 0;            /* 제목이 먼저 폭을 갖고, 가격이 줄바꿈으로 양보한다 */
  font-size: 1.05rem;
  font-weight: 800;
}

.course-title[data-icon]::before {
  content: attr(data-icon) " ";
}

.course-title .menu-subtitle {
  display: inline;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  text-shadow: none;
  letter-spacing: 0;
}

.course-title .course-label {
  font-size: 1.4rem;
  margin-right: 6px;
}

.course-price {
  flex: 0 1 auto;
  max-width: 40%;          /* 라틴 문자 가격줄("₩19,900 per person")은 여기서 두 줄로 접힌다 —
                               42% 는 제목 칸을 헤더 폭의 55% 밑으로 밀어냈다(측정: 54.8%) */
  text-align: end;
  font-weight: 700;
  color: #333;
}

.course-price .price {
  color: #d50000;
  font-size: 1.1rem;
}

.course-body {
  margin-top: 6px;
  font-size: 0.95rem;
  color: #333;
  word-break: keep-all;
}

.course-body .small-note {
  font-size: 0.85rem;
  color: #666;
}

.course-body .sep {
  color: #c33;
}

.course-chips {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.course-chips .chip {
  padding: 2px 8px;
  border-radius: 999px;
  background: #FFEDF0;
  font-size: 0.95rem;
}

/* 사이드 가격표 */
.side-list {
  padding: 0 15px;
}

.side-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px dashed #e8d3d7;
  font-size: 0.95rem;
}

.side-name .small-note {
  font-size: 0.85rem;
  color: #666;
}

.side-price {
  flex: none;
  text-align: end;
}

.side-price .price {
  color: #d50000;
  font-weight: 800;
}

/* 접이식 안내 */
.acc {
  border-top: 1px solid #eadfe1;
}

.acc-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 12px 4px;
  border: 0;
  border-radius: 0;
  background: none;
  box-shadow: none;
  color: #333;
  font-size: 1rem;
  font-weight: 700 !important; /* body, p, button { font-weight: 500 !important } 를 이긴다 */
  text-align: start;
  cursor: pointer;
}

.acc-head::after {
  content: "▾";
  color: #999;
  transition: transform 0.2s;
}

.acc-head[aria-expanded="true"]::after {
  transform: rotate(180deg);
}

.acc .usage-detail {
  margin: 0 0 12px;
  max-width: none;
}

/* 옛 .usage-detail p:first-child / :nth-child(2) 규칙이 13개 언어 문단의 DOM 순서에 걸려
   언어마다 글자 크기가 달라졌다(ko 1.4rem, en 1.3rem, 나머지 1rem). 전부 같은 크기로. */
.acc .usage-detail p {
  margin: 10px 0;
  font-size: 1rem;
}

/* 푸터: 슬로건은 히어로에서 내려왔다 */
footer .tagline {
  margin: 0 0 6px;
  font-size: 0.95rem;
}

footer .footer-brand {
  margin: 0;
}
```

- [x] **Step 4: 검사 통과 확인**

```bash
tests/run.sh
```
Expected: 지금까지의 4개 검사 모두 `✅ … PASS`

- [x] **Step 5: 눈으로 확인**

http://127.0.0.1:8080 — 언어를 고른 뒤: 빨간 상단 바가 스크롤해도 붙어 있고, 노란 벨 띠, 흰 카드 3장(Full 만 빨간 테두리 + 칩), 사이드 가격표, 접이식 4개가 보인다. 카드 제목 앞에 🥩가 보인다. 제목 크기가 작지 않다.

- [x] **Step 6: 커밋**

```bash
git add style.css tests/browser/test-styles.js
git commit -m "style: 상단 바·벨 띠·코스 카드·사이드 표·접이식 레이아웃"
```

---

### Task 5: 접이식 접근성 + 언어 전환 검사

코드는 Task 3의 `app.js`에 이미 들어 있다(`setExpanded`, `topbarLangName`). 이 Task는 그 동작을 검사로 고정한다.

**Files:**
- Create: `tests/browser/test-accordion.js`
- Create: `tests/browser/test-lang-switch.js`

- [x] **Step 1: 접이식 검사 작성**

`tests/browser/test-accordion.js`:

```js
(async () => {
  const errs = [];
  document.querySelector('[data-lang-code="ko"]')?.click(); // 첫 방문 모달 닫기 (다른 검사와 동일한 관례)
  const heads = [...document.querySelectorAll(".acc-head")];
  if (heads.length !== 4) return `FAIL: 헤더 ${heads.length}개`;
  const boxOf = (h) => document.getElementById(h.dataset.target);
  if (heads.some((h) => h.tagName !== "BUTTON")) errs.push("헤더가 button 이 아님 (키보드 불가)");
  const missing = heads.filter((h) => !boxOf(h));
  if (missing.length) return `FAIL: data-target 박스 없음: ${missing.map((h) => h.dataset.content).join(", ")}`;

  // 4개 전부 차례로 열어 본다 — 매번 "그 헤더의 박스 하나만" 열려 있어야 한다
  // (헤더끼리 data-target 을 복붙하다 섞인 버그를 잡는다)
  for (const h of heads) {
    h.click();
    const open = [...document.querySelectorAll(".detail-box.is-open")];
    if (open.length !== 1) errs.push(`${h.dataset.content}: 열린 박스 ${open.length}개`);
    else if (open[0].id !== h.dataset.target) errs.push(`${h.dataset.content}: 엉뚱한 박스 열림 (${open[0].id})`);
    if (h.getAttribute("aria-expanded") !== "true") errs.push(`${h.dataset.content}: 열었는데 aria-expanded=true 아님`);
    if (!boxOf(h).querySelector("p[data-lang]:not([hidden])")) errs.push(`${h.dataset.content}: 보이는 문단 없음`);
    for (const other of heads) if (other !== h && other.getAttribute("aria-expanded") !== "false") errs.push(`${other.dataset.content}: 닫혔는데 aria-expanded=false 아님`);
  }

  // 같은 헤더를 다시 누르면 닫히고, 페이드 후 hidden 이 된다
  const last = heads[heads.length - 1];
  last.click();
  if (boxOf(last).classList.contains("is-open")) errs.push("같은 헤더를 다시 눌렀는데 안 닫힘");
  await new Promise((r) => setTimeout(r, 400)); // FADE_OUT_MS(300) + 여유
  if (!boxOf(last).hidden) errs.push("닫힌 뒤 400ms 지나도 hidden 이 아님");
  return errs.length ? "FAIL: " + errs.join(" / ") : "PASS";
})()
```

- [x] **Step 2: 언어 전환 검사 작성**

`tests/browser/test-lang-switch.js`:

```js
(() => {
  const errs = [];
  const LANGS = ["ko","en","zh","ja","vi","th","ph","fr","es","pt","ar","ru","tr"];
  const NAMES = { ko: "한국어", en: "English", zh: "中文", ja: "日本語", vi: "Tiếng Việt", th: "ไทย",
    ph: "Filipino", fr: "Français", es: "Español", pt: "Português", ar: "العربية", ru: "Русский", tr: "Türkçe" };
  // 열린 접이식 박스도 언어를 따라가야 한다
  document.querySelector('.acc-head[data-content="usage"]').click();
  for (const lang of LANGS) {
    document.querySelector(`[data-lang-code="${lang}"]`).click();
    if (document.documentElement.lang !== lang) errs.push(`${lang}: html lang 미적용`);
    const stray = [...document.querySelectorAll("[data-lang]")].filter((e) => !e.hidden && e.dataset.lang !== lang).length;
    if (stray) errs.push(`${lang}: 다른 언어 요소 ${stray}개 노출`);
    const hiddenOwn = [...document.querySelectorAll(`[data-lang="${lang}"]`)].filter((e) => e.hidden).length;
    if (hiddenOwn) errs.push(`${lang}: 자기 언어 요소 ${hiddenOwn}개 숨김`);
    const openP = document.querySelector('#usageDetailBox p[data-lang]:not([hidden])');
    if (!openP || openP.dataset.lang !== lang) errs.push(`${lang}: 열린 접이식 박스가 언어를 안 따라감`);
    const label = document.getElementById("topbarLangName").textContent;
    if (label !== NAMES[lang]) errs.push(`${lang}: 상단 바 라벨 '${label}'`);
  }
  // 아랍어: 가격이 제목의 왼쪽에 와야 한다 (RTL)
  document.querySelector('[data-lang-code="ar"]').click();
  const t = document.querySelector('.course-card [data-lang="ar"] .course-title').getBoundingClientRect();
  const p = document.querySelector('.course-card [data-lang="ar"] .course-price').getBoundingClientRect();
  if (!(p.left < t.left)) errs.push("아랍어에서 가격이 왼쪽에 오지 않음");
  if (document.documentElement.dir !== "rtl") errs.push("아랍어 dir=rtl 아님");
  document.querySelector('[data-lang-code="ko"]').click();
  return errs.length ? "FAIL: " + errs.slice(0, 6).join(" / ") : "PASS";
})()
```

- [x] **Step 3: 실행**

```bash
tests/run.sh
```
Expected: 6개 검사 모두 `✅ … PASS`. 실패하면 Task 3의 `app.js`(`setExpanded`, `applyLang`)와 Task 4의 CSS(`.course-head` flex)를 확인.

- [x] **Step 4: 커밋**

```bash
git add tests/browser/test-accordion.js tests/browser/test-lang-switch.js
git commit -m "test: 접이식 aria-expanded와 13개 언어 전환 검사"
```

---

### Task 6: 죽은 CSS 삭제

히어로·버튼 그리드·`hidden-body`·코스/사이드 상세박스 전용 규칙은 이제 아무 요소와도 맞지 않는다. 셀렉터 목록으로 자동 삭제한다. 그룹 셀렉터(`.menu-detail p, .usage-detail p`)는 죽은 항목만 빼고 남긴다.

**Files:**
- Modify: `style.css`

- [x] **Step 1: 삭제 전 규칙 수 기록**

```bash
grep -c '{' style.css
```
Expected: 숫자 하나 (예: 260대). 뒤에서 줄어드는지 본다.

- [x] **Step 2: 삭제 스크립트 실행**

아래를 `/tmp/prune-css.py`로 저장하고 실행한다.

```python
import re
P = 'style.css'
src = open(P, encoding='utf-8').read()

# 선택자 "시작"이 이 이름들이면 죽은 선택자다 (대상 요소가 더 이상 없다)
DEAD = re.compile(r'^(\.hero|\.hidden-body|\.menu-buttons|\.menu-btn|#menuDetailBox|#sideDetailBox|'
                  r'\.menu-detail|\.side-detail|\.footer-branches|\.detail-header|\.close-btn)')
# 정확히 이 선택자 목록인 규칙은 통째로 지운다: 섹션 등장 전환 — body.fade-in 이 첫 페인트 전에 붙어
# 한 번도 발동하지 않으면서 section/footer 에 transform 과 transition:all 만 남긴다.
EXACT_DEAD = {'section, footer', 'body.fade-in section, body.fade-in footer'}

removed = []

def clean(css):
    mask = re.sub(r'/\*.*?\*/', lambda m: ' ' * len(m.group(0)), css, flags=re.S)
    out = ''; i = 0; n = len(css)
    while i < n:
        j = mask.find('{', i)
        if j == -1:
            out += css[i:]; break
        depth = 1; k = j + 1
        while k < n and depth:
            depth += (mask[k] == '{') - (mask[k] == '}'); k += 1
        head = css[i:j]; body = css[j + 1:k - 1]
        sel = ' '.join(mask[i:j].split())
        if sel.startswith('@'):
            inner = clean(body)
            if inner.strip():
                out += head + '{' + inner + '}'
            else:
                removed.append(sel + ' (빈 @블록)')
        else:
            parts = [s.strip() for s in sel.split(',') if s.strip()]
            if sel in EXACT_DEAD:
                removed.append(sel)
            else:
                keep = [s for s in parts if not DEAD.match(s)]
                dead = [s for s in parts if DEAD.match(s)]
                removed.extend(dead)
                if not keep:
                    pass                                   # 블록 통째 삭제 (앞 주석 포함)
                elif len(keep) == len(parts):
                    out += css[i:k]                        # 그대로
                else:
                    out += '\n' + ',\n'.join(keep) + ' {' + body + '}'   # 죽은 선택자만 제거
        i = k
    return out

result = re.sub(r'\n{3,}', '\n\n', clean(src))
open(P, 'w', encoding='utf-8').write(result)
print('규칙 수:', src.count('{'), '→', result.count('{'))
print('제거한 선택자', len(removed), '개:')
for s in removed: print('  -', s)
```

```bash
python3 /tmp/prune-css.py
```
Expected: `규칙 수: N → M` (M < N), 그리고 제거한 선택자 목록이 전부 죽은 이름(`DEAD` 접두사)으로 시작하거나 `EXACT_DEAD` 두 규칙 중 하나, 또는 `(빈 @블록)`이어야 한다. 그 외 이름이 하나라도 보이면 즉시 중단하고 `git checkout style.css`.

- [x] **Step 3: 남아야 할 규칙 확인**

```bash
grep -nE '^\.usage-detail|^#gamasotDetailBox|^#ssamDetailBox|^\.detail-header|^\.modal|^\[hidden\]|^\.store-info|^\.topbar|^\.course-card' style.css | head -20
```
Expected: 각 셀렉터가 최소 한 줄씩 나온다 (접이식 박스·가마솥/쌈 배경·모달·매장 안내·새 레이아웃은 살아 있어야 한다)

- [x] **Step 3½: 반드시 살아야 할 규칙 표 + 가격 칸 word-break 추가**

```bash
for s in '^\.usage-detail \{' '^\.usage-detail\.show' '^\.usage-detail:hover' '^\.usage-detail p \{' '^#gamasotDetailBox' '^#ssamDetailBox' '^\.modal-content \.close' '^\.detail-box\.is-open' '^\[hidden\]' '^\.store-info' '^body\.fade-in \{' '^@keyframes fadeInPage' '^footer \{' '^\.topbar \{' '^\.course-card \{' '^\.acc-head \{'; do
  c=$(grep -cE "$s" style.css); printf '%-32s %s\n' "$s" "$c"
done
```
Expected: 전부 1 이상. `.usage-detail` 카드 룩(display:none·배경·테두리·padding·max-width·box-shadow·opacity/transform/transition)과 `.show`·`:hover`·`p`·768px 미디어 변형(`.menu-detail, .side-detail, .usage-detail { padding: 18px }` → `.usage-detail { padding: 18px }`으로 축소되어 있어야 함), `.modal-content .close`(죽은 `.detail-header .close-btn`과 묶여 있었음), `#gamasotDetailBox`/`#ssamDetailBox`/`.detail-box.is-open`/`[hidden]`/`.store-info`/`body.fade-in`/`@keyframes fadeInPage`/`footer`/QR 메뉴판 레이아웃 블록(`.topbar`/`.course-card`/`.acc-head`)이 대상.

리뷰에서 넘어온 추가 1건: "QR 메뉴판 레이아웃" 블록의 `.course-price { … }` 안, `max-width` 다음 줄에 `word-break: normal;`을 추가한다 (320px 폭에서 일본어 등 가격 텍스트가 `[data-lang]`의 `keep-all` 상속으로 40% 칸 밖으로 삐져나오는 것을 막기 위함).

리뷰 2차 라운드에서 추가로 확인된 미참조 규칙(각각 `index.html`·`js/*.js`(정적·동적 클래스 생성 포함)에서 참조 0건 확인 후 삭제):
- `.menu, .usage, #ssam { background-color }` — 개편 후 섹션은 `id="menu"`/`id="side"`/`id="guide"`만 쓰고 해당 클래스·id는 없음
- `.menu h2, .usage h2 { … }` — 위와 같은 이유로 대상 없음
- `.location { … }` — 위치 섹션이 더 이상 이 클래스를 쓰지 않음
- `.side-grid { … }` / `.side-grid p { … }` + 그 ≤768px 미디어 변형 — 사이드 메뉴는 이제 `render.js`가 만드는 `.side-list`/`.side-row`/`.side-name`/`.side-price`만 사용
- `.highlight-yellow { … }` — 참조 없음
- `.active-menu { … }` — 참조 없음

- [x] **Step 4: 전체 검사 재실행**

```bash
tests/run.sh
```
Expected: 6개 모두 `✅`. 실패하면 `git diff style.css`로 잘못 지워진 그룹을 찾아 되살린다.

- [x] **Step 5: 커밋**

```bash
git add style.css
git commit -m "style: 히어로·버튼 그리드·hidden-body 등 대상 요소가 없어진 규칙 삭제"
```

---

### Task 7: 문구 무손실 검사 (기준선 대조)

**Files:**
- Create: `tests/browser/test-fidelity.js`

- [x] **Step 1: 검사 작성**

`tests/browser/test-fidelity.js` — `BASELINE`은 `tests/run.sh`가 앞에 붙여 준다.

```js
(() => {
  const errs = [];
  const norm = (t) => t.replace(/[+·]/g, " ").replace(/\s+/g, " ").trim();
  const bag = (t) => {
    const m = new Map();
    for (const w of norm(t).split(" ")) if (w) m.set(w, (m.get(w) || 0) + 1);
    return m;
  };
  const LANGS = ["ko","en","zh","ja","vi","th","ph","fr","es","pt","ar","ru","tr"];
  const ACC = { usage: "usageDetailBox", tips: "courseTipBox", gamasot: "gamasotDetailBox", ssam: "ssamDetailBox" };
  let n = 0;
  const check = (id, text) => {
    n++;
    const base = BASELINE[id];
    if (base == null) { errs.push(`${id}: 기준선 없음`); return; }
    const a = norm(text), b = norm(base);
    if (a === b) return;
    // 어떤 단어가 늘고 줄었는지 보여준다 (순서만 다르면 diff 가 비어 '순서 차이' 로 표시)
    const A = bag(text), B = bag(base), diff = [];
    for (const [w, c] of A) if ((B.get(w) || 0) !== c) diff.push(`+${w}×${c - (B.get(w) || 0)}`);
    for (const [w, c] of B) if (!A.has(w)) diff.push(`-${w}×${c}`);
    errs.push(diff.length ? `${id} [${diff.slice(0, 6).join(", ")}]` : `${id} (순서 차이)`);
  };
  for (const lang of LANGS) {
    document.querySelector(`[data-lang-code="${lang}"]`).click();
    for (const key of ["courseA", "courseB", "courseF"]) {
      check(`${key}|${lang}`, document.querySelector(`.course-card[data-course="${key}"] [data-lang="${lang}"]`)?.textContent ?? "");
    }
    check(`side|${lang}`, document.querySelector(`#sideList [data-lang="${lang}"]`)?.textContent ?? "");
    for (const [key, boxId] of Object.entries(ACC)) {
      document.querySelector(`.acc-head[data-content="${key}"]`).click();
      const p = document.querySelector(`#${boxId} p[data-lang="${lang}"]`);
      check(`${key}|${lang}`, p?.textContent ?? "");
    }
  }
  document.querySelector('[data-lang-code="ko"]').click();
  return errs.length
    ? `FAIL: ${errs.length}/${n} 불일치 — ${errs.slice(0, 8).join(", ")}`
    : `PASS (${n}블록 기준선과 일치)`;
})()
```

- [x] **Step 2: 실행**

```bash
tests/run.sh 2>&1 | grep fidelity
```
Expected: `✅ test-fidelity.js — PASS (104블록 기준선과 일치)`

불일치가 나오면: 실패 메시지 자체에 `[+단어×n, -단어×n]` 형태로 어떤 단어가 늘고 줄었는지 나온다(순서만 다르면 `(순서 차이)`로 표시). 흔한 원인은 `splitCourseBlock`이 제목이나 가격 줄 노드를 빠뜨린 것.

- [x] **Step 3: content.js / prices.js 무변경 확인**

```bash
git diff fix/site-audit-2026-09 -- js/content.js js/prices.js | wc -l
```
Expected: `0`

- [x] **Step 4: 커밋**

```bash
git add tests/browser/test-fidelity.js
git commit -m "test: 13개 언어 x 8콘텐츠 렌더 텍스트를 개편 전 기준선과 대조"
```

---

### Task 8: 첫 화면 합격 기준 · 스크린샷 · README

**Files:**
- Create: `tests/browser/test-first-screen.js`
- Modify: `README.md`

- [x] **Step 1: 첫 화면 검사 작성** (실행기 기본 뷰포트 390×844에서 돈다)

`tests/browser/test-first-screen.js`:

```js
(() => {
  const errs = [];
  const H = window.innerHeight;
  const bottom = (sel) => {
    const el = document.querySelector(sel);
    return el ? el.getBoundingClientRect().bottom : Infinity;
  };
  document.querySelector('[data-lang-code="ko"]').click();
  window.scrollTo(0, 0);
  if (bottom('.course-card[data-course="courseA"] .course-price') > H) errs.push("A코스 가격이 첫 화면 밖");
  if (bottom('.course-card[data-course="courseF"] .course-price') > H * 1.5) errs.push("Full 가격이 한 화면 반 밖");
  if (bottom("#sideList .side-row") > H * 1.5) errs.push("사이드 첫 항목이 한 화면 반 밖");
  if (getComputedStyle(document.querySelector(".bell")).display === "none") errs.push("벨 안내 안 보임");
  return errs.length ? `FAIL(${window.innerWidth}x${H}): ` + errs.join(" / ") : "PASS";
})()
```

- [x] **Step 2: 모바일·데스크톱 양쪽에서 전체 검사**

```bash
tests/run.sh && VIEWPORT_W=1280 VIEWPORT_H=900 tests/run.sh
```
Expected: 두 번 모두 9개 검사 `✅`. (데스크톱에서 `test-first-screen`이 실패하면 카드 여백을 줄이기보다 먼저 390 결과를 우선한다 — 스펙의 기준은 390이다. 1280에서만 실패하면 그 검사는 통과로 간주하고 이유를 커밋 메시지에 적는다.)

- [x] **Step 3: 스크린샷 저장**

```bash
mkdir -p docs/superpowers/screenshots
for W in 390 1280; do
  agent-browser --session kbbq-test set viewport $W 900 >/dev/null
  agent-browser --session kbbq-test open http://127.0.0.1:8080/ >/dev/null
  agent-browser --session kbbq-test wait --load networkidle >/dev/null
  agent-browser --session kbbq-test eval 'document.querySelector("[data-lang-code=ko]").click(); "ok"' >/dev/null
  agent-browser --session kbbq-test screenshot --full docs/superpowers/screenshots/2026-09-15-qr-menu-$W.png >/dev/null
done
ls -la docs/superpowers/screenshots/
```
Expected: png 2개. Read 도구로 열어 보고: 카드가 겹치거나 잘리지 않는지, 아랍어가 아니어도 가격이 오른쪽에 붙는지, 접이식 화살표가 보이는지 확인한다.

- [x] **Step 4: README 갱신**

`README.md`의 "## 파일 구조" 블록을 아래로 바꾼다:

```
index.html        페이지 구조 — 상단 바 · 벨 안내 · 코스 카드 · 사이드 표 · 접이식 안내 · 푸터
                  (UI 문구는 data-lang 속성으로 언어별 분기)
style.css         전체 스타일
js/
  app.js          로직 — 언어 전환, 모달, 접이식, 첫 화면 렌더
  render.js       content.js 블록을 코스 카드·사이드 표 DOM 으로 자르는 함수
  content.js      상세 문구 원본 (8개 섹션 × 13개 언어)
  prices.js       가격 단일 원본 + 언어별 통화 표기
tests/
  run.sh          브라우저 검사 실행기 (tests/run.sh / tests/run.sh baseline)
  browser/        검사 스크립트 (agent-browser 로 실행)
  baseline/       개편 전 텍스트 기준선
images/           로고 · 파비콘 · 배경 이미지
CNAME             커스텀 도메인
```

그리고 "## 자주 하는 수정" 앞에 아래 절을 추가한다 (물결 울타리 안의 내용을 그대로):

~~~
## 검사 돌리기

```bash
tests/run.sh                       # 모바일(390px) 기준 9개 검사
VIEWPORT_W=1280 tests/run.sh       # 데스크톱
```

`agent-browser`(npm i -g agent-browser)가 필요하다. 문구를 바꾼 뒤에는 기준선도 다시 만든다:
`tests/run.sh baseline` — 단, 이 명령은 **문구 변경이 의도된 경우에만** 실행한다.
~~~

- [x] **Step 5: 최종 커밋**

```bash
git add tests/browser/test-first-screen.js README.md docs/superpowers/screenshots/
git commit -m "feat: QR 메뉴판 UI 개편 완료 - 첫 화면 검사, 스크린샷, README"
git log --oneline fix/site-audit-2026-09..HEAD
```
Expected: Task 1~8 커밋 8~9개가 나열된다.

- [x] **Step 6: 스펙 합격 기준 대조**

스펙 §6의 7개 항목을 하나씩 확인해 보고한다:

| # | 기준 | 확인 방법 |
|---|---|---|
| 1 | 가격까지 0탭 | `test-first-screen.js` PASS, A 가격 bottom 192px / Full 522px / 사이드 첫 행 802px (H 844) |
| 2 | 문구 무손실 | `test-fidelity.js` PASS 104/104 |
| 3 | 언어 전환·RTL | `test-lang-switch.js` PASS |
| 4 | 접이식 키보드·단일 열림 | `test-accordion.js` PASS (button 요소·aria·단일 열림; 실제 키 입력은 하네스 한계로 미검증) |
| 5 | 첫 방문 모달 + 한국어 본문 / 재방문 무모달 | `test-styles.js` 첫 방문 + 수동: ja 선택 후 새로고침 → 모달 없음, lang=ja |
| 6 | 콘솔 오류 0, 스크린샷 겹침 없음 | console 비어 있음, 스크린샷 3장 겹침 없음 |
| 7 | content.js·prices.js diff 없음 | diff 0줄 |

---

## 자기 검토

**스펙 대조**
- §3① 상단 바 → Task 2(마크업)·4(CSS)·3(`topbarLangName` 갱신) ✓
- §3② 벨 안내 13문장 → Task 2 생성 스크립트 `BELL` ✓
- §3③ 카드 3장·Full 강조·이모지 칩·항상 펼침 → Task 3 `COURSES`·`buildCourseCard`, Task 4 CSS ✓
- §3④ 사이드 표 → Task 3 `buildSideList`, Task 4 ✓
- §3⑤ 접이식 4개·한 번에 하나 → Task 2 마크업, Task 3 `openDetail`, Task 5 검사 ✓
- §3⑥ 푸터(슬로건 이동, 지점 링크 행 삭제, 지점 카드 유지) → Task 2 ✓
- §3 언어 선택 전 상태(hidden-body 제거) → Task 3 `init`, Task 6 CSS 삭제 ✓
- §4 자르기 규칙·폴백·언어 전환·RTL → Task 3 `splitCourseBlock`/`splitSideBlock`/경고, Task 5 RTL 검사 ✓
- §5 파일별 변경 → 각 Task 파일 목록과 일치 ✓
- §6 합격 기준 7개 → Task 8 Step 6 표 ✓
- §7 범위 밖 → 어느 Task도 손대지 않음 ✓

**빈칸 검사** — TBD/TODO 없음. 모든 코드 단계에 실제 코드, 모든 명령에 기대 출력.

**이름 일관성** — `buildCourseCard`/`buildSideList`(render.js ↔ app.js), `#courseCards`/`#sideList`(index.html ↔ app.js ↔ 검사), `#topbarLangName`(index.html ↔ app.js ↔ 검사), `.acc-head`·`aria-expanded`(index.html ↔ `setExpanded` ↔ 검사), `.course-pane`/`.side-pane`/`.side-row`/`.course-title`/`.course-price`/`.course-body`/`.sep`(render.js ↔ CSS ↔ 검사) 모두 일치.
