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
index.html        페이지 구조 (문구는 data-lang 속성으로 언어별 분기)
style.css         전체 스타일
js/
  app.js          로직 — 언어 전환, 모달, 상세박스
  content.js      상세박스 문구 원본 (8개 섹션 × 13개 언어)
  prices.js       가격 단일 원본 + 언어별 통화 표기
images/           로고 · 파비콘 · 배경 이미지
CNAME             커스텀 도메인
```

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

### 상세박스 문구 바꾸기

`js/content.js` 에서 해당 섹션 · 언어를 찾아 고친다.
`{{courseA}}` 같은 표시는 **가격 자리**이므로 지우지 말 것.

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
