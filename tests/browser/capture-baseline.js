// 기준선 캡처 — 개편 후 화면 구조 기준 (코스 카드·사이드 표는 항상 렌더, 안내 4개는 접이식).
// 문구를 "일부러" 바꾼 뒤에만 tests/run.sh baseline 으로 실행한다.
(() => {
  const LANGS = ["ko","en","zh","ja","vi","th","ph","fr","es","pt","ar","ru","tr"];
  const ACC = { usage: "usageDetailBox", tips: "courseTipBox", gamasot: "gamasotDetailBox", ssam: "ssamDetailBox" };
  const norm = (t) => t.replace(/\s+/g, " ").trim();
  const out = {};
  const grab = (id, el) => {
    if (!el) throw new Error(`요소 없음: ${id}`); // 조용히 넘기지 말고 실패시킨다
    out[id] = norm(el.textContent);
  };
  for (const lang of LANGS) {
    document.querySelector(`[data-lang-code="${lang}"]`).click();
    for (const key of ["courseA", "courseB", "courseF"]) {
      grab(`${key}|${lang}`, document.querySelector(`.course-card[data-course="${key}"] [data-lang="${lang}"]`));
    }
    grab(`side|${lang}`, document.querySelector(`#sideList [data-lang="${lang}"]`));
    for (const [key, boxId] of Object.entries(ACC)) {
      document.querySelector(`.acc-head[data-content="${key}"]`).click();
      grab(`${key}|${lang}`, document.querySelector(`#${boxId} p[data-lang="${lang}"]`));
    }
  }
  return JSON.stringify(out);
})()
