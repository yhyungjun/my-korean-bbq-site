(() => {
  const errs = [];
  const cards = document.querySelectorAll("#courseCards article.course-card");
  if (cards.length !== 3) return `FAIL: 카드 ${cards.length}개 (기대 3)`;
  for (const card of cards) {
    const key = card.dataset.course;
    const panes = card.querySelectorAll(":scope > [data-lang]");
    if (panes.length !== 13) errs.push(`${key}: pane ${panes.length}개`);
    const visible = [...panes].filter((p) => !p.hidden);
    if (visible.length !== 1) errs.push(`${key}: 보이는 pane ${visible.length}개`);
    for (const p of panes) {
      const id = `${key}/${p.dataset.lang}`;
      if (!p.querySelector(".course-title .menu-subtitle")) errs.push(`${id}: 제목 없음`);
      if (!p.querySelector(".course-price .price")?.textContent.trim()) errs.push(`${id}: 가격 없음`);
      if (!p.querySelector(".course-body")) errs.push(`${id}: 본문 없음`);
      if (/\{\{/.test(p.textContent)) errs.push(`${id}: 가격 토큰 미치환`);
      if ([...p.querySelectorAll(".course-body span.small-note")].some((s) => s.textContent.trim() === "+")) errs.push(`${id}: + 구분자 미처리`);
    }
  }
  if (!document.querySelector('.course-card[data-course="courseF"].is-featured')) errs.push("Full 카드 강조 없음");
  if (document.querySelector(".course-chips, .course-title[data-icon]")) errs.push("이모지 칩/아이콘이 남아 있음 (제거 결정)");
  return errs.length ? "FAIL: " + errs.slice(0, 6).join(" / ") : "PASS";
})()
