(() => {
  const errs = [];
  const H = window.innerHeight;
  const bottom = (sel) => {
    const el = document.querySelector(sel);
    return el ? el.getBoundingClientRect().bottom : Infinity;
  };
  document.querySelector('[data-lang-code="ko"]').click();
  window.scrollTo(0, 0);
  if (bottom('.course-card[data-course="courseA"] .course-price') > H) errs.push("A코스 가격이 첫 화면 밖");
  if (bottom('.course-card[data-course="courseF"] .course-price') > H * 1.5) errs.push("Full 가격이 한 화면 반 밖");
  if (bottom("#sideList .side-row") > H * 1.5) errs.push("사이드 첫 항목이 한 화면 반 밖");
  if (getComputedStyle(document.querySelector(".bell")).display === "none") errs.push("벨 안내 안 보임");
  return errs.length ? `FAIL(${window.innerWidth}x${H}): ` + errs.join(" / ") : "PASS";
})()
