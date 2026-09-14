// content.js 의 HTML 블록을 카드/가격표 DOM 으로 자른다. 문구는 손대지 않는다.
//
// 코스 블록 뼈대:  <span class="menu-subtitle">제목</span> 가격줄 <br> 구성…
// 사이드 블록 뼈대: <span class="menu-subtitle">…</span><br> 이름 (설명) 가격<br> …
import { CONTENT, LANGS } from "./content.js";
import { fillPrices } from "./prices.js";

const SEPARATOR_TEXT = " · "; // "+" 구분자를 이걸로 바꾼다 (기준선 대조 때 +·는 무시)

function toFragment(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
}

const isBr = (n) => n.nodeType === Node.ELEMENT_NODE && n.tagName === "BR";
const isBlankText = (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim() === "";

function el(tag, className, children = []) {
  const node = document.createElement(tag);
  node.className = className;
  children.forEach((c) => node.appendChild(c));
  return node;
}

/** 코스 블록 → { title, priceLine[], body[] }. 뼈대가 다르면 null. */
export function splitCourseBlock(html) {
  const frag = toFragment(html);
  const title = frag.querySelector(".menu-subtitle");
  if (!title) return null;
  title.remove();
  const nodes = [...frag.childNodes];
  const br = nodes.findIndex(isBr);
  if (br === -1) return null;
  return { title, priceLine: nodes.slice(0, br), body: nodes.slice(br + 1) };
}

/** 사이드 블록 → [{ name[], price[] }, …] (제목 줄 제외, 빈 줄 제외) */
export function splitSideBlock(html) {
  const frag = toFragment(html);
  frag.querySelector(".menu-subtitle")?.remove();
  const lines = [[]];
  for (const n of [...frag.childNodes]) {
    if (isBr(n)) lines.push([]);
    else lines[lines.length - 1].push(n);
  }
  return lines
    .filter((nodes) => nodes.some((n) => !isBlankText(n)))
    .map((nodes) => {
      const i = nodes.findIndex((n) => n.nodeType === Node.ELEMENT_NODE && n.classList.contains("price"));
      // 가격 뒤에 붙는 꼬리말("per person")은 가격 칸에 함께 둔다
      return i === -1 ? { name: nodes, price: [] } : { name: nodes.slice(0, i), price: nodes.slice(i) };
    });
}

function markSeparators(root) {
  root.querySelectorAll("span.small-note").forEach((s) => {
    if (s.textContent.trim() === "+") {
      s.className = "sep";
      s.textContent = SEPARATOR_TEXT;
    }
  });
}

/**
 * 코스 카드 한 장. 13개 언어 pane 을 모두 넣고 현재 언어만 보인다.
 * @param {string} contentKey  "courseA" | "courseB" | "courseF"
 * @param {string} currentLang
 * @param {{icon?: string, featured?: boolean, chips?: string[]}} options
 */
export function buildCourseCard(contentKey, currentLang, { icon = "", featured = false, chips = [] } = {}) {
  const card = el("article", featured ? "course-card is-featured" : "course-card");
  card.dataset.course = contentKey;

  for (const lang of LANGS) {
    const pane = el("div", "course-pane");
    pane.dataset.lang = lang;
    pane.hidden = lang !== currentLang;
    const raw = CONTENT[contentKey]?.[lang];

    if (raw == null) {
      console.warn(`[render] 콘텐츠 없음: ${contentKey}/${lang}`);
    } else {
      const html = fillPrices(raw, lang);
      const parts = splitCourseBlock(html);
      if (!parts) {
        console.warn(`[render] 뼈대 불일치, 통째로 표시: ${contentKey}/${lang}`);
        pane.innerHTML = html;
      } else {
        const title = el("div", "course-title", [parts.title]);
        if (icon) title.dataset.icon = icon; // CSS ::before 로 그린다 (textContent 에 안 들어감)
        const head = el("div", "course-head", [title, el("div", "course-price", parts.priceLine)]);
        const body = el("div", "course-body", parts.body);
        markSeparators(body);
        pane.append(head, body);
      }
    }
    card.appendChild(pane);
  }

  if (chips.length) {
    const row = el("div", "course-chips");
    row.setAttribute("aria-hidden", "true"); // 본문에 이미 글로 있는 정보의 시각 강조일 뿐
    chips.forEach((c) => {
      const chip = el("span", "chip");
      chip.textContent = c;
      row.appendChild(chip);
    });
    card.appendChild(row);
  }
  return card;
}

/** 사이드 가격표. 13개 언어 pane, 현재 언어만 보인다. */
export function buildSideList(currentLang) {
  const list = el("div", "side-list");
  for (const lang of LANGS) {
    const pane = el("div", "side-pane");
    pane.dataset.lang = lang;
    pane.hidden = lang !== currentLang;
    const raw = CONTENT.side?.[lang];
    if (raw == null) {
      console.warn(`[render] 콘텐츠 없음: side/${lang}`);
    } else {
      for (const row of splitSideBlock(fillPrices(raw, lang))) {
        pane.appendChild(el("div", "side-row", [el("div", "side-name", row.name), el("div", "side-price", row.price)]));
      }
    }
    list.appendChild(pane);
  }
  return list;
}
