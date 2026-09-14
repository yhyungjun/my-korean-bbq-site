(() => {
  const errs = [];
  const cs = (sel) => getComputedStyle(document.querySelector(sel));

  // ① 첫 방문(모달 열림) 상태에서 먼저 잰다.
  //    body 에 transform 이 남아 있으면 position:fixed 모달이 화면이 아니라 문서에 붙고 스크롤이 튄다.
  const modal = document.getElementById("langModal");
  if (modal && !modal.hidden) {
    const r = modal.getBoundingClientRect();
    if (Math.abs(r.top) > 1 || Math.abs(r.height - window.innerHeight) > 1)
      errs.push(`모달이 화면에 고정되지 않음 (top ${Math.round(r.top)}, height ${Math.round(r.height)}, 화면 ${window.innerHeight})`);
  } else {
    errs.push("첫 방문인데 언어 모달이 열려 있지 않음");
  }
  if (window.scrollY !== 0) errs.push(`첫 로드 스크롤 위치 ${window.scrollY} (기대 0)`);
  const bodyTf = getComputedStyle(document.body).transform;
  if (bodyTf !== "none") errs.push(`body 에 transform 이 있음: ${bodyTf}`);

  document.querySelector('[data-lang-code="ko"]').click();
  if (window.scrollY !== 0) errs.push(`언어 선택 후 스크롤 위치 ${window.scrollY} (기대 0)`);

  // ② 레이아웃 규칙
  if (cs("header.topbar").position !== "sticky") errs.push("상단 바가 sticky 아님");
  if (cs("h1.topbar-brand").marginTop !== "0px") errs.push(`h1 매장명 margin-top ${cs("h1.topbar-brand").marginTop}`);

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

  // ③ .sep 은 JS 가 텍스트(" · ")를 이미 넣었다 — CSS 가 ::before 로 또 넣으면 " ·  · " 가 된다
  const sep = document.querySelector(".course-body .sep");
  if (sep && getComputedStyle(sep, "::before").content !== "none") errs.push("`.sep::before` 가 content 를 넣고 있음 (중복 구분자)");
  return errs.length ? "FAIL: " + errs.join(" / ") : "PASS";
})()
