(() => {
  const errs = [];
  const need = (sel, n, label) => {
    const c = document.querySelectorAll(sel).length;
    if (c !== n) errs.push(`${label}: ${c}개 (기대 ${n})`);
  };
  need("header.topbar", 1, "상단 바");
  need(".topbar-brand [data-lang]", 13, "상단 바 매장명");
  need("#topbarLangName", 1, "언어 버튼 이름");
  need(".bell [data-lang]", 13, "벨 안내");
  need("#menuTitle [data-lang]", 13, "코스 제목");
  need("#courseCards", 1, "코스 컨테이너");
  need("#sideTitle [data-lang]", 13, "사이드 제목");
  need("#sideList", 1, "사이드 컨테이너");
  need(".acc-head", 4, "접이식 헤더");
  need(".acc-head [data-lang]", 52, "접이식 라벨");
  need("section.hero", 0, "히어로(삭제돼야 함)");
  need(".footer-branches", 0, "푸터 지점 링크 행(삭제돼야 함)");
  need("footer .tagline [data-lang]", 13, "푸터 슬로건");
  need("footer .footer-brand [data-lang]", 13, "푸터 ©");
  need("footer .store-info .store", 3, "지점 카드");
  need("#langModal [data-lang-code]", 13, "언어 모달 버튼");
  return errs.length ? "FAIL: " + errs.join(" / ") : "PASS";
})()
