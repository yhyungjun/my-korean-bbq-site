// 상세박스 문구 원본 (13개 언어)
//
// ▸ 문구만 고치세요. 가격 숫자는 여기 없습니다 — js/prices.js 의 PRICES 한 곳에서 관리합니다.
// ▸ {{courseA}} 같은 표시는 가격 자리입니다. 지우지 마세요.
//   렌더링할 때 언어별 표기(17,900원 / ₩17,900 / 17.900 KRW ...)로 자동 치환됩니다.

export const LANGS = ["ko", "en", "zh", "ja", "vi", "th", "ph", "fr", "es", "pt", "ar", "ru", "tr"];

export const LANG_NAMES = {
  "ko": "한국어",
  "en": "English",
  "zh": "中文",
  "ja": "日本語",
  "vi": "Tiếng Việt",
  "th": "ไทย",
  "ph": "Filipino",
  "fr": "Français",
  "es": "Español",
  "pt": "Português",
  "ar": "العربية",
  "ru": "Русский",
  "tr": "Türkçe"
};

export const CONTENT = {

  // ───────── A코스 ─────────
  courseA: {
    ko: `  <span class="menu-subtitle"><strong class="course-label">A</strong>돼지모듬 무한리필</span> 
  1인 <span class="price">{{courseA}}</span><br>
  돼지모듬<span class="small-note">(삼겹살/목살/항정살/갈매기살/우삼겹/대패삼겹살)</span><span class="small-note">+</span>벌집껍데기<span class="small-note">+</span>돼지불고기<span class="small-note">+</span>소막창<span class="small-note">+</span>모듬야채쌈`,
    en: `  <span class="menu-subtitle"><strong class="course-label">A</strong>Pork Assortment Unlimited Refill</span>
  <span class="price">{{courseA}}</span> per person<br>
  Pork assortment <span class="small-note">(Pork belly/Pork neck/Pork jowl/Skirt meat/Beef brisket/Thin-sliced pork belly)</span><span class="small-note">+</span>Honeycomb pork skin<span class="small-note">+</span>Pork bulgogi<span class="small-note">+</span>Beef tripe<span class="small-note">+</span>Assorted vegetable wraps`,
    zh: `  <span class="menu-subtitle"><strong class="course-label">A</strong>猪肉拼盘 无限续</span>
  每人 <span class="price">{{courseA}}</span><br>
  猪肉拼盘<span class="small-note">(五花肉/梅花肉/猪颊肉/横膈肌肉/牛胸肉/薄切五花肉)</span><span class="small-note">+</span>蜂窝猪皮<span class="small-note">+</span>猪肉烤肉<span class="small-note">+</span>牛皱胃<span class="small-note">+</span>综合蔬菜包`,
    ja: `  <span class="menu-subtitle"><strong class="course-label">A</strong>豚盛り合わせ 無限リフィル</span>
  1人 <span class="price">{{courseA}}</span><br>
  豚盛り合わせ<span class="small-note">(サムギョプサル/モクサル/豚トロ/カルメギサル/ウサムギョプ/薄切りサムギョプサル)</span><span class="small-note">+</span>豚皮（ハチの巣）<span class="small-note">+</span>豚プルコギ<span class="small-note">+</span>ギアラ<span class="small-note">+</span>野菜サム`,
    vi: `  <span class="menu-subtitle"><strong class="course-label">A</strong>Suất Buffet Thịt Heo Không Giới Hạn</span>
  <span class="price">{{courseA}}</span>/người<br>
  Thịt heo tổng hợp <span class="small-note">(Ba chỉ/Cổ/Thịt má/Sườn ngoài/Ức bò/Ba chỉ thái mỏng)</span><span class="small-note">+</span>Da heo tổ ong<span class="small-note">+</span>Bulgogi heo<span class="small-note">+</span>Sách bò<span class="small-note">+</span>Rau cuốn`,
    th: `  <span class="menu-subtitle"><strong class="course-label">A</strong>เซ็ตหมูรวมเติมไม่อั้น</span>
  คนละ <span class="price">{{courseA}}</span><br>
  หมูรวม<span class="small-note">(หมูสามชั้น/คอหมู/แก้มหมู/เนื้อส่วนท้อง/เนื้ออกวัว/หมูสามชั้นบาง)</span><span class="small-note">+</span>หนังหมูรังผึ้ง<span class="small-note">+</span>หมูบูลโกกิ<span class="small-note">+</span>ผ้าขี้ริ้ว<span class="small-note">+</span>ผักห่อ`,
    ph: `  <span class="menu-subtitle"><strong class="course-label">A</strong>Unlimited Pork Set</span>
  <span class="price">{{courseA}}</span> bawat tao<br>
  Mixed pork <span class="small-note">(Pork belly/Pork neck/Pork jowl/Skirt meat/Beef brisket/Thin-sliced pork belly)</span><span class="small-note">+</span>Pork skin<span class="small-note">+</span>Pork bulgogi<span class="small-note">+</span>Beef tripe<span class="small-note">+</span>Vegetable wraps`,
    fr: `  <span class="menu-subtitle"><strong class="course-label">A</strong>Assortiment de Porc à volonté</span>
  <span class="price">{{courseA}}</span> par personne<br>
  Assortiment de porc <span class="small-note">(Poitrine/Échine/Joue/Hampe/Poitrine de bœuf/Poitrine fine)</span><span class="small-note">+</span>Couenne en nid d’abeille<span class="small-note">+</span>Bulgogi de porc<span class="small-note">+</span>Caillette de bœuf<span class="small-note">+</span>Légumes`,
    es: `  <span class="menu-subtitle"><strong class="course-label">A</strong>Surtido de Cerdo Ilimitado</span>
  <span class="price">{{courseA}}</span> por persona<br>
  Surtido de cerdo <span class="small-note">(Panceta/Cuello/Papada/Falda/Pecho de res/Panceta fina)</span><span class="small-note">+</span>Piel de cerdo panal<span class="small-note">+</span>Bulgogi de cerdo<span class="small-note">+</span>Callos de res<span class="small-note">+</span>Verduras mixtas`,
    pt: `  <span class="menu-subtitle"><strong class="course-label">A</strong>Rodízio de Porco Variado</span>
  <span class="price">{{courseA}}</span> por pessoa<br>
  Misto de porco <span class="small-note">(Barriga/Pescoço/Bochecha/Fraldinha/Peito bovino/Panceta fina)</span><span class="small-note">+</span>Pele de porco favo<span class="small-note">+</span>Bulgogi de porco<span class="small-note">+</span>Tripa bovina<span class="small-note">+</span>Legumes variados`,
    ar: `  <span class="menu-subtitle"><strong class="course-label">A</strong>تشكيلة لحم خنزير غير محدودة</span>
  <span class="price">{{courseA}}</span> للشخص<br>
  مجموعة لحم خنزير <span class="small-note">(بطن/رقبة/خدود/حجاب حاجز/صدر بقر/بطن رفيع)</span><span class="small-note">+</span>جلد خنزير مشبك<span class="small-note">+</span>بولغوغي<span class="small-note">+</span>كرشة البقر<span class="small-note">+</span>خضروات مشكلة`,
    ru: `  <span class="menu-subtitle"><strong class="course-label">A</strong>Ассорти из свинины безлимит</span>
  <span class="price">{{courseA}}</span> за человека<br>
  Ассорти из свинины <span class="small-note">(Самгёпсаль/Шея/Щёки/Диафрагма/Грудинка/Тонкий самгёпсаль)</span><span class="small-note">+</span>Свиная кожа<span class="small-note">+</span>Булгоги<span class="small-note">+</span>Сычуг<span class="small-note">+</span>Овощи`,
    tr: `  <span class="menu-subtitle"><strong class="course-label">A</strong>Domuz Karışık Sınırsız</span>
  Kişi başı <span class="price">{{courseA}}</span><br>
  Domuz karışımı <span class="small-note">(Domuz göbeği/Boyun/Yanak eti/Diyafram eti/Dana göğüs/İnce karın)</span><span class="small-note">+</span>Domuz derisi<span class="small-note">+</span>Bulgogi<span class="small-note">+</span>İşkembe<span class="small-note">+</span>Sebzeler`,
  },

  // ───────── B코스 ─────────
  courseB: {
    ko: `  <span class="menu-subtitle"><strong class="course-label">B</strong>돼지모듬+간장순살치킨 무한리필</span>
  1인 <span class="price">{{courseB}}</span><br>
  돼지모듬<span class="small-note">(삼겹살/목살/항정살/갈매기살/우삼겹/대패삼겹살)</span><span class="small-note">+</span>간장순살치킨<span class="small-note">+</span>벌집껍데기<span class="small-note">+</span>돼지불고기<span class="small-note">+</span>소막창<span class="small-note">+</span>모듬야채쌈`,
    en: `  <span class="menu-subtitle"><strong class="course-label">B</strong>Pork Assortment + Soy Chicken Unlimited Refill</span>
  <span class="price">{{courseB}}</span> per person<br>
  Pork assortment <span class="small-note">(pork belly/pork neck/pork jowl/skirt meat/beef brisket/thin-sliced pork)</span><span class="small-note">+</span>Soy-marinated boneless chicken<span class="small-note">+</span>Honeycomb pork skin<span class="small-note">+</span>Pork bulgogi<span class="small-note">+</span>Beef tripe<span class="small-note">+</span>Vegetable wraps`,
    zh: `  <span class="menu-subtitle"><strong class="course-label">B</strong>猪肉拼盘+酱油鸡 无限续</span>
  每人 <span class="price">{{courseB}}</span><br>
  猪肉拼盘<span class="small-note">(五花肉/猪颈肉/猪颊肉/横膈膜/牛胸肉/薄切五花肉)</span><span class="small-note">+</span>酱油无骨鸡<span class="small-note">+</span>蜂窝猪皮<span class="small-note">+</span>猪肉烤肉<span class="small-note">+</span>牛皱胃<span class="small-note">+</span>蔬菜包`,
    ja: `  <span class="menu-subtitle"><strong class="course-label">B</strong>豚盛り合わせ+醤油チキン 無限リフィル</span>
  1人 <span class="price">{{courseB}}</span><br>
  豚盛り<span class="small-note">(サムギョプサル/豚肩ロース/豚トロ/ハラミ/牛バラ/薄切りサムギョプサル)</span><span class="small-note">+</span>醤油チキン（骨なし）<span class="small-note">+</span>豚皮（ハチの巣）<span class="small-note">+</span>豚プルコギ<span class="small-note">+</span>ギアラ<span class="small-note">+</span>野菜サム`,
    vi: `  <span class="menu-subtitle"><strong class="course-label">B</strong>Thịt Heo + Gà Xì Dầu Buffet Không Giới Hạn</span>
  <span class="price">{{courseB}}</span>/người<br>
  Thịt heo <span class="small-note">(ba chỉ/cổ/má/thăn sườn/ức bò/ba chỉ mỏng)</span><span class="small-note">+</span>Gà xì dầu không xương<span class="small-note">+</span>Da heo tổ ong<span class="small-note">+</span>Bulgogi heo<span class="small-note">+</span>Sách bò<span class="small-note">+</span>Rau cuốn`,
    th: `  <span class="menu-subtitle"><strong class="course-label">B</strong>หมูรวม + ไก่ซอสถั่วเหลือง เติมไม่อั้น</span>
  คนละ <span class="price">{{courseB}}</span><br>
  หมูรวม<span class="small-note">(หมูสามชั้น/คอหมู/แก้มหมู/เนื้อส่วนท้อง/เนื้ออกวัว/หมูสามชั้นบาง)</span><span class="small-note">+</span>ไก่ไม่มีกระดูกซอสซีอิ๊ว<span class="small-note">+</span>หนังหมู<span class="small-note">+</span>หมูบูลโกกิ<span class="small-note">+</span>ผ้าขี้ริ้ว<span class="small-note">+</span>ผักห่อ`,
    ph: `  <span class="menu-subtitle"><strong class="course-label">B</strong>Unlimited Pork + Soy Chicken Set</span>
  <span class="price">{{courseB}}</span> bawat tao<br>
  Pork set <span class="small-note">(belly/neck/jowl/skirt/brisket/thin-cut pork)</span><span class="small-note">+</span>Soy-marinated boneless chicken<span class="small-note">+</span>Pork skin<span class="small-note">+</span>Pork bulgogi<span class="small-note">+</span>Beef tripe<span class="small-note">+</span>Mixed vegetables`,
    fr: `  <span class="menu-subtitle"><strong class="course-label">B</strong>Assortiment Porc + Poulet soja à volonté</span>
  <span class="price">{{courseB}}</span> par personne<br>
  Porc <span class="small-note">(Poitrine/Échine/Joue/Hampe/Poitrine de bœuf/Poitrine fine)</span><span class="small-note">+</span>Poulet sans os sauce soja<span class="small-note">+</span>Couenne<span class="small-note">+</span>Bulgogi de porc<span class="small-note">+</span>Caillette<span class="small-note">+</span>Légumes`,
    es: `  <span class="menu-subtitle"><strong class="course-label">B</strong>Cerdo + Pollo soja Ilimitado</span>
  <span class="price">{{courseB}}</span> por persona<br>
  Cerdo <span class="small-note">(Panceta/Cuello/Papada/Falda/Pecho de res/Panceta fina)</span><span class="small-note">+</span>Pollo sin hueso con soja<span class="small-note">+</span>Piel de cerdo<span class="small-note">+</span>Bulgogi de cerdo<span class="small-note">+</span>Callos<span class="small-note">+</span>Verduras`,
    pt: `  <span class="menu-subtitle"><strong class="course-label">B</strong>Porco + Frango molho soja Rodízio</span>
  <span class="price">{{courseB}}</span> por pessoa<br>
  Porco <span class="small-note">(Barriga/Pescoço/Bochecha/Fraldinha/Peito bovino/Panceta fina)</span><span class="small-note">+</span>Frango sem osso ao molho de soja<span class="small-note">+</span>Pele<span class="small-note">+</span>Bulgogi de porco<span class="small-note">+</span>Tripa<span class="small-note">+</span>Legumes`,
    ar: `  <span class="menu-subtitle"><strong class="course-label">B</strong>لحم خنزير + دجاج صويا مفتوح</span>
  <span class="price">{{courseB}}</span> للشخص<br>
  لحم خنزير <span class="small-note">(بطن/رقبة/خدود/حجاب حاجز/صدر بقر/بطن رفيع)</span><span class="small-note">+</span>دجاج بدون عظم بصلصة الصويا<span class="small-note">+</span>جلد الخنزير<span class="small-note">+</span>بولغوجي خنزير<span class="small-note">+</span>كرشة<span class="small-note">+</span>خضروات`,
    ru: `  <span class="menu-subtitle"><strong class="course-label">B</strong>Свинина + Курица в соевом соусе, безлимит</span>
  <span class="price">{{courseB}}</span> за человека<br>
  Свинина <span class="small-note">(Самгёпсаль/Шея/Щёки/Диафрагма/Грудинка/Тонкий самгёпсаль)</span><span class="small-note">+</span>Курица в соевом соусе без костей<span class="small-note">+</span>Кожа свинины<span class="small-note">+</span>Булгоги<span class="small-note">+</span>Сычуг<span class="small-note">+</span>Овощи`,
    tr: `  <span class="menu-subtitle"><strong class="course-label">B</strong>Domuz + Soya Tavuk Sınırsız</span>
  Kişi başı <span class="price">{{courseB}}</span><br>
  Domuz <span class="small-note">(Domuz göbeği/Boyun/Yanak eti/Diyafram eti/Dana göğüs/İnce karın)</span><span class="small-note">+</span>Soya soslu kemiksiz tavuk<span class="small-note">+</span>Domuz derisi<span class="small-note">+</span>Bulgogi<span class="small-note">+</span>İşkembe<span class="small-note">+</span>Sebzeler`,
  },

  // ───────── Full코스 ─────────
  courseF: {
    ko: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> 돼지모듬+간장순살치킨 무한리필</span>
  1인 <span class="price">{{courseF}}</span><br>
  돼지모듬<span class="small-note">(삼겹살/목살/항정살/갈매기살/우삼겹/대패삼겹살)</span><span class="small-note">+</span>
  간장순살치킨<span class="small-note">+</span>벌집껍데기<span class="small-note">+</span>돼지불고기<span class="small-note">+</span>소막창<span class="small-note">+</span>모듬야채쌈<span class="small-note">+</span>
  음료수 <span class="unlimited">무제한</span><span class="small-note">+</span>공기밥 <span class="unlimited">무제한</span><span class="small-note">+</span>냉면 <span class="unlimited">무제한</span>`,
    en: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> Pork Assortment + Soy Chicken Unlimited</span>
  <span class="price">{{courseF}}</span> per person<br>
  Pork assortment <span class="small-note">(pork belly/pork neck/pork jowl/skirt meat/beef brisket/thin-sliced pork)</span><span class="small-note">+</span>
  Soy-marinated boneless chicken<span class="small-note">+</span>Honeycomb pork skin<span class="small-note">+</span>Pork bulgogi<span class="small-note">+</span>Beef tripe<span class="small-note">+</span>Vegetable wraps<span class="small-note">+</span>
  Drinks <span class="unlimited">Unlimited</span><span class="small-note">+</span>Rice <span class="unlimited">Unlimited</span><span class="small-note">+</span>Cold noodles <span class="unlimited">Unlimited</span>`,
    zh: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> 猪肉拼盘+酱油鸡 无限续</span>
  每人 <span class="price">{{courseF}}</span><br>
  猪肉拼盘<span class="small-note">(五花肉/猪颈肉/猪颊肉/横膈膜/牛胸肉/薄切五花肉)</span><span class="small-note">+</span>
  酱油无骨鸡<span class="small-note">+</span>蜂窝猪皮<span class="small-note">+</span>猪肉烤肉<span class="small-note">+</span>牛皱胃<span class="small-note">+</span>蔬菜包<span class="small-note">+</span>
  饮料<span class="unlimited">无限</span><span class="small-note">+</span>米饭<span class="unlimited">无限</span><span class="small-note">+</span>冷面<span class="unlimited">无限</span>`,
    ja: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> 豚盛り合わせ+醤油チキン 無限リフィル</span>
  1人 <span class="price">{{courseF}}</span><br>
  豚盛り<span class="small-note">(サムギョプサル/豚肩ロース/豚トロ/ハラミ/牛バラ/薄切りサムギョプサル)</span><span class="small-note">+</span>
  醤油チキン（骨なし）<span class="small-note">+</span>豚皮（ハチの巣）<span class="small-note">+</span>豚プルコギ<span class="small-note">+</span>ギアラ<span class="small-note">+</span>野菜サム<span class="small-note">+</span>
  ドリンク<span class="unlimited">飲み放題</span><span class="small-note">+</span>ごはん<span class="unlimited">おかわり自由</span><span class="small-note">+</span>冷麺<span class="unlimited">食べ放題</span>`,
    vi: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> Thịt Heo + Gà Xì Dầu Không Giới Hạn</span>
  <span class="price">{{courseF}}</span>/người<br>
  Thịt heo <span class="small-note">(ba chỉ/cổ/má/thăn sườn/ức bò/ba chỉ mỏng)</span><span class="small-note">+</span>
  Gà xì dầu không xương<span class="small-note">+</span>Da heo tổ ong<span class="small-note">+</span>Bulgogi heo<span class="small-note">+</span>Sách bò<span class="small-note">+</span>Rau cuốn<span class="small-note">+</span>
  Nước uống <span class="unlimited">không giới hạn</span><span class="small-note">+</span>Cơm <span class="unlimited">không giới hạn</span><span class="small-note">+</span>Mì lạnh <span class="unlimited">không giới hạn</span>`,
    th: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> หมูรวม + ไก่ซอสถั่วเหลือง เติมไม่อั้น</span>
  คนละ <span class="price">{{courseF}}</span><br>
  หมูรวม<span class="small-note">(หมูสามชั้น/คอหมู/แก้มหมู/เนื้อส่วนท้อง/เนื้ออกวัว/หมูสามชั้นบาง)</span><span class="small-note">+</span>
  ไก่ไม่มีกระดูกซอสซีอิ๊ว<span class="small-note">+</span>หนังหมู<span class="small-note">+</span>หมูบูลโกกิ<span class="small-note">+</span>ผ้าขี้ริ้ว<span class="small-note">+</span>ผักห่อ<span class="small-note">+</span>
  เครื่องดื่ม<span class="unlimited">ไม่จำกัด</span><span class="small-note">+</span>ข้าว<span class="unlimited">ไม่จำกัด</span><span class="small-note">+</span>บะหมี่เย็น<span class="unlimited">ไม่จำกัด</span>`,
    ph: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> Unlimited Pork + Soy Chicken Set</span>
  <span class="price">{{courseF}}</span> bawat tao<br>
  Pork set <span class="small-note">(belly/neck/jowl/skirt/brisket/thin-cut pork)</span><span class="small-note">+</span>
  Soy-marinated boneless chicken<span class="small-note">+</span>Pork skin<span class="small-note">+</span>Pork bulgogi<span class="small-note">+</span>Beef tripe<span class="small-note">+</span>Mixed vegetables<span class="small-note">+</span>
  Drinks <span class="unlimited">Unlimited</span><span class="small-note">+</span>Rice <span class="unlimited">Unlimited</span><span class="small-note">+</span>Cold noodles <span class="unlimited">Unlimited</span>`,
    fr: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> Assortiment Porc + Poulet soja à volonté</span>
  <span class="price">{{courseF}}</span> par personne<br>
  Porc <span class="small-note">(Poitrine/Échine/Joue/Hampe/Poitrine de bœuf/Poitrine fine)</span><span class="small-note">+</span>
  Poulet sans os sauce soja<span class="small-note">+</span>Couenne<span class="small-note">+</span>Bulgogi de porc<span class="small-note">+</span>Caillette<span class="small-note">+</span>Légumes<span class="small-note">+</span>
  Boissons <span class="unlimited">à volonté</span><span class="small-note">+</span>Riz <span class="unlimited">à volonté</span><span class="small-note">+</span>Nouilles froides <span class="unlimited">à volonté</span>`,
    es: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> Cerdo + Pollo soja Ilimitado</span>
  <span class="price">{{courseF}}</span> por persona<br>
  Cerdo <span class="small-note">(Panceta/Cuello/Papada/Falda/Pecho de res/Panceta fina)</span><span class="small-note">+</span>
  Pollo sin hueso con soja<span class="small-note">+</span>Piel de cerdo<span class="small-note">+</span>Bulgogi de cerdo<span class="small-note">+</span>Callos<span class="small-note">+</span>Verduras<span class="small-note">+</span>
  Bebidas <span class="unlimited">ilimitadas</span><span class="small-note">+</span>Arroz <span class="unlimited">ilimitado</span><span class="small-note">+</span>Fideos fríos <span class="unlimited">ilimitados</span>`,
    pt: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> Porco + Frango molho soja Rodízio</span>
  <span class="price">{{courseF}}</span> por pessoa<br>
  Porco <span class="small-note">(Barriga/Pescoço/Bochecha/Fraldinha/Peito bovino/Panceta fina)</span><span class="small-note">+</span>
  Frango sem osso ao molho de soja<span class="small-note">+</span>Pele<span class="small-note">+</span>Bulgogi de porco<span class="small-note">+</span>Tripa<span class="small-note">+</span>Legumes<span class="small-note">+</span>
  Bebidas <span class="unlimited">ilimitadas</span><span class="small-note">+</span>Arroz <span class="unlimited">ilimitado</span><span class="small-note">+</span>Macarrão frio <span class="unlimited">ilimitado</span>`,
    ar: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> لحم خنزير + دجاج صويا مفتوح</span>
  <span class="price">{{courseF}}</span> للشخص<br>
  لحم خنزير <span class="small-note">(بطن/رقبة/خدود/حجاب حاجز/صدر بقر/بطن رفيع)</span><span class="small-note">+</span>
  دجاج بدون عظم بصلصة الصويا<span class="small-note">+</span>جلد الخنزير<span class="small-note">+</span>بولغوجي خنزير<span class="small-note">+</span>كرشة<span class="small-note">+</span>خضروات<span class="small-note">+</span>
  مشروبات <span class="unlimited">غير محدودة</span><span class="small-note">+</span>أرز <span class="unlimited">غير محدود</span><span class="small-note">+</span>نودلز باردة <span class="unlimited">غير محدودة</span>`,
    ru: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> Свинина + Курица в соевом соусе, безлимит</span>
  <span class="price">{{courseF}}</span> за человека<br>
  Свинина <span class="small-note">(Самгёпсаль/Шея/Щёки/Диафрагма/Грудинка/Тонкий самгёпсаль)</span><span class="small-note">+</span>
  Курица в соевом соусе без костей<span class="small-note">+</span>Кожа свинины<span class="small-note">+</span>Булгоги<span class="small-note">+</span>Сычуг<span class="small-note">+</span>Овощи<span class="small-note">+</span>
  Напитки <span class="unlimited">безлимитно</span><span class="small-note">+</span>Рис <span class="unlimited">безлимитно</span><span class="small-note">+</span>Холодная лапша <span class="unlimited">безлимитно</span>`,
    tr: `  <span class="menu-subtitle"><strong class="course-label">Full</strong> Domuz + Soya Tavuk Sınırsız</span>
  Kişi başı <span class="price">{{courseF}}</span><br>
  Domuz <span class="small-note">(Domuz göbeği/Boyun/Yanak eti/Diyafram eti/Dana göğüs/İnce karın)</span><span class="small-note">+</span>
  Soya soslu kemiksiz tavuk<span class="small-note">+</span>Domuz derisi<span class="small-note">+</span>Bulgogi<span class="small-note">+</span>İşkembe<span class="small-note">+</span>Sebzeler<span class="small-note">+</span>
  İçecekler <span class="unlimited">sınırsız</span><span class="small-note">+</span>Pirinç <span class="unlimited">sınırsız</span><span class="small-note">+</span>Soğuk erişte <span class="unlimited">sınırsız</span>`,
  },

  // ───────── 사이드 메뉴 ─────────
  side: {
    ko: `      <span class="menu-subtitle">사이드메뉴</span><br>
      함흥냉면 <span class="small-note">(물냉면/비빔냉면)</span> <span class="price">{{naengmyeon}}</span><br>
      공기밥 <span class="small-note">(전인원 주문시 <span class="unlimited">무제한</span>)</span> <span class="price">{{rice}}</span><br>
      음료수 <span class="small-note">(캔음료)</span> <span class="price">{{drinkCan}}</span><br>
      음료수 <span class="unlimited">무제한</span> <span class="small-note">(전인원 주문 필요)</span> 1인 <span class="price">{{drinkUnlimited}}</span><br>
      한강라면 <span class="price">{{ramen}}</span><br>
      된장찌개 <span class="price">{{jjigae}}</span><br>
      소주 <span class="price">{{soju}}</span><br>
      맥주 <span class="price">{{beer}}</span><br>
      청하 / 과일소주 <span class="price">{{cheongha}}</span>
    `,
    en: `      <span class="menu-subtitle">Side Menu</span><br>
      Cold noodles <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> <span class="price">{{naengmyeon}}</span><br>
      White rice <span class="small-note">(<span class="unlimited">Unlimited</span> if ordered for all)</span> <span class="price">{{rice}}</span><br>
      Beverage <span class="small-note">(Canned drink)</span> <span class="price">{{drinkCan}}</span><br>
      <span class="unlimited">Unlimited</span> beverage <span class="small-note">(All must order)</span> <span class="price">{{drinkUnlimited}}</span> per person<br>
      Hangang ramen <span class="price">{{ramen}}</span><br>
      Doenjang stew <span class="price">{{jjigae}}</span><br>
      Soju <span class="price">{{soju}}</span><br>
      Beer <span class="price">{{beer}}</span><br>
      Cheongha / Fruit Soju <span class="price">{{cheongha}}</span>
    `,
    zh: `      <span class="menu-subtitle">配菜菜单</span><br>
      咸兴冷面 <span class="small-note">(水冷面/拌冷面)</span> <span class="price">{{naengmyeon}}</span><br>
      白米饭 <span class="small-note">(全员点单时<span class="unlimited">无限</span>续)</span> <span class="price">{{rice}}</span><br>
      饮料 <span class="small-note">(罐装)</span> <span class="price">{{drinkCan}}</span><br>
      饮料<span class="unlimited">无限</span> <span class="small-note">(需全员点单)</span> 每人 <span class="price">{{drinkUnlimited}}</span><br>
      汉江拉面 <span class="price">{{ramen}}</span><br>
      大酱汤 <span class="price">{{jjigae}}</span><br>
      烧酒 <span class="price">{{soju}}</span><br>
      啤酒 <span class="price">{{beer}}</span><br>
      清河 / 水果烧酒 <span class="price">{{cheongha}}</span>
    `,
    ja: `      <span class="menu-subtitle">サイドメニュー</span><br>
      咸興冷麺 <span class="small-note">(水冷麺/ビビン冷麺)</span> <span class="price">{{naengmyeon}}</span><br>
      白ご飯 <span class="small-note">(全員注文時<span class="unlimited">無制限</span>)</span> <span class="price">{{rice}}</span><br>
      飲み物 <span class="small-note">(缶ドリンク)</span> <span class="price">{{drinkCan}}</span><br>
      ドリンク<span class="unlimited">飲み放題</span> <span class="small-note">(全員注文必須)</span> 1人 <span class="price">{{drinkUnlimited}}</span><br>
      漢江ラーメン <span class="price">{{ramen}}</span><br>
      テンジャンチゲ <span class="price">{{jjigae}}</span><br>
      ソジュ <span class="price">{{soju}}</span><br>
      ビール <span class="price">{{beer}}</span><br>
      チョンハ / フルーツソジュ <span class="price">{{cheongha}}</span>
    `,
    vi: `      <span class="menu-subtitle">Thực đơn phụ</span><br>
      Mì lạnh <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> <span class="price">{{naengmyeon}}</span><br>
      Cơm trắng <span class="small-note">(khi gọi cho cả bàn <span class="unlimited">không giới hạn</span>)</span> <span class="price">{{rice}}</span><br>
      Nước giải khát <span class="small-note">(Lon)</span> <span class="price">{{drinkCan}}</span><br>
      Nước giải khát <span class="unlimited">không giới hạn</span> <span class="small-note">(Cả bàn phải gọi)</span> <span class="price">{{drinkUnlimited}}</span>/người<br>
      Mì ramen Hangang <span class="price">{{ramen}}</span><br>
      Canh tương đậu (Doenjang) <span class="price">{{jjigae}}</span><br>
      Soju <span class="price">{{soju}}</span><br>
      Bia <span class="price">{{beer}}</span><br>
      Cheongha / Soju hoa quả <span class="price">{{cheongha}}</span>
    `,
    th: `      <span class="menu-subtitle">เมนูข้างเคียง</span><br>
      บะหมี่เย็น <span class="price">{{naengmyeon}}</span><br>
      ข้าวเปล่า <span class="small-note">(ถ้าสั่งทั้งโต๊ะ<span class="unlimited">ไม่อั้น</span>)</span> <span class="price">{{rice}}</span><br>
      เครื่องดื่มกระป๋อง <span class="price">{{drinkCan}}</span><br>
      เครื่องดื่ม<span class="unlimited">ไม่อั้น</span> <span class="small-note">(สั่งทุกคน)</span> <span class="price">{{drinkUnlimited}}</span>/คน<br>
      ราเม็งฮันกัง <span class="price">{{ramen}}</span><br>
      ซุปเต้าเจี้ยว <span class="price">{{jjigae}}</span><br>
      โซจู <span class="price">{{soju}}</span><br>
      เบียร์ <span class="price">{{beer}}</span><br>
      ชองฮา / โซจูผลไม้ <span class="price">{{cheongha}}</span>
    `,
    ph: `      <span class="menu-subtitle">Side Menu</span><br>
      Hamheung cold noodles <span class="small-note">(spicy / mild)</span> <span class="price">{{naengmyeon}}</span><br>
      Steamed rice <span class="small-note">(<span class="unlimited">Unlimited</span> if everyone orders)</span> <span class="price">{{rice}}</span><br>
      Soft drink <span class="small-note">(can)</span> <span class="price">{{drinkCan}}</span><br>
      <span class="unlimited">Unlimited</span> drinks <span class="small-note">(requires all members)</span> <span class="price">{{drinkUnlimited}}</span> each<br>
      Hangang ramen <span class="price">{{ramen}}</span><br>
      Soybean stew <span class="price">{{jjigae}}</span><br>
      Soju <span class="price">{{soju}}</span><br>
      Beer <span class="price">{{beer}}</span><br>
      Cheongha / Fruit soju <span class="price">{{cheongha}}</span>
    `,
    fr: `      <span class="menu-subtitle">Menu d’accompagnement</span><br>
      Nouilles froides <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> <span class="price">{{naengmyeon}}</span><br>
      Riz blanc <span class="small-note">(<span class="unlimited">à volonté</span> si commandé pour tous)</span> <span class="price">{{rice}}</span><br>
      Boisson <span class="small-note">(canette)</span> <span class="price">{{drinkCan}}</span><br>
      Boissons <span class="unlimited">à volonté</span> <span class="small-note">(commande pour tous requise)</span> <span class="price">{{drinkUnlimited}}</span>/pers.<br>
      Ramen Hangang <span class="price">{{ramen}}</span><br>
      Ragoût de pâte de soja (Doenjang) <span class="price">{{jjigae}}</span><br>
      Soju <span class="price">{{soju}}</span><br>
      Bière <span class="price">{{beer}}</span><br>
      Cheongha / Soju fruité <span class="price">{{cheongha}}</span>
    `,
    es: `      <span class="menu-subtitle">Menú lateral</span><br>
      Fideos fríos <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> <span class="price">{{naengmyeon}}</span><br>
      Arroz blanco <span class="small-note">(para todos <span class="unlimited">sin límite</span>)</span> <span class="price">{{rice}}</span><br>
      Bebida <span class="small-note">(Lata)</span> <span class="price">{{drinkCan}}</span><br>
      Bebida <span class="unlimited">sin límite</span> <span class="small-note">(Todos deben pedir)</span> <span class="price">{{drinkUnlimited}}</span> por persona<br>
      Ramen Hangang <span class="price">{{ramen}}</span><br>
      Guiso de pasta de soja (Doenjang) <span class="price">{{jjigae}}</span><br>
      Soju <span class="price">{{soju}}</span><br>
      Cerveza <span class="price">{{beer}}</span><br>
      Cheongha / Soju de frutas <span class="price">{{cheongha}}</span>
    `,
    pt: `      <span class="menu-subtitle">Menu Lateral</span><br>
      Macarrão frio <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> <span class="price">{{naengmyeon}}</span><br>
      Arroz branco <span class="small-note">(<span class="unlimited">Ilimitado</span> se pedido para todos)</span> <span class="price">{{rice}}</span><br>
      Bebida <span class="small-note">(lata)</span> <span class="price">{{drinkCan}}</span><br>
      Bebida <span class="unlimited">ilimitada</span> <span class="small-note">(todos devem pedir)</span> <span class="price">{{drinkUnlimited}}</span> por pessoa<br>
      Lámen Hangang <span class="price">{{ramen}}</span><br>
      Ensopado de pasta de soja (Doenjang) <span class="price">{{jjigae}}</span><br>
      Soju <span class="price">{{soju}}</span><br>
      Cerveja <span class="price">{{beer}}</span><br>
      Cheongha / Soju de frutas <span class="price">{{cheongha}}</span>
    `,
    ar: `      <span class="menu-subtitle">قائمة الجوانب</span><br>
      نودلز باردة (مول نينغميون / بيبيم نينغميون) <span class="price">{{naengmyeon}}</span><br>
      أرز أبيض (لكل الطاولة <span class="unlimited">غير محدود</span>) <span class="price">{{rice}}</span><br>
      مشروب (معلب) <span class="price">{{drinkCan}}</span><br>
       مشروبات <span class="unlimited">غير محدودة</span> (يجب أن يطلبها الجميع) <span class="price">{{drinkUnlimited}}</span> للشخص<br>
      رامن هانغانغ <span class="price">{{ramen}}</span><br>
      حساء دوينجانغ <span class="price">{{jjigae}}</span><br>
      سوجو <span class="price">{{soju}}</span><br>
      بيرة <span class="price">{{beer}}</span><br>
      تشيونغها / سوجو الفواكه <span class="price">{{cheongha}}</span>
    `,
    ru: `      <span class="menu-subtitle">Сайд-меню</span><br>
      Холодная лапша <span class="small-note">(Муль-нэнмён / Пибим-нэнмён)</span> <span class="price">{{naengmyeon}}</span><br>
      Белый рис <span class="small-note">(<span class="unlimited">безлимит</span> при заказе для всех)</span> <span class="price">{{rice}}</span><br>
      Напиток <span class="small-note">(банка)</span> <span class="price">{{drinkCan}}</span><br>
      <span class="unlimited">Безлимитные</span> напитки <span class="small-note">(при заказе для всех)</span> <span class="price">{{drinkUnlimited}}</span>/чел<br>
      Рамен Ханган <span class="price">{{ramen}}</span><br>
      Соевый суп (Тэнджан-чиге) <span class="price">{{jjigae}}</span><br>
      Соджу <span class="price">{{soju}}</span><br>
      Пиво <span class="price">{{beer}}</span><br>
      Чхонха / фруктовое соджу <span class="price">{{cheongha}}</span>
    `,
    tr: `      <span class="menu-subtitle">Yan Menü</span><br>
      Soğuk erişte <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> <span class="price">{{naengmyeon}}</span><br>
      Beyaz pirinç <span class="small-note">(Herkes sipariş ederse <span class="unlimited">sınırsız</span>)</span> <span class="price">{{rice}}</span><br>
      İçecek <span class="small-note">(Kutu)</span> <span class="price">{{drinkCan}}</span><br>
      <span class="unlimited">Sınırsız</span> içecek <span class="small-note">(Herkes sipariş etmeli)</span> Kişi başı <span class="price">{{drinkUnlimited}}</span><br>
      Hangang ramen <span class="price">{{ramen}}</span><br>
      Soya ezmesi güveci (Doenjang jjigae) <span class="price">{{jjigae}}</span><br>
      Soju <span class="price">{{soju}}</span><br>
      Bira <span class="price">{{beer}}</span><br>
      Cheongha / Meyveli Soju <span class="price">{{cheongha}}</span>
    `,
  },

  // ───────── 이용방법 ─────────
  usage: {
    ko: `      <span class="small-note">물, 앞접시:</span> <strong>창가쪽 냉장고</strong><br>
      <span class="small-note">숟가락 및 젓가락, 냅킨:</span> <strong>테이블 옆 서랍</strong><br>
      <span class="small-note">고기, 야채, 야채접시, 반찬, 물티슈, 집게 등:</span> <strong>셀프바</strong><br>
      <br>
      <strong>셀프로 이용가능!</strong>
    `,
    en: `      <span class="small-note">Water and small plates:</span> <strong>Refrigerator by the window</strong><br>
      <span class="small-note">Spoons, chopsticks, and napkins:</span> <strong>Drawer beside the table</strong><br>
      <span class="small-note">Meat, vegetables, dishes, side dishes, wet tissues, tongs, etc.:</span> <strong>Self bar</strong><br>
      <br>
      <strong>Everything is self-service!</strong>
    `,
    zh: `      <span class="small-note">水、小盘子:</span> <strong>窗边冰箱</strong><br>
      <span class="small-note">勺子、筷子、餐巾纸:</span> <strong>桌子旁抽屉</strong><br>
      <span class="small-note">肉、蔬菜、蔬菜盘、小菜、湿巾、夹子等:</span> <strong>自助吧</strong><br>
      <br>
      <strong>一切都可自助取用！</strong>
    `,
    ja: `      <span class="small-note">水、小皿:</span> <strong>窓際の冷蔵庫</strong><br>
      <span class="small-note">スプーン・箸・ナプキン:</span> <strong>テーブル横の引き出し</strong><br>
      <span class="small-note">肉・野菜・野菜皿・おかず・おしぼり・トングなど:</span> <strong>セルフバー</strong><br>
      <br>
      <strong>すべてセルフサービスです！</strong>
    `,
    vi: `      <span class="small-note">Nước, đĩa nhỏ:</span> <strong>Tủ lạnh cạnh cửa sổ</strong><br>
      <span class="small-note">Muỗng, đũa và khăn giấy:</span> <strong>Ngăn kéo bên bàn</strong><br>
      <span class="small-note">Thịt, rau, đĩa rau, món phụ, khăn ướt, kẹp, v.v.:</span> <strong>Quầy tự phục vụ</strong><br>
      <br>
      <strong>Tất cả đều tự phục vụ!</strong>
    `,
    th: `      <span class="small-note">น้ำและจานเล็ก:</span> <strong>ตู้เย็นริมหน้าต่าง</strong><br>
      <span class="small-note">ช้อน ตะเกียบ และกระดาษทิชชู:</span> <strong>ลิ้นชักข้างโต๊ะ</strong><br>
      <span class="small-note">เนื้อ ผัก จานผัก กับข้าว ทิชชูเปียก คีมคีบ ฯลฯ:</span> <strong>บาร์บริการตัวเอง</strong><br>
      <br>
      <strong>ทุกอย่างสามารถใช้ได้ด้วยตนเอง!</strong>
    `,
    ph: `      <span class="small-note">Tubig at maliit na plato:</span> <strong>Refrigerator sa tabi ng bintana</strong><br>
      <span class="small-note">Kutsara, chopsticks, at tissue:</span> <strong>Drawer sa tabi ng mesa</strong><br>
      <span class="small-note">Karne, gulay, side dish, basang tissue, sipit, at iba pa:</span> <strong>Self bar</strong><br>
      <br>
      <strong>Lahat ay self-service!</strong>
    `,
    fr: `      <span class="small-note">Eau et petites assiettes :</span> <strong>Réfrigérateur près de la fenêtre</strong><br>
      <span class="small-note">Cuillères, baguettes et serviettes :</span> <strong>Tiroir à côté de la table</strong><br>
      <span class="small-note">Viande, légumes, plats, accompagnements, lingettes, pinces, etc. :</span> <strong>Bar en libre-service</strong><br>
      <br>
      <strong>Tout est en libre-service !</strong>
    `,
    es: `      <span class="small-note">Agua y platos pequeños:</span> <strong>Refrigerador junto a la ventana</strong><br>
      <span class="small-note">Cucharas, palillos y servilletas:</span> <strong>Cajón al lado de la mesa</strong><br>
      <span class="small-note">Carne, verduras, platos, guarniciones, toallitas, pinzas, etc.:</span> <strong>Barra de autoservicio</strong><br>
      <br>
      <strong>¡Todo es autoservicio!</strong>
    `,
    pt: `      <span class="small-note">Água e pratinhos:</span> <strong>Geladeira ao lado da janela</strong><br>
      <span class="small-note">Colheres, hashis e guardanapos:</span> <strong>Gaveta ao lado da mesa</strong><br>
      <span class="small-note">Carne, vegetais, acompanhamentos, guardanapos úmidos, pinças, etc.:</span> <strong>Bar de autoatendimento</strong><br>
      <br>
      <strong>Tudo é autoatendimento!</strong>
    `,
    ar: `      <span class="small-note">الماء والأطباق الصغيرة:</span> الثلاجة بجانب النافذة<br>
      <span class="small-note">الملاعق والعيدان والمناديل:</span> الدرج بجانب الطاولة<br>
      <span class="small-note">اللحم، الخضروات، الأطباق الجانبية، المناديل المبللة، الملاقط، إلخ:</span> بار الخدمة الذاتية<br>
      <br>
      <strong>كل شيء بخدمة ذاتية!</strong>
    `,
    ru: `      <span class="small-note">Вода и маленькие тарелки:</span> <strong>Холодильник у окна</strong><br>
      <span class="small-note">Ложки, палочки и салфетки:</span> <strong>Ящик рядом со столом</strong><br>
      <span class="small-note">Мясо, овощи, гарниры, влажные салфетки, щипцы и т.д.:</span> <strong>Зона самообслуживания</strong><br>
      <br>
      <strong>Всё в формате самообслуживания!</strong>
    `,
    tr: `      <span class="small-note">Su ve küçük tabaklar:</span> <strong>Pencere kenarındaki buzdolabı</strong><br>
      <span class="small-note">Kaşık, çubuk ve peçeteler:</span> <strong>Masanın yanındaki çekmece</strong><br>
      <span class="small-note">Et, sebzeler, yan yemekler, ıslak mendil, maşa vb.:</span> <strong>Self-servis barı</strong><br>
      <br>
      <strong>Her şey self-servistir!</strong>
    `,
  },

  // ───────── 코스별 이용팁 ─────────
  tips: {
    ko: `     <strong>A 코스</strong>: 고기와 야채, 그리고 각종 소스를 이용가능한 코스<br>
     <span class="small-note"><em>이용팁: 고기는 도마, 야채는 야채접시, 반찬은 앞접시를 이용한다.</em></span><br><br>

     <strong>B 코스</strong>: A 코스에 치킨 무제한이 포함된 코스<br>
     <span class="small-note"><em>이용팁: 치킨은 테이블벨을 이용하여 직원에게 리필 요청한다.<br>
     고기는 도마, 야채는 야채접시, 반찬은 앞접시를 이용한다.</em></span><br><br>

     <strong>Full 코스</strong>: A 코스에 치킨, 공기밥, 냉면, 음료수까지 무제한 포함된 코스<br>
     <span class="small-note"><em>이용팁: 치킨, 냉면, 음료수는 테이블 벨로 리필 요청.<br>
     (냉면: 물냉면/비빔냉면, 음료: 콜라/제로콜라/사이다)</em></span>
   `,
    en: `     <strong>Course A</strong>: Includes meat, vegetables, and sauces.<br>
     <span class="small-note"><em>Tip: Use the cutting board for meat, the vegetable plate for veggies, and the small plate for side dishes.</em></span><br><br>

     <strong>Course B</strong>: Adds unlimited chicken to Course A.<br>
     <span class="small-note"><em>Tip: Ask for chicken refills using the table bell. Use the cutting board for meat, the vegetable plate for veggies, and the small plate for side dishes.</em></span><br><br>

     <strong>Full Course</strong>: Includes Course A <span class="small-note">+</span> chicken <span class="small-note">+</span> unlimited rice, cold noodles, and beverages.<br>
     <span class="small-note"><em>Tip: Use the table bell for refills of chicken, cold noodles, and drinks.<br>
     (Cold noodles: Mul-naengmyeon / Bibim-naengmyeon, Drinks: Cola / Zero Cola / Sprite)</em></span>
   `,
    zh: `     <strong>A 套餐</strong>: 可享用肉类、蔬菜和各种酱料。<br>
     <span class="small-note"><em>提示: 肉用砧板，蔬菜用蔬菜盘，小菜用小盘.</em></span><br><br>

     <strong>B 套餐</strong>: 在A套餐基础上增加无限量鸡肉。<br>
     <span class="small-note"><em>提示: 鸡肉请按桌上铃呼叫员工加餐。肉用砧板，蔬菜用蔬菜盘，小菜用小盘.</em></span><br><br>

     <strong>Full 套餐</strong>: A套餐基础上增加鸡肉、米饭、冷面、饮料无限量。<br>
     <span class="small-note"><em>提示: 鸡肉、冷面、饮料可按桌上铃呼叫员工加餐。<br>
     （冷面：水冷面/拌冷面，饮料：可乐/零度可乐/雪碧）</em></span>
   `,
    ja: `     <strong>A コース</strong>: 肉、野菜、各種ソースが利用可能なコース。<br>
     <span class="small-note"><em>ヒント: 肉はまな板、野菜は野菜皿、おかずは取り皿を使用.</em></span><br><br>

     <strong>B コース</strong>: Aコースにチキン食べ放題が追加されたコース。<br>
     <span class="small-note"><em>ヒント: チキンはテーブルベルでスタッフにリフィルを依頼。肉はまな板、野菜は野菜皿、おかずは取り皿を使用.</em></span><br><br>

     <strong>Full コース</strong>: Aコースにチキン、ご飯、冷麺、飲み物の食べ放題が追加。<br>
     <span class="small-note"><em>ヒント: チキン、冷麺、飲み物はテーブルベルでスタッフに依頼。<br>
     （冷麺：水冷麺/ビビン冷麺、飲み物：コーラ/ゼロコーラ/サイダー）</em></span>
   `,
    vi: `     <strong>Suất A</strong>: Bao gồm thịt, rau và các loại nước sốt.<br>
     <span class="small-note"><em>Mẹo: Dùng thớt cho thịt, đĩa rau cho rau, đĩa nhỏ cho món phụ.</em></span><br><br>

     <strong>Suất B</strong>: Giống suất A nhưng có thêm gà không giới hạn.<br>
     <span class="small-note"><em>Mẹo: Nhấn chuông bàn để yêu cầu thêm gà. Dùng thớt cho thịt, đĩa rau cho rau, đĩa nhỏ cho món phụ.</em></span><br><br>

     <strong>Suất Full</strong>: Bao gồm suất A <span class="small-note">+</span> gà <span class="small-note">+</span> cơm, mì lạnh và nước uống không giới hạn.<br>
     <span class="small-note"><em>Mẹo: Nhấn chuông bàn để yêu cầu thêm gà, mì lạnh, hoặc nước uống.<br>
     (Mì lạnh: Mul-naengmyeon / Bibim-naengmyeon, Nước: Cola / Zero Cola / Sprite)</em></span>
   `,
    th: `     <strong>คอร์ส A</strong>: สามารถเลือกเนื้อ ผัก และซอสต่างๆ ได้ไม่จำกัด<br>
     <span class="small-note"><em>เคล็ดลับ: ใช้เขียงสำหรับเนื้อ จานผักสำหรับผัก และจานเล็กสำหรับกับข้าว</em></span><br><br>

     <strong>คอร์ส B</strong>: คอร์ส A พร้อมไก่ซอสถั่วเหลืองไม่อั้น<br>
     <span class="small-note"><em>เคล็ดลับ: กดกริ่งเรียกพนักงานเพื่อขอรีฟิลไก่<br>
     ใช้เขียงสำหรับเนื้อ จานผักสำหรับผัก และจานเล็กสำหรับกับข้าว</em></span><br><br>

     <strong>คอร์ส Full</strong>: รวมเนื้อ ไก่ ข้าว บะหมี่เย็น และเครื่องดื่มไม่จำกัด<br>
     <span class="small-note"><em>เคล็ดลับ: ใช้กริ่งเรียกพนักงานเมื่ออยากรีฟิลไก่ บะหมี่ หรือเครื่องดื่ม<br>
     (บะหมี่เย็น: แบบน้ำ/แบบเผ็ด, เครื่องดื่ม: โคล่า/โคล่าไม่มีน้ำตาล/ไซเดอร์)</em></span>
   `,
    ph: `     <strong>A Course</strong>: Maaaring kumuha ng karne, gulay, at iba't ibang sawsawan<br>
     <span class="small-note"><em>Tip: Gumamit ng chopping board para sa karne, plato ng gulay para sa gulay, at maliit na plato para sa side dish.</em></span><br><br>

     <strong>B Course</strong>: Katulad ng A Course ngunit may unlimited soy chicken<br>
     <span class="small-note"><em>Tip: Gamitin ang table bell para humingi ng refill ng chicken sa staff.<br>
     Gumamit ng chopping board, plato ng gulay, at maliit na plato tulad ng A Course.</em></span><br><br>

     <strong>Full Course</strong>: May kasamang unlimited chicken, rice, cold noodles, at inumin<br>
     <span class="small-note"><em>Tip: I-ring ang bell para sa refill ng chicken, noodles, o inumin.<br>
     (Cold noodles: may sabaw o maanghang / Inumin: cola, zero cola, o sprite)</em></span>
   `,
    fr: `     <strong>Menu A</strong> : Comprend viande, légumes et sauces variées.<br>
     <span class="small-note"><em>Astuce : Utilisez la planche à découper pour la viande, l’assiette de légumes pour les légumes et la petite assiette pour les accompagnements.</em></span><br><br>

     <strong>Menu B</strong> : Ajoute du poulet à volonté au menu A.<br>
     <span class="small-note"><em>Astuce : Demandez un remplissage du poulet avec la cloche de table.</em></span><br><br>

     <strong>Menu Full</strong> : Comprend le menu A <span class="small-note">+</span> poulet <span class="small-note">+</span> riz, nouilles froides et boissons à volonté.<br>
     <span class="small-note"><em>Astuce : Utilisez la cloche pour redemander du poulet, des nouilles ou des boissons.<br>
     (Nouilles froides : Mul-naengmyeon / Bibim-naengmyeon, Boissons : Cola / Zéro Cola / Sprite)</em></span>
   `,
    es: `     <strong>Menú A</strong>: Incluye carne, verduras y diversas salsas.<br>
     <span class="small-note"><em>Consejo: Use la tabla para carne, el plato de verduras para vegetales y el plato pequeño para guarniciones.</em></span><br><br>

     <strong>Menú B</strong>: Agrega pollo ilimitado al Menú A.<br>
     <span class="small-note"><em>Consejo: Solicite recargas de pollo con el timbre de mesa.</em></span><br><br>

     <strong>Menú Full</strong>: Incluye Menú A <span class="small-note">+</span> pollo <span class="small-note">+</span> arroz, fideos fríos y bebidas ilimitadas.<br>
     <span class="small-note"><em>Consejo: Use el timbre para solicitar recargas. (Fideos fríos: Mul-naengmyeon / Bibim-naengmyeon, Bebidas: Cola / Zero Cola / Sprite)</em></span>
   `,
    pt: `     <strong>Curso A</strong>: Inclui carne, legumes e molhos variados.<br>
     <span class="small-note"><em>Dica: Use a tábua para carne, o prato de legumes para vegetais e o prato pequeno para acompanhamentos.</em></span><br><br>

     <strong>Curso B</strong>: Adiciona frango ilimitado ao Curso A.<br>
     <span class="small-note"><em>Dica: Peça mais frango usando o sino da mesa.</em></span><br><br>

     <strong>Curso Full</strong>: Inclui Curso A <span class="small-note">+</span> frango <span class="small-note">+</span> arroz, macarrão frio e bebidas ilimitadas.<br>
     <span class="small-note"><em>Dica: Use o sino da mesa para pedir reposição de frango, macarrão ou bebidas.<br>
     (Macarrão frio: Mul-naengmyeon / Bibim-naengmyeon, Bebidas: Cola / Zero Cola / Sprite)</em></span>
   `,
    ar: `     <strong>قائمة A</strong>: تشمل اللحوم والخضروات والصلصات المختلفة.<br>
     <span class="small-note"><em>نصيحة: استخدم لوح التقطيع للحوم، طبق الخضار للخضروات، والطبق الصغير للأطباق الجانبية.</em></span><br><br>

     <strong>قائمة B</strong>: تشمل نفس محتوى A بالإضافة إلى دجاج غير محدود.<br>
     <span class="small-note"><em>نصيحة: اطلب المزيد من الدجاج باستخدام جرس الطاولة.</em></span><br><br>

     <strong>قائمة Full</strong>: تشمل قائمة A مع دجاج، أرز، نودلز باردة ومشروبات غير محدودة.<br>
     <span class="small-note"><em>نصيحة: استخدم جرس الطاولة لطلب إعادة التعبئة. (النودلز الباردة: Mul-naengmyeon / Bibim-naengmyeon، المشروبات: كوكاكولا / زيرو كولا / سبرايت)</em></span>
   `,
    ru: `     <strong>Курс A</strong>: Включает мясо, овощи и различные соусы.<br>
     <span class="small-note"><em>Совет: Используйте разделочную доску для мяса, тарелку для овощей и маленькую тарелку для гарниров.</em></span><br><br>

     <strong>Курс B</strong>: Добавляет безлимитную курицу к Курсу A.<br>
     <span class="small-note"><em>Совет: Попросите добавку курицы с помощью настольного звонка.</em></span><br><br>

     <strong>Полный курс</strong>: Включает Курс A <span class="small-note">+</span> курицу <span class="small-note">+</span> безлимитный рис, холодную лапшу и напитки.<br>
     <span class="small-note"><em>Совет: Используйте звонок, чтобы заказать добавку курицы, лапши или напитков.</em></span>
   `,
    tr: `     <strong>A Kursu</strong>: Et, sebze ve çeşitli sosları içerir.<br>
     <span class="small-note"><em>İpucu: Et için kesme tahtası, sebzeler için sebze tabağı, yan yemekler için küçük tabak kullanın.</em></span><br><br>

     <strong>B Kursu</strong>: A Kursuna sınırsız tavuk eklenmiştir.<br>
     <span class="small-note"><em>İpucu: Tavuk yenilemesi için masa zilini kullanın.</em></span><br><br>

     <strong>Full Kursu</strong>: A Kursuna ek olarak tavuk, pilav, soğuk erişte ve içecekler sınırsızdır.<br>
     <span class="small-note"><em>İpucu: Tavuk, erişte veya içecek için masa zilini kullanın. (Soğuk erişte: Mul-naengmyeon / Bibim-naengmyeon, İçecekler: Kola / Zero Kola / Sprite)</em></span>`,
  },

  // ───────── 가마솥 유래 ─────────
  gamasot: {
    ko: `      <strong>가마솥의 유래와 특징</strong><br><br>
      가마솥은 삼국시대 이전(약 2,000년 전)부터 사용된 것으로 추정되며,
      무쇠로 만든 가마솥은 삼국시대 후기(약 1,400년 전)부터 서민들에게 보급되었습니다.<br><br>
      무쇠는 열전도율이 낮아 천천히 달궈지지만, 열이 쉽게 식지 않고 오래 유지됩니다.
      덕분에 열이 고르게 전달되어 고기가 맛있게 익습니다.<br><br>
      이처럼 가마솥은 한국의 전통 조리 도구이자, 가족의 상징과 공동체 문화를 담은 중요한 생활 용구입니다.
    `,
    en: `      <strong>Origins and Features of the Iron Pot Lid (Gamasot)</strong><br><br>
      The gamasot (iron pot) is believed to have been used since before the Three Kingdoms period (about 2,000 years ago).
      Cast-iron versions became common among ordinary people around 1,400 years ago.<br><br>
      Cast iron heats slowly due to its low thermal conductivity, but it retains heat well.
      This even, lasting heat cooks meat thoroughly and deliciously.<br><br>
      The gamasot is a traditional Korean cooking tool and a symbol of family and community culture.
    `,
    zh: `      <strong>铁釜锅盖的由来与特点</strong><br><br>
      据推测，铁釜在三国时代以前（约 2000 年前）就已被使用；
      生铁制的铁釜在三国后期（约 1400 年前）开始在平民中普及。<br><br>
      生铁导热率较低，加热较慢，但保温性极佳，热量分布均匀，
      因而能使肉类熟得更香更均匀。<br><br>
      铁釜不仅是韩国的传统烹饪用具，也承载着家庭与共同体文化的象征意义。
    `,
    ja: `      <strong>釜蓋（かまぶた）の由来と特徴</strong><br><br>
      釜は三国時代以前（約 2000 年前）から使用されていたとされ、
      鋳鉄製の釜は三国時代後期（約 1400 年前）から庶民にも普及しました。<br><br>
      鋳鉄は熱伝導率が低くゆっくり温まりますが、熱保持に優れ均一に熱が伝わるため、
      肉が美味しく焼き上がります。<br><br>
      釜は韓国の伝統的な調理器具であり、家族や共同体文化の象徴でもあります。
    `,
    vi: `      <strong>Nắp nồi gang (Gamasot) — nguồn gốc và đặc điểm</strong><br><br>
      Gamasot được cho là đã xuất hiện từ trước thời Tam Quốc (khoảng 2.000 năm trước).
      Phiên bản bằng gang trở nên phổ biến trong dân chúng khoảng 1.400 năm trước.<br><br>
      Gang dẫn nhiệt chậm nhưng giữ nhiệt lâu, tỏa nhiệt đều nên thịt chín ngon và đồng đều.<br><br>
      Gamasot là dụng cụ nấu ăn truyền thống của Hàn Quốc, đồng thời là biểu tượng của gia đình và văn hóa cộng đồng.
    `,
    th: `      <strong>ที่มาของหม้อเหล็ก (กามาซ็อต)</strong><br><br>
      หม้อเหล็กถูกใช้ในเกาหลีตั้งแต่ก่อนยุคสามก๊ก (ราว 2,000 ปีก่อน)<br>
      หม้อเหล็กหล่อเริ่มแพร่หลายในหมู่ชาวบ้านราว 1,400 ปีก่อน<br><br>
      หม้อเหล็กรักษาความร้อนได้ดี ทำให้อาหารสุกทั่วถึงและอร่อย<br>
      จึงเป็นสัญลักษณ์ของครอบครัวและวัฒนธรรมการกินร่วมกันในเกาหลี
    `,
    ph: `      <strong>Pinagmulan ng “Gamasot” (Iron Pot)</strong><br><br>
      Ginagamit sa Korea bago pa ang panahon ng Three Kingdoms (mahigit 2,000 taon na ang nakaraan).<br>
      Ang cast iron pot ay naging karaniwan sa mga tao mga 1,400 taon na ang nakalipas.<br><br>
      Mabagal itong uminit ngunit matagal ding mananatiling mainit, kaya pantay ang pagkaluto ng karne.<br>
      Isa itong simbolo ng pamilya at pagkakaisa sa kulturang Koreano.
    `,
    fr: `      <strong>Le couvercle de marmite en fonte (Gamasot) — origine et caractéristiques</strong><br><br>
      Le gamasot aurait été utilisé avant la période des Trois Royaumes (il y a environ 2 000 ans) ;
      les versions en fonte se sont répandues parmi le peuple il y a environ 1 400 ans.<br><br>
      La fonte chauffe lentement en raison de sa faible conductivité thermique, mais conserve très bien la chaleur,
      ce qui assure une diffusion uniforme et une cuisson savoureuse des viandes.<br><br>
      Le gamasot est à la fois un ustensile de cuisine traditionnel coréen et un symbole de la famille et de la communauté.
    `,
    es: `      <strong>Tapa de olla de hierro (Gamasot) — origen y características</strong><br><br>
      Se cree que el gamasot se utilizaba antes del período de los Tres Reinos (hace unos 2.000 años),
      y las versiones de hierro fundido se popularizaron entre la gente común hace unos 1.400 años.<br><br>
      El hierro fundido se calienta lentamente por su baja conductividad térmica, pero retiene muy bien el calor,
      distribuyéndolo de forma uniforme para cocinar la carne de manera deliciosa.<br><br>
      El gamasot es una herramienta culinaria tradicional coreana y un símbolo de la familia y la cultura comunitaria.
    `,
    pt: `      <strong>Tampa de panela de ferro (Gamasot) — origem e características</strong><br><br>
      Acredita-se que o gamasot tenha sido usado antes do período dos Três Reinos (há cerca de 2.000 anos);
      as versões em ferro fundido se popularizaram entre o povo comum há cerca de 1.400 anos.<br><br>
      O ferro fundido aquece lentamente devido à baixa condutividade térmica, mas mantém o calor por muito tempo,
      distribuindo-o de forma uniforme para um cozimento saboroso da carne.<br><br>
      O gamasot é um utensílio de cozinha tradicional coreano e um símbolo da família e da cultura comunitária.
    `,
    ar: `      <strong>غطاء قدر الحديد (غاماسوت) — الأصل والميزات</strong><br><br>
      يُعتقد أن الغاماسوت استُخدم منذ ما قبل عصر الممالك الثلاث (قبل نحو 2000 عام)،
      وأصبحت الأواني المصنوعة من الحديد المصبوب شائعة بين الناس قبل نحو 1400 عام.<br><br>
      يسخن الحديد المصبوب ببطء بسبب انخفاض التوصيل الحراري، لكنه يحتفظ بالحرارة جيدًا
      ويوزعها بشكل متساوٍ، مما يجعل اللحم يُطهى بنكهة ممتازة.<br><br>
      الغاماسوت أداة طهي كورية تقليدية ورمز للعائلة والثقافة المجتمعية.
    `,
    ru: `      <strong>Крышка чугунного котла (Гамасот) — происхождение и особенности</strong><br><br>
      Считается, что гамасот использовался ещё до периода Трёх царств (около 2000 лет назад),
      а чугунные версии стали распространены среди простого народа примерно 1400 лет назад.<br><br>
      Чугун медленно нагревается из-за низкой теплопроводности, но хорошо удерживает тепло
      и равномерно его распределяет, благодаря чему мясо прожаривается вкусно и равномерно.<br><br>
      Гамасот — это традиционная корейская утварь и символ семьи и общинной культуры.
    `,
    tr: `      <strong>Dökme demir tencere kapağı (Gamasot) — köken ve özellikler</strong><br><br>
      Gamasot’un Üç Krallıklar döneminden önce (yaklaşık 2000 yıl önce) kullanıldığı düşünülür;
      dökme demir versiyonları yaklaşık 1400 yıl önce halk arasında yaygınlaşmıştır.<br><br>
      Dökme demir, düşük ısı iletkenliği nedeniyle yavaş ısınır ancak ısıyı uzun süre korur
      ve eşit dağıtarak eti lezzetli şekilde pişirir.<br><br>
      Gamasot, geleneksel bir Kore pişirme aracı olmasının yanında aile ve topluluk kültürünün de simgesidir.
    `,
  },

  // ───────── 한국식 쌈 ─────────
  ssam: {
    ko: `      <strong>쌈이란?</strong><br>
      본인 입맛에 맞게 싸서 먹는 것이 정답이다.<br><br>
      야채에 참기름 혹은 콩가루를 찍은 고기를 올리고, 쌈장을 올려서 먹는다.<br>
      위와 같은 방식으로 고기에 여러 가지 소스를 찍어서 야채 위에 올리고, 
      기호에 맞는 파절이, 김치, 구운 마늘, 콩나물 등을 곁들여서 먹는다.<br><br>
      고기 본연의 맛을 즐기고 싶다면, 고기에 소금만 찍어 먹는 것을 추천한다.
    `,
    en: `      <strong>What is Ssam?</strong><br>
      The Korean way to enjoy barbecue is wrapping it your own way.<br><br>
      Place grilled meat dipped in sesame oil or soybean powder on a leaf, add ssamjang (soybean paste sauce), and eat in one bite.<br>
      You can also add other sauces to the meat and wrap it with vegetables, along with green onions, kimchi, grilled garlic, or bean sprouts as you like.<br><br>
      To enjoy the pure flavor of the meat, try dipping it only in salt.
    `,
    zh: `      <strong>什么是包饭(쌈)?</strong><br>
      根据个人口味包着吃就是正确的方式。<br><br>
      在蔬菜叶上放上蘸了香油或黄豆粉的烤肉，再加上包酱一起食用。<br>
      也可以蘸上各种酱料后包上蔬菜，加上葱丝、泡菜、烤蒜、豆芽等一起享用。<br><br>
      想品尝肉的原味时，只蘸盐食用即可。
    `,
    ja: `      <strong>サムとは？</strong><br>
      自分の好みに合わせて包んで食べるのが正解。<br><br>
      野菜にごま油やきな粉をつけた肉をのせ、サムジャンをのせて食べる。<br>
      同じように肉にいろいろなソースをつけて野菜にのせ、好みに合わせてネギサラダ、キムチ、焼きニンニク、もやしなどを添えて食べる。<br><br>
      肉本来の味を楽しみたい場合は、塩だけで食べるのがおすすめ。
    `,
    vi: `      <strong>Ssam là gì?</strong><br>
      Cách đúng là cuốn và ăn theo khẩu vị riêng của bạn.<br><br>
      Đặt thịt nướng đã chấm dầu mè hoặc bột đậu lên rau, thêm tương ssamjang và ăn.<br>
      Cũng có thể chấm thịt với nhiều loại sốt khác nhau, đặt lên rau và ăn kèm hành trộn, kimchi, tỏi nướng hoặc giá đỗ tùy sở thích.<br><br>
      Nếu muốn thưởng thức vị thịt nguyên bản, hãy chấm thịt với muối.
    `,
    th: `      <strong>ซัม (쌈) คืออะไร?</strong><br>
      คือการห่ออาหารตามใจชอบของคุณ!<br><br>
      วางเนื้อที่จิ้มซอสน้ำมันงาหรือผงถั่วบนผัก แล้วใส่ซัมจัง (ซอสถั่วหมัก)<br>
      สามารถเพิ่มหัวหอมดอง กิมจิ กระเทียมย่าง หรือถั่วงอกได้ตามชอบ<br><br>
      ถ้าอยากลิ้มรสเนื้อแท้ๆ แนะนำให้จิ้มเกลือเพียงเล็กน้อย
    `,
    ph: `      <strong>Ano ang “Ssam”?</strong><br>
      Ito ay paraan ng pagkain na ikaw ang bumubuo ng perpektong kagat!<br><br>
      Ilagay ang karne sa dahon ng gulay, lagyan ng sesame oil o soybean powder, at ng ssamjang (spicy soybean paste).<br>
      Maaari mong dagdagan ng kimchi, bean sprouts, o bawang ayon sa panlasa.<br><br>
      Kung gusto mo maramdaman ang tunay na lasa ng karne, simpleng asin lang ang kailangan.
    `,
    fr: `      <strong>Qu’est-ce que le Ssam ?</strong><br>
      La bonne façon est de l’envelopper selon votre goût personnel.<br><br>
      Mettez de la viande grillée trempée dans de l’huile de sésame ou de la poudre de soja sur une feuille de légume, ajoutez du ssamjang et dégustez.<br>
      Vous pouvez aussi varier les sauces et accompagner de kimchi, d’ail grillé, de germes de soja, etc.<br><br>
      Pour savourer la viande pure, trempez-la simplement dans du sel.
    `,
    es: `      <strong>¿Qué es el Ssam?</strong><br>
      La forma correcta es envolver y comer según tu gusto.<br><br>
      Coloca carne asada bañada en aceite de sésamo o polvo de soja sobre una hoja de vegetal, añade ssamjang y cómelo.<br>
      También puedes usar diferentes salsas y añadir cebolla verde, kimchi, ajo asado o brotes de soja.<br><br>
      Para disfrutar el sabor puro de la carne, solo sumérgela en sal.
    `,
    pt: `      <strong>O que é Ssam?</strong><br>
      O jeito certo é enrolar e comer do seu jeito.<br><br>
      Coloque carne grelhada mergulhada em óleo de gergelim ou farinha de soja sobre uma folha, adicione ssamjang e coma.<br>
      Também pode adicionar vários molhos, legumes, kimchi, alho grelhado e brotos de feijão.<br><br>
      Para saborear o gosto puro da carne, mergulhe apenas no sal.
    `,
    ar: `      <strong>ما هو السام (Ssam)؟</strong><br>
      الطريقة الصحيحة هي أن تلف الطعام حسب ذوقك.<br><br>
      ضع اللحم المشوي المغموس في زيت السمسم أو مسحوق فول الصويا على ورقة خضار، أضف صلصة السامجانغ وتناوله.<br>
      يمكنك أيضًا إضافة صلصات أخرى مع اللحم وتناوله مع الكراث، الكيمتشي، الثوم المشوي، أو براعم الفول حسب ذوقك.<br><br>
      للاستمتاع بطعم اللحم الأصلي، اغمس اللحم بالملح فقط.
    `,
    ru: `      <strong>Что такое сам (Ssam)?</strong><br>
      Правильный способ — заворачивать мясо по своему вкусу.<br><br>
      Положите мясо, обмакнутое в кунжутное масло или соевую муку, на лист салата, добавьте соус самджан и ешьте.<br>
      Можно также использовать разные соусы и добавлять лук, кимчи, жареный чеснок или ростки фасоли.<br><br>
      Чтобы насладиться вкусом самого мяса, попробуйте просто посолить его.
    `,
    tr: `      <strong>Ssam nedir?</strong><br>
      Kendi damak zevkinize göre sarmak ve yemek en doğru yoldur.<br><br>
      Susam yağına veya soya tozuna batırılmış eti bir yaprağın üzerine koyun, ssamjang ekleyin ve yiyin.<br>
      Ayrıca ete farklı soslar ekleyebilir, yeşil soğan, kimchi, kızarmış sarımsak veya fasulye filiziyle birlikte yiyebilirsiniz.<br><br>
      Etin doğal tadını almak için sadece tuza batırmanızı öneririz.
    `,
  },
};
