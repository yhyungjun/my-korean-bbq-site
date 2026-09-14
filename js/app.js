import { CONTENT, LANGS } from "./content.js";
import { fillPrices } from "./prices.js";

const DEFAULT_LANG = "ko";
const STORAGE_KEY = "kbbq.lang";
const RTL_LANGS = ["ar"];
const SCROLL_OFFSET_PX = 80;
const FADE_OUT_MS = 300;

const CLOSE_LABELS = {
  ko: "닫기", en: "Close", zh: "关闭", ja: "閉じる", vi: "Đóng", th: "ปิด",
  ph: "Isara", fr: "Fermer", es: "Cerrar", pt: "Fechar", ar: "إغلاق",
  ru: "Закрыть", tr: "Kapat",
};

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// ─────────────────────────── 언어 저장 (localStorage 차단 환경 대비) ──────────

function readSavedLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return LANGS.includes(saved) ? saved : null;
  } catch {
    return null; // 시크릿 모드 등에서 접근이 막히면 저장 없이 동작한다.
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

  // 상세박스 안 문단도 showOnlyLang 이 함께 처리한다. 닫기 버튼 라벨만 따로 갱신.
  const closeLabel = CLOSE_LABELS[lang] || CLOSE_LABELS[DEFAULT_LANG];
  document.querySelectorAll(".detail-box .close-btn").forEach((btn) => {
    btn.setAttribute("aria-label", closeLabel);
  });
}

function revealPage() {
  document.body.classList.remove("hidden-body");
  document.body.classList.add("fade-in");
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

  // 언어를 고르지 않고 닫아도 본문은 반드시 보여야 한다.
  // (이 한 줄이 빠져 있어서 ✕ 를 누르면 페이지가 빈 화면이 됐다.)
  revealPage();

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

// ─────────────────────────── 상세박스 (7개 공통) ─────────────────────────────

function renderDetail(contentKey, boxId, lang) {
  const section = CONTENT[contentKey];
  if (!section) {
    console.error(`[app] 콘텐츠를 찾을 수 없습니다: ${contentKey}`);
    return "";
  }

  const label = CLOSE_LABELS[lang] || CLOSE_LABELS[DEFAULT_LANG];
  const header =
    `<div class="detail-header">` +
    `<button type="button" class="close-btn" data-action="close-detail"` +
    ` data-target="${boxId}" aria-label="${label}">✕</button>` +
    `</div>`;

  // 13개 언어를 모두 넣고 현재 언어만 보여준다. 각 블록의 가격은 그 언어 표기로 채운다.
  const paragraphs = LANGS.map(
    (code) =>
      `<p data-lang="${code}"${code === lang ? "" : " hidden"}>` +
      fillPrices(section[code], code) +
      `</p>`
  ).join("");

  return header + paragraphs;
}

function closeDetail(boxId) {
  const box = document.getElementById(boxId);
  if (!box) return;
  box.classList.remove("show");
  box.classList.remove("is-open");
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

  // 이미 열려 있던 같은 박스를 다시 누르면 토글로 닫는다.
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
  box.innerHTML = renderDetail(contentKey, boxId, lang);
  box.hidden = false;
  box.classList.add("is-open");

  // display 반영 후 다음 프레임에 show 를 붙여야 페이드인이 실제로 동작한다.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      box.classList.add("show");
      scrollToElement(box);
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
  "close-detail": (el) => closeDetail(el.dataset.target),
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
  if (saved) {
    applyLang(saved); // 재방문: 고른 언어로 바로 보여준다.
    revealPage();
  } else {
    applyLang(DEFAULT_LANG);
    document.body.classList.add("hidden-body");
    openLangModal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
