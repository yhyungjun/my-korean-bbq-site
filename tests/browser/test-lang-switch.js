(() => {
  const errs = [];
  const LANGS = ["ko","en","zh","ja","vi","th","ph","fr","es","pt","ar","ru","tr"];
  const NAMES = { ko: "한국어", en: "English", zh: "中文", ja: "日本語", vi: "Tiếng Việt", th: "ไทย",
    ph: "Filipino", fr: "Français", es: "Español", pt: "Português", ar: "العربية", ru: "Русский", tr: "Türkçe" };
  // 열린 접이식 박스도 언어를 따라가야 한다
  document.querySelector('.acc-head[data-content="usage"]').click();
  for (const lang of LANGS) {
    document.querySelector(`[data-lang-code="${lang}"]`).click();
    if (document.documentElement.lang !== lang) errs.push(`${lang}: html lang 미적용`);
    const stray = [...document.querySelectorAll("[data-lang]")].filter((e) => !e.hidden && e.dataset.lang !== lang).length;
    if (stray) errs.push(`${lang}: 다른 언어 요소 ${stray}개 노출`);
    const hiddenOwn = [...document.querySelectorAll(`[data-lang="${lang}"]`)].filter((e) => e.hidden).length;
    if (hiddenOwn) errs.push(`${lang}: 자기 언어 요소 ${hiddenOwn}개 숨김`);
    const openP = document.querySelector('#usageDetailBox p[data-lang]:not([hidden])');
    if (!openP || openP.dataset.lang !== lang) errs.push(`${lang}: 열린 접이식 박스가 언어를 안 따라감`);
    const label = document.getElementById("topbarLangName").textContent;
    if (label !== NAMES[lang]) errs.push(`${lang}: 상단 바 라벨 '${label}'`);
  }
  // 아랍어: 가격이 제목의 왼쪽에 와야 한다 (RTL)
  document.querySelector('[data-lang-code="ar"]').click();
  const t = document.querySelector('.course-card [data-lang="ar"] .course-title').getBoundingClientRect();
  const p = document.querySelector('.course-card [data-lang="ar"] .course-price').getBoundingClientRect();
  if (!(p.left < t.left)) errs.push("아랍어에서 가격이 왼쪽에 오지 않음");
  if (document.documentElement.dir !== "rtl") errs.push("아랍어 dir=rtl 아님");
  document.querySelector('[data-lang-code="ko"]').click();
  return errs.length ? "FAIL: " + errs.slice(0, 6).join(" / ") : "PASS";
})()
