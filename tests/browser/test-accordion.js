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
