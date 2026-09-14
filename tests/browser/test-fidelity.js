(() => {
  const errs = [];
  const norm = (t) => t.replace(/[+·]/g, " ").replace(/\s+/g, " ").trim();
  const bag = (t) => {
    const m = new Map();
    for (const w of norm(t).split(" ")) if (w) m.set(w, (m.get(w) || 0) + 1);
    return m;
  };
  const same = (a, b) => a.size === b.size && [...a].every(([k, v]) => b.get(k) === v);
  const LANGS = ["ko","en","zh","ja","vi","th","ph","fr","es","pt","ar","ru","tr"];
  const ACC = { usage: "usageDetailBox", tips: "courseTipBox", gamasot: "gamasotDetailBox", ssam: "ssamDetailBox" };
  let n = 0;
  const check = (id, text) => {
    n++;
    const base = BASELINE[id];
    if (base == null) { errs.push(`${id}: 기준선 없음`); return; }
    if (!same(bag(text), bag(base))) errs.push(id);
  };
  for (const lang of LANGS) {
    document.querySelector(`[data-lang-code="${lang}"]`).click();
    for (const key of ["courseA", "courseB", "courseF"]) {
      check(`${key}|${lang}`, document.querySelector(`.course-card[data-course="${key}"] [data-lang="${lang}"]`).textContent);
    }
    check(`side|${lang}`, document.querySelector(`#sideList [data-lang="${lang}"]`).textContent);
    for (const [key, boxId] of Object.entries(ACC)) {
      document.querySelector(`.acc-head[data-content="${key}"]`).click();
      const p = document.querySelector(`#${boxId} p[data-lang="${lang}"]`);
      check(`${key}|${lang}`, p ? p.textContent : "");
    }
  }
  document.querySelector('[data-lang-code="ko"]').click();
  return errs.length
    ? `FAIL: ${errs.length}/${n} 불일치 — ${errs.slice(0, 8).join(", ")}`
    : `PASS (${n}블록 기준선과 일치)`;
})()
