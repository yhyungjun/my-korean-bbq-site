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
  need("footer .store-info .store", 2, "지점 카드");
  {
    const got = [...document.querySelectorAll("#langModal [data-lang-code]")].map((e) => e.dataset.langCode).sort().join(",");
    if (got !== WANT) errs.push(`언어 모달 버튼: 언어 집합 불일치 [${got}]`);
  }
  return errs.length ? "FAIL: " + errs.join(" / ") : "PASS";
})()
