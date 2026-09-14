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
