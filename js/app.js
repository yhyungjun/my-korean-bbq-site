import { LANGS, LANG_NAMES, CONTENT } from "./content.js";
import { fillPrices } from "./prices.js";
import { buildCourseCard, buildSideList } from "./render.js";

const DEFAULT_LANG = "ko";
const STORAGE_KEY = "kbbq.lang";
const RTL_LANGS = ["ar"];
const SCROLL_OFFSET_PX = 80;
const FADE_OUT_MS = 300;

// 첫 화면에 항상 펼쳐 두는 코스 카드. 이모지는 언어와 무관한 시각 앵커.
const COURSES = [
  { key: "courseA", icon: "🥩" },
  { key: "courseB", icon: "🥩" },
  { key: "courseF", icon: "🥩", featured: true, chips: ["🍗", "🥤", "🍚", "🍜"] },
];

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// ─────────────────────────── 언어 저장 (localStorage 차단 환경 대비) ──────────

function readSavedLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return LANGS.includes(saved) ? saved : null;
  } catch {
    return null;
  }
}

function saveLang(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* 저장 실패는 치명적이지 않다 — 이번 방문에만 적용된다. */
  }
}

// ─────────────────────────── 언어 적용 ───────────────────────────────────────

function showOnlyLang(root, lang) {
  root.querySelectorAll("[data-lang]").forEach((el) => {
    el.hidden = el.dataset.lang !== lang;
  });
}

function currentLang() {
  const lang = document.documentElement.lang;
  return LANGS.includes(lang) ? lang : DEFAULT_LANG;
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";

  showOnlyLang(document, lang);

  document.querySelectorAll("[data-lang-code]").forEach((btn) => {
    btn.classList.toggle("active-lang", btn.dataset.langCode === lang);
    btn.setAttribute("aria-pressed", String(btn.dataset.langCode === lang));
  });

  const topbarName = document.getElementById("topbarLangName");
  if (topbarName) topbarName.textContent = LANG_NAMES[lang] || lang;
}

// ─────────────────────────── 첫 화면 메뉴 렌더 ─────────────────────────────

function renderMenu(lang) {
  const cards = document.getElementById("courseCards");
  const side = document.getElementById("sideList");
  if (!cards || !side) {
    console.error("[app] #courseCards / #sideList 가 index.html 에 없습니다.");
    return;
  }
  cards.replaceChildren(...COURSES.map((c) => buildCourseCard(c.key, lang, c)));
  side.replaceChildren(buildSideList(lang));
}

// ─────────────────────────── 언어 선택 모달 ──────────────────────────────────

const modal = () => document.getElementById("langModal");
let lastFocusedBeforeModal = null;

function openLangModal() {
  const el = modal();
  if (!el) return;
  lastFocusedBeforeModal = document.activeElement;
  el.classList.add("open");
  el.hidden = false;
  document.body.classList.add("scroll-locked");
  const first = el.querySelector(FOCUSABLE);
  if (first) first.focus();
}

function closeLangModal() {
  const el = modal();
  if (!el) return;
  el.classList.remove("open");
  el.hidden = true;
  document.body.classList.remove("scroll-locked");
  if (lastFocusedBeforeModal instanceof HTMLElement) lastFocusedBeforeModal.focus();
}

function trapFocus(event) {
  const el = modal();
  if (!el || el.hidden || event.key !== "Tab") return;
  const items = [...el.querySelectorAll(FOCUSABLE)].filter((n) => !n.hidden);
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function selectLang(lang) {
  if (!LANGS.includes(lang)) return;
  applyLang(lang);
  saveLang(lang);
  closeLangModal();
}

// ─────────────────────────── 접이식 안내 (상세박스 4개) ────────────────────

// 13개 언어 문단을 모두 넣고 현재 언어만 보인다. 닫기는 접이식 헤더가 맡는다.
function renderDetail(contentKey, lang) {
  const section = CONTENT[contentKey];
  if (!section) {
    console.error(`[app] 콘텐츠를 찾을 수 없습니다: ${contentKey}`);
    return "";
  }
  return LANGS.map(
    (code) =>
      `<p data-lang="${code}"${code === lang ? "" : " hidden"}>` +
      fillPrices(section[code], code) +
      `</p>`
  ).join("");
}

function setExpanded(boxId, expanded) {
  document
    .querySelectorAll(`[data-action="detail"][data-target="${boxId}"]`)
    .forEach((btn) => btn.setAttribute("aria-expanded", String(expanded)));
}

function closeDetail(boxId) {
  const box = document.getElementById(boxId);
  if (!box) return;
  box.classList.remove("show");
  box.classList.remove("is-open");
  setExpanded(boxId, false);
  window.setTimeout(() => {
    if (!box.classList.contains("is-open")) box.hidden = true;
  }, FADE_OUT_MS);
}

function openDetail(boxId, contentKey) {
  const box = document.getElementById(boxId);
  if (!box) {
    console.error(`[app] 상세박스를 찾을 수 없습니다: ${boxId}`);
    return;
  }
  // 열려 있는 박스를 다시 누르면 닫는다.
  if (box.classList.contains("is-open") && box.dataset.content === contentKey) {
    closeDetail(boxId);
    return;
  }
  // 한 번에 하나만 열린다.
  document.querySelectorAll(".detail-box.is-open").forEach((other) => {
    if (other.id !== boxId) closeDetail(other.id);
  });

  const lang = currentLang();
  box.dataset.content = contentKey;
  box.innerHTML = renderDetail(contentKey, lang);
  box.hidden = false;
  box.classList.add("is-open");
  setExpanded(boxId, true);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      box.classList.add("show");
      // 헤더까지 보이도록 접이식 래퍼로 스크롤한다 (고정 바 52px 아래에 헤더가 오게)
      scrollToElement(box.closest(".acc") || box);
    });
  });
}

function scrollToElement(el) {
  const top = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET_PX;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─────────────────────────── 이벤트 (위임) ──────────────────────────────────

const ACTIONS = {
  "open-lang": openLangModal,
  "close-lang": closeLangModal,
  lang: (el) => selectLang(el.dataset.langCode),
  detail: (el) => openDetail(el.dataset.target, el.dataset.content),
};

function onClick(event) {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;
  const handler = ACTIONS[trigger.dataset.action];
  if (handler) handler(trigger);
}

function onKeydown(event) {
  const el = modal();
  if (el && !el.hidden) {
    if (event.key === "Escape") closeLangModal();
    else trapFocus(event);
  }
}

function onBackdropClick(event) {
  if (event.target === modal()) closeLangModal();
}

function init() {
  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKeydown);
  modal()?.addEventListener("click", onBackdropClick);

  const saved = readSavedLang();
  const startLang = saved || DEFAULT_LANG;
  renderMenu(startLang);
  applyLang(startLang);
  document.body.classList.add("fade-in");

  // 첫 방문: 본문(한국어)은 그대로 두고 모달만 위에 띄운다.
  if (!saved) openLangModal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
