(() => {
  const errs = [];
  const heads = [...document.querySelectorAll(".acc-head")];
  if (heads.length !== 4) return `FAIL: 헤더 ${heads.length}개`;
  const boxOf = (h) => document.getElementById(h.dataset.target);
  if (heads.some((h) => h.tagName !== "BUTTON")) errs.push("헤더가 button 이 아님 (키보드 불가)");

  heads[0].click();
  if (heads[0].getAttribute("aria-expanded") !== "true") errs.push("열었는데 aria-expanded=true 아님");
  if (boxOf(heads[0]).hidden || !boxOf(heads[0]).classList.contains("is-open")) errs.push("1번 박스가 안 열림");
  if (!boxOf(heads[0]).querySelector("p[data-lang]:not([hidden])")) errs.push("1번 박스에 보이는 문단 없음");

  heads[1].click();
  if (boxOf(heads[0]).classList.contains("is-open")) errs.push("2번을 열었는데 1번이 안 닫힘");
  if (heads[0].getAttribute("aria-expanded") !== "false") errs.push("닫혔는데 aria-expanded=false 아님");
  if (!boxOf(heads[1]).classList.contains("is-open")) errs.push("2번 박스가 안 열림");

  heads[1].click();
  if (boxOf(heads[1]).classList.contains("is-open")) errs.push("같은 헤더를 다시 눌렀는데 안 닫힘");
  return errs.length ? "FAIL: " + errs.join(" / ") : "PASS";
})()
