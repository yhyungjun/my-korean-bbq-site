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
