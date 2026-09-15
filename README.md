# 강남 돼지상회 무한리필

13개 언어를 지원하는 매장 안내 · 메뉴 정적 사이트. 빌드 도구 없이 순수 HTML/CSS/JS로 동작하며
GitHub Pages로 <https://koreanbbqstore.com> 에 배포된다.

## 로컬에서 보기

```bash
python3 -m http.server 8080
# http://localhost:8080
```

> ES 모듈을 쓰기 때문에 `index.html` 파일을 브라우저로 직접 열면(`file://`) 동작하지 않는다.
> 반드시 위처럼 로컬 서버로 띄울 것.

## 파일 구조

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
  browser/        검사 스크립트 9개 (agent-browser 로 실행)
  baseline/       개편 전 텍스트 기준선 (문구 무손실 검사의 비교 대상)
images/           로고 · 파비콘 · 배경 이미지
CNAME             커스텀 도메인
```

## 검사 돌리기

```bash
tests/run.sh                       # 모바일(390px) 기준 9개 검사
VIEWPORT_W=1280 VIEWPORT_H=900 tests/run.sh   # 데스크톱
```

`agent-browser`(npm i -g agent-browser), `python3`, `curl` 이 필요하고, 실행기는 macOS 의 `lsof` 옵션을 쓴다. 로컬 서버(8080)가 떠 있으면 재사용하고, 없으면 잠깐 띄웠다 끈다.
문구를 **일부러** 바꾼 뒤에는 기준선도 다시 만든다: `tests/run.sh baseline`. 그 외에는 이 명령을 실행하지 말 것 —
기준선은 "문구가 한 글자도 안 바뀌었다"를 증명하는 비교 대상이다.

메뉴(카드·가격표)는 JS 로 그려진다. JS 가 꺼진 브라우저에서는 상단 바·벨 안내·접이식 제목·푸터만 보인다.

## 자주 하는 수정

### 가격 바꾸기

`js/prices.js` 의 `PRICES` 에서 숫자 하나만 고치면 13개 언어에 모두 반영된다.

```js
export const PRICES = {
  courseA: 17900,   // ← 여기만 고치면 끝
  ...
};
```

쉼표 없이 숫자만 적는다. `17900` (O) / `17,900원` (X)
언어별 표기(`17,900원`, `₩17,900`, `17.900 KRW` …)는 자동으로 붙는다.

### 코스 카드 · 사이드 표 · 접이식 안내 문구 바꾸기

`js/content.js` 에서 해당 섹션 · 언어를 찾아 고친다.
`{{courseA}}` 같은 표시는 **가격 자리**이므로 지우지 말 것.

코스 블록(courseA/B/F)은 **`<span class="menu-subtitle">제목</span>` → 가격 줄 → `<br>` → 구성** 순서를 지켜야
카드의 제목·가격·본문이 제자리에 들어간다. 첫 `<br>` 을 지우거나 제목 span 을 옮기면 카드가 통째로 한 덩어리로
표시되고 브라우저 콘솔에 `[render] 뼈대 불일치` 경고가 뜬다. 사이드 블록은 한 줄에 `이름 (설명) <span class="price">…</span><br>` 이다.

### 메뉴 이름 · 버튼 · 푸터 문구 바꾸기

`index.html` 에서 `data-lang="언어코드"` 가 붙은 요소를 직접 고친다.

### 매장 정보(주소·전화·영업시간) 바꾸기

`index.html` 푸터의 `<div class="store-info">` 안에 지점별 `<address class="store">` 카드가 3개 있다. 해당 지점 카드만 고친다.
주소·전화·시간은 언어와 무관해서 한 번만 적혀 있고, 라벨(주소/전화/영업시간)만 언어별 `data-lang` 으로 바뀐다.
같은 정보가 `<head>` 의 JSON-LD 에도 있으니 함께 맞춘다.

### 언어 추가하기

1. `js/content.js` 의 `LANGS` 와 `LANG_NAMES` 에 코드 추가
2. 같은 파일 `CONTENT` 의 8개 섹션 각각에 번역 추가
3. `js/prices.js` 의 `FORMATTERS` 에 통화 표기 규칙 추가
4. `index.html` 의 `data-lang` 요소들과 언어 선택 모달에 항목 추가

## 배포

`main` 브랜치에 push 하면 GitHub Pages가 자동 반영한다.
