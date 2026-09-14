// 가격 단일 원본 (Single Source of Truth)
//
// ▸ 가격을 바꾸려면 아래 PRICES 숫자 하나만 고치면 13개 언어에 모두 반영됩니다.
// ▸ 쉼표 없이 숫자만 적으세요.  17900  (O)   17,900원  (X)

export const PRICES = {
  // 무한리필 코스 (1인)
  courseA: 17900,
  courseB: 19900,
  courseF: 23900,

  // 사이드 메뉴
  naengmyeon: 5000, // 함흥냉면
  rice: 1000, // 공기밥
  drinkCan: 2500, // 캔음료
  drinkUnlimited: 2500, // 음료 무제한 (1인)
  ramen: 2000, // 한강라면
  jjigae: 3000, // 된장찌개
  soju: 5500, // 소주
  beer: 6000, // 맥주
  cheongha: 6500, // 청하 / 과일소주
};

// 세 자리마다 구분자를 넣는다. group(17900, ',') -> "17,900"
const group = (n, separator) =>
  String(n).replace(/\B(?=(\d{3})+(?!\d))/g, separator);

// 언어별 통화 표기 규칙.
// 원본에 en/es/vi 세 언어가 한 언어 안에서 표기가 뒤섞여 있어 각 언어권 관례로 통일했다.
const FORMATTERS = {
  ko: (n) => `${group(n, ",")}원`,
  en: (n) => `₩${group(n, ",")}`,
  zh: (n) => `${group(n, ",")}韩元`,
  ja: (n) => `${group(n, ",")}ウォン`,
  vi: (n) => `${group(n, ".")} KRW`,
  th: (n) => `${group(n, ",")} วอน`,
  ph: (n) => `₩${group(n, ",")}`,
  fr: (n) => `${group(n, " ")}₩`,
  es: (n) => `₩${group(n, ".")}`,
  pt: (n) => `₩${group(n, ".")}`,
  ar: (n) => `${group(n, ",")}₩`,
  ru: (n) => `${group(n, ",")}₩`,
  tr: (n) => `₩${group(n, ".")}`,
};

const FALLBACK_LANG = "ko";
const PRICE_TOKEN = /\{\{(\w+)\}\}/g;

export function formatPrice(amount, lang) {
  const format = FORMATTERS[lang] || FORMATTERS[FALLBACK_LANG];
  return format(amount);
}

// content.js 의 {{courseA}} 토큰을 해당 언어 표기로 치환한다.
export function fillPrices(html, lang) {
  return html.replace(PRICE_TOKEN, (token, key) => {
    if (!(key in PRICES)) {
      // 조용히 넘기면 잘못된 가격이 손님에게 그대로 보인다. 눈에 띄게 남긴다.
      console.error(`[prices] 알 수 없는 가격 키: ${key} — js/prices.js 를 확인하세요.`);
      return token;
    }
    return formatPrice(PRICES[key], lang);
  });
}
