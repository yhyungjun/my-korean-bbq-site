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
