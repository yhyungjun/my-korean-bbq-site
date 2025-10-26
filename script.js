// 페이지 로드 시 본문 숨김
window.addEventListener("DOMContentLoaded", () => {
  // 기본 언어를 ko(한국어)로 지정 (언어 선택 전에도 내용 표시 가능)
  document.documentElement.lang = document.documentElement.lang || 'ko';

  document.body.classList.add("hidden-body");
  openLangModal(); // 처음엔 언어 모달 자동 실행
});

// 언어 변경 함수
function setLang(lang) {
  document.documentElement.lang = lang;

  // 모든 data-lang 요소 언어별 표시
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = (el.getAttribute('data-lang') === lang) ? '' : 'none';
  });

  // 메뉴 상세 설명 박스 갱신
  const detailBoxes = document.querySelectorAll(".menu-detail, .side-detail, .usage-detail");
  detailBoxes.forEach(box => {
    box.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = (el.getAttribute('data-lang') === lang) ? '' : 'none';
    });
  });
  

  // 언어 버튼 강조
  document.querySelectorAll('.modal-buttons button').forEach(btn => {
    btn.classList.remove('active-lang');
    if (btn.getAttribute('onclick') === `setLang('${lang}')`) {
      btn.classList.add('active-lang');
    }
  });

  // 언어 선택 후 본문 표시 + 모달 닫기
  document.body.classList.remove("hidden-body");
  document.body.classList.add("fade-in");
  closeLangModal();
}

// 모달 열기
function openLangModal() {
  const modal = document.getElementById("langModal");
  modal.style.display = "block";
  // 언어는 사용자가 버튼을 눌렀을 때 setLang(...)에서 적용
}


// 모달 닫기
function closeLangModal() {
  document.getElementById("langModal").style.display = "none";
}

// 메뉴 상세
function showMenuDetail(menu) {
  const detailBox = document.getElementById("menuDetailBox");
  let content = "";
  
  // ✅ A코스
  if (menu === "A") {
    content = `
      <p data-lang="ko"><strong class="course-label">A</strong> 돼지모듬 무한 리필<br>1인 17,900원<br>삼겹살+목살+우삼겹+가브리살+갈매기살+대패삼겹살+벌집껍데기+돼지불고기+소대창+모듬야채쌈</p>
      <p data-lang="en" style="display:none;"><strong class="course-label">A</strong> Pork Assortment Unlimited Refill<br>₩17,900 per person<br>Pork belly + Pork neck + Beef brisket + Pork jowl + Skirt meat + Thin-sliced pork belly + Honeycomb pork skin + Pork bulgogi + Beef intestine + Assorted vegetable wraps</p>
      <p data-lang="zh" style="display:none;"><strong class="course-label">A</strong> 猪肉拼盘 无限续<br>每人 17,900韩元<br>五花肉 + 猪颈肉 + 牛胸肉 + 猪颊肉 + 横膈膜肉 + 薄切五花肉 + 蜂窝猪皮 + 猪肉烤肉 + 牛大肠 + 蔬菜包</p>
      <p data-lang="ja" style="display:none;"><strong class="course-label">A</strong> 豚盛り合わせ 無限リフィル<br>1人 17,900ウォン<br>サムギョプサル + 豚肩ロース + 牛バラ肉 + 豚トロ + ハラミ + 薄切りサムギョプサル + 豚皮（ハチの巣）+ 豚プルコギ + 牛ホルモン + 野菜サム</p>
      <p data-lang="vi" style="display:none;"><strong class="course-label">A</strong> Suất Buffet Thịt Heo Không Giới Hạn<br>17,900 KRW/người<br>Ba chỉ + Thịt cổ + Ức bò + Má heo + Thăn sườn + Ba chỉ thái mỏng + Da heo tổ ong + Bulgogi heo + Lòng bò + Rau cuốn</p>
      <p data-lang="th" style="display:none;"><strong class="course-label">A</strong> เซ็ตหมูรวมเติมไม่อั้น<br>คนละ 17,900 วอน<br>หมูสามชั้น + คอหมู + เนื้ออกวัว + คอหมูอบ + สันในหมู + หมูสไลซ์บาง + หนังหมู + หมูบูลโกกิ + ไส้วัว + ผักห่อ</p>
      <p data-lang="ph" style="display:none;"><strong class="course-label">A</strong> Unlimited Pork Set<br>₩17,900 bawat tao<br>Pork belly + Pork neck + Beef brisket + Pork jowl + Skirt meat + Thin-sliced pork + Pork skin + Pork bulgogi + Beef intestine + Mixed vegetable wraps</p>
      <p data-lang="fr" style="display:none;"><strong class="course-label">A</strong> Assortiment de Porc à volonté<br>17 900₩ par personne<br>Poitrine + Échine + Poitrine de bœuf + Joue de porc + Hampe + Poitrine fine + Couenne en nid d’abeille + Bulgogi de porc + Tripes de bœuf + Légumes</p>
      <p data-lang="es" style="display:none;"><strong class="course-label">A</strong> Surtido de Cerdo Ilimitado<br>17,900₩ por persona<br>Panceta + Cuello + Falda de res + Papada + Entraña + Panceta fina + Piel panal + Bulgogi de cerdo + Intestino de res + Verduras</p>
      <p data-lang="pt" style="display:none;"><strong class="course-label">A</strong> Rodízio de Porco Variado<br>₩17.900 por pessoa<br>Barriga + Pescoço + Peito bovino + Bochecha + Fraldinha + Panceta fina + Pele em favo + Bulgogi de porco + Intestino bovino + Vegetais</p>
      <p data-lang="ar" style="display:none;"><strong class="course-label">A</strong> تشكيلة لحم خنزير مفتوحة<br>17,900₩ للشخص<br>بطن + رقبة + صدر بقر + خدود + لحم الحجاب + بطن رفيع + جلد خنزير مشبك + بولغوغي + أمعاء + خضروات</p>
      <p data-lang="ru" style="display:none;"><strong class="course-label">A</strong> Ассорти из свинины безлимит<br>17,900₩ за чел<br>Самгёпсаль + Шея + Грудинка + Щёки + Диафрагма + Тонкий самгёпсаль + Свиная кожа + Булгоги + Кишки + Овощи</p>
      <p data-lang="tr" style="display:none;"><strong class="course-label">A</strong> Domuz Karışık Sınırsız<br>Kişi ₩17.900<br>Domuz göbeği + Boyun + Dana göğüs + Yanak + Diyafram + İnce göbek + Domuz derisi + Bulgogi + Bağırsak + Sebzeler</p>
    `;
  }

  // ✅ B코스
  else if (menu === "B") {
    content = `
      <p data-lang="ko"><strong class="course-label">B</strong> 돼지모듬+간장순살치킨 무한리필<br>1인 19,900원<br>삼겹살+간장순살치킨+목살+우삼겹+가브리살+갈매기살+대패삼겹살+벌집껍데기+돼지불고기+소대창+모듬야채쌈</p>
      <p data-lang="en" style="display:none;"><strong class="course-label">B</strong> Pork Assortment + Soy Chicken Unlimited<br>₩19,900 per person<br>Pork belly + Soy-marinated chicken + Neck + Beef brisket + Jowl + Skirt + Thin belly + Skin + Bulgogi + Intestine + Vegetables</p>
      <p data-lang="zh" style="display:none;"><strong class="course-label">B</strong> 猪肉拼盘+酱油鸡 无限续<br>每人 19,900韩元<br>五花肉+酱油鸡+颈肉+牛胸肉+猪颊肉+横膈膜+薄切五花肉+猪皮+烤肉+牛肠+蔬菜</p>
      <p data-lang="ja" style="display:none;"><strong class="course-label">B</strong> 豚盛り合わせ+醤油チキン 無限リフィル<br>1人 19,900ウォン<br>サムギョプサル+醤油チキン+肩ロース+牛バラ+豚トロ+ハラミ+薄切り+皮+プルコギ+ホルモン+野菜</p>
      <p data-lang="vi" style="display:none;"><strong class="course-label">B</strong> Suất Thịt Heo + Gà Xì Dầu Không Giới Hạn<br>19,900 KRW/người<br>Ba chỉ + Gà xì dầu + Cổ + Ức bò + Má + Thăn + Ba chỉ mỏng + Da + Bulgogi + Lòng + Rau</p>
      <p data-lang="th" style="display:none;"><strong class="course-label">B</strong> หมูรวม + ไก่ซอสถั่วเหลือง เติมไม่อั้น<br>คนละ 19,900 วอน<br>หมูสามชั้น + ไก่ซอสถั่วเหลือง + คอหมู + เนื้อวัว + สันในหมู + หมูสไลซ์บาง + หนังหมู + หมูบูลโกกิ + ไส้วัว + ผักห่อ</p>
      <p data-lang="ph" style="display:none;"><strong class="course-label">B</strong> Unlimited Pork + Soy Chicken Set<br>₩19,900 bawat tao<br>Pork belly + Soy-marinated chicken + Pork neck + Beef brisket + Pork jowl + Skirt meat + Thin pork belly + Pork skin + Pork bulgogi + Beef intestine + Veggie wraps</p>
      <p data-lang="fr" style="display:none;"><strong class="course-label">B</strong> Porc + Poulet soja à volonté<br>19 900₩ pp<br>Poitrine + Poulet soja + Échine + Poitrine bœuf + Joue + Hampe + Fine poitrine + Peau + Bulgogi + Tripes + Légumes</p>
      <p data-lang="es" style="display:none;"><strong class="course-label">B</strong> Cerdo + Pollo soja Ilimitado<br>19,900₩ pp<br>Panceta + Pollo soja + Cuello + Falda + Papada + Entraña + Panceta fina + Piel + Bulgogi + Intestino + Verduras</p>
      <p data-lang="pt" style="display:none;"><strong class="course-label">B</strong> Porco + Frango molho soja Rodízio<br>₩19.900 pp<br>Barriga + Frango soja + Pescoço + Peito boi + Bochecha + Fraldinha + Panceta fina + Pele + Bulgogi + Intestino + Vegetais</p>
      <p data-lang="ar" style="display:none;"><strong class="course-label">B</strong> خنزير+دجاج صويا مفتوح<br>19,900₩ للشخص<br>بطن + دجاج صويا + رقبة + صدر بقر + خدود + لحم الحجاب + بطن رفيع + جلد + بولغوغي + أمعاء + خضار</p>
      <p data-lang="ru" style="display:none;"><strong class="course-label">B</strong> Свинина+Соевый курица безлимит<br>19,900₩ чел<br>Самгёпсаль + Курица соя + Шея + Грудинка + Щёки + Диафрагма + Тонкий самгёпсаль + Кожа + Булгоги + Кишки + Овощи</p>
      <p data-lang="tr" style="display:none;"><strong class="course-label">B</strong> Domuz+Soya Tavuk Sınırsız<br>₩19.900 kişi<br>Göbek + Soya tavuk + Boyun + Dana göğüs + Yanak + Diyafram + İnce göbek + Deri + Bulgogi + Bağırsak + Sebze</p>
    `;
  }

  // ✅ F코스
  else if (menu === "F" || menu === "Full") {
    content = `
      <p data-lang="ko"><strong class="course-label">Full</strong> 코스 무한리필<br>1인 23,900원<br>삼겹살+간장순살치킨+목살+우삼겹+가브리살+갈매기살+대패삼겹살+벌집껍데기+돼지불고기+소대창+모듬야채쌈+음료수<span class="unlimited">무제한</span>+공기밥<span class="unlimited">무제한</span>+냉면<span class="unlimited">무제한</span>
      <p data-lang="en" style="display:none;"><strong class="course-label">Full</strong> Course Unlimited Refill<br>₩23,900 per person<br>Pork belly + Soy-marinated boneless chicken + Pork neck + Beef brisket + Pork jowl + Skirt meat + Thin-sliced pork belly + Honeycomb pork skin + Pork bulgogi + Beef intestine + Assorted vegetable wraps + <span class="unlimited">Unlimited</span> drinks + <span class="unlimited">Unlimited</span> rice + <span class="unlimited">Unlimited</span> cold noodles</p>
      <p data-lang="zh" style="display:none;"><strong class="course-label">全</strong>套餐 无限续<br>每人 23,900韩元<br>五花肉 + 酱油无骨鸡 + 猪颈肉 + 牛胸肉 + 猪颊肉 + 横膈膜肉 + 薄切五花肉 + 蜂窝猪皮 + 猪肉烤肉 + 牛大肠 + 蔬菜包 + 饮料<span class="unlimited">无限</span> + 米饭<span class="unlimited">无限</span> + 冷面<span class="unlimited">无限</span></p>
      <p data-lang="ja" style="display:none;">フルコース 無限リフィル<br>1人 23,900ウォン<br>サムギョプサル + 醤油チキン + 豚肩ロース + 牛バラ肉 + 豚トロ + ハラミ + 薄切りサムギョプサル + 豚皮（ハチの巣）+ 豚プルコギ + 牛ホルモン + 野菜サム + 飲み物<span class="unlimited">飲み放題</span> + ご飯<span class="unlimited">無制限</span> + 冷麺<span class="unlimited">食べ放題</span></p>
      <p data-lang="vi" style="display:none;"><strong class="course-label">Full</strong> Buffet Không Giới Hạn<br>23,900 KRW/người<br>Ba chỉ + Gà xì dầu + Thịt cổ + Ức bò + Má heo + Thăn sườn + Ba chỉ thái mỏng + Da heo tổ ong + Bulgogi heo + Lòng bò + Rau cuốn + Nước uống <span class="unlimited">không giới hạn</span> + Cơm <span class="unlimited">không giới hạn</span> + Mì lạnh <span class="unlimited">không giới hạn</span></p>
      <p data-lang="th" style="display:none;"><strong class="course-label">Full</strong> คอร์สบุฟเฟ่ต์เต็มรูปแบบ<br>คนละ 23,900 วอน<br>หมูสามชั้น + ไก่ซอสถั่วเหลือง + คอหมู + เนื้อวัว + สันในหมู + หมูสไลซ์บาง + หนังหมู + หมูบูลโกกิ + ไส้วัว + ผักห่อ + เครื่องดื่ม<span class="unlimited">ไม่อั้น</span> + ข้าว<span class="unlimited">ไม่อั้น</span> + บะหมี่เย็น<span class="unlimited">ไม่อั้น</span>
      <p data-lang="ph" style="display:none;"><strong class="course-label">Full</strong> Unlimited Full Course<br>₩23,900 bawat tao<br>Pork belly + Soy chicken + Pork neck + Beef brisket + Pork jowl + Skirt meat + Thin pork + Pork skin + Pork bulgogi + Beef intestine + Veggies + <span class="unlimited">Unlimited</span> drinks + <span class="unlimited">Unlimited</span> rice + <span class="unlimited">Unlimited</span> cold noodles</p>
      <p data-lang="fr" style="display:none;">Formule <strong class="course-label">Complète</strong> à volonté<br>23 900₩ par personne<br>Porc + poulet sauce soja + échine + poitrine de bœuf + joue + hampe + poitrine fine + couenne + bulgogi + tripes + légumes + boissons <span class="unlimited">illimitées</span> + riz <span class="unlimited">illimité</span> + nouilles froides <span class="unlimited">illimitées</span></p>
      <p data-lang="es" style="display:none;">Curso <strong class="course-label">Completo</strong> Ilimitado<br>23,900₩ por persona<br>Cerdo + pollo en salsa de soja + cuello + falda + papada + entraña + panceta fina + piel panal + bulgogi + intestino + vegetales + bebidas <span class="unlimited">ilimitadas</span> + arroz <span class="unlimited">ilimitado</span> + fideos fríos <span class="unlimited">ilimitados</span></p>
      <p data-lang="pt" style="display:none;">Curso <strong class="course-label">Completo</strong> Rodízio<br>₩23.900 por pessoa<br>Barriga de porco + frango ao molho de soja + pescoço + peito + bochecha + fraldinha + pele em favo + bulgogi + tripas + legumes + bebidas <span class="unlimited">ilimitados</span>+ arroz <span class="unlimited">ilimitados</span> + macarrão frio <span class="unlimited">ilimitados</span></p>
      <p data-lang="ar" style="display:none; direction: rtl;"><strong>بوفيه كامل</strong>غير محدود<br>23,900₩ للشخص<br>لحم خنزير + دجاج صويا + رقبة + صدر + جلد + بولغوغي + أمعاء + خضار +    مشروبات <span class="unlimited">غير محدودة</span> + أرز <span class="unlimited">غير محدود</span> + نودلز باردة <span class="unlimited">غير محدودة</span></p>
      <p data-lang="ru" style="display:none;">Полный <strong class="course-label">курс</strong> безлимит<br>23,900₩ за человека<br>Свинина + курица в соевом соусе + шея + грудинка + щека + диафрагма + тонко нарезанная свинина + кожа + булгоги + кишки + овощи + Напитки <span class="unlimited">безлимит</span> + Рис <span class="unlimited">безлимит</span> + Холодная лапша <span class="unlimited">безлимит</span></p>
      <p data-lang="tr" style="display:none;"><strong class="course-label">Tam</strong> Kurs Sınırsız<br>Kişi başı ₩23.900<br>Domuz eti + soya soslu tavuk + boyun + dana göğüs + yanak + diyafram + ince dilimlenmiş domuz eti + deri + bulgogi + bağırsak + sebze + İçecekler <span class="unlimited">sınırsız</span> + Pilav <span class="unlimited">sınırsız</span> + Soğuk erişte <span class="unlimited">sınırsız</span></p>
    `;
  }

  detailBox.innerHTML = content;
  detailBox.style.display = "block";

  // ✅ 페이드인 효과를 위해 약간의 지연 후 show 클래스 추가
  setTimeout(() => detailBox.classList.add("show"), 10);

  // 현재 언어만 표시
  const currentLang = document.documentElement.lang || 'ko';
  detailBox.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = (el.getAttribute('data-lang') === currentLang) ? '' : 'none';
  });
}

// 사이드 메뉴 상세
function showSideDetail() {
  const detailBox = document.getElementById("sideDetailBox");
  let content = `
    <!-- 한국어 -->
    <p data-lang="ko">
      <strong>사이드메뉴</strong><br>
      함흥냉면 <span class="small-note">(물냉면/비빔냉면)</span> 4,500원<br>
      공기밥 <span class="small-note">(전인원 주문시 <span class="unlimited">무제한</span>)</span> 1,000원<br>
      음료수 <span class="small-note">(캔음료)</span> 2,500원<br>
      음료수 <span class="unlimited">무제한</span> <span class="small-note">(전인원 주문 필요)</span> 1인 2,500원<br>
      한강라면 1,500원<br>
      된장찌개 2,000원<br>
      소주 5,500원<br>
      맥주 6,000원<br>
      청하 / 과일소주 6,500원
    </p>

    <!-- English -->
    <p data-lang="en" style="display:none;">
      <strong>Side Menu</strong><br>
      Cold noodles <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> 4,500 KRW<br>
      White rice <span class="small-note">(<span class="unlimited">Unlimited</span> if ordered for all)</span> 1,000 KRW<br>
      Beverage <span class="small-note">(Canned drink)</span> 2,500 KRW<br>
      <span class="unlimited">Unlimited</span> beverage <span class="small-note">(All must order)</span> 2,500 KRW per person<br>
      Hangang ramen 1,500 KRW<br>
      Doenjang stew 2,000 KRW<br>
      Soju 5,500 KRW<br>
      Beer 6,000 KRW<br>
      Cheongha / Fruit Soju 6,500 KRW
    </p>

    <!-- 中文 -->
    <p data-lang="zh" style="display:none;">
      <strong>配菜菜单</strong><br>
      咸兴冷面 <span class="small-note">(水冷面/拌冷面)</span> 4,500韩元<br>
      白米饭 <span class="small-note">(全员点单时<span class="unlimited">无限</span>续)</span> 1,000韩元<br>
      饮料 <span class="small-note">(罐装)</span> 2,500韩元<br>
      饮料<span class="unlimited">无限</span> <span class="small-note">(需全员点单)</span> 每人 2,500韩元<br>
      汉江拉面 1,500韩元<br>
      大酱汤 2,000韩元<br>
      烧酒 5,500韩元<br>
      啤酒 6,000韩元<br>
      清河 / 水果烧酒 6,500韩元
    </p>

    <!-- 日本語 -->
    <p data-lang="ja" style="display:none;">
      <strong>サイドメニュー</strong><br>
      咸興冷麺 <span class="small-note">(水冷麺/ビビン冷麺)</span> 4,500ウォン<br>
      白ご飯 <span class="small-note">(全員注文時<span class="unlimited">無制限</span>)</span> 1,000ウォン<br>
      飲み物 <span class="small-note">(缶ドリンク)</span> 2,500ウォン<br>
      ドリンク<span class="unlimited">飲み放題</span> <span class="small-note">(全員注文必須)</span> 1人 2,500ウォン<br>
      漢江ラーメン 1,500ウォン<br>
      テンジャンチゲ 2,000ウォン<br>
      ソジュ 5,500ウォン<br>
      ビール 6,000ウォン<br>
      チョンハ / フルーツソジュ 6,500ウォン
    </p>

    <!-- Tiếng Việt -->
    <p data-lang="vi" style="display:none;">
      <strong>Thực đơn phụ</strong><br>
      Mì lạnh <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> 4.500 KRW<br>
      Cơm trắng <span class="small-note">(khi gọi cho cả bàn <span class="unlimited">không giới hạn</span>)</span> 1.000 KRW<br>
      Nước giải khát <span class="small-note">(Lon)</span> 2.500 KRW<br>
      Nước giải khát <span class="unlimited">không giới hạn</span> <span class="small-note">(Cả bàn phải gọi)</span> 2.500 KRW/người<br>
      Mì ramen Hangang 1.500 KRW<br>
      Canh tương đậu (Doenjang) 2.000 KRW<br>
      Soju 5.500 KRW<br>
      Bia 6.000 KRW<br>
      Cheongha / Soju hoa quả 6.500 KRW
    </p>

    <p data-lang="th" style="display:none;">
      <strong>เมนูข้างเคียง</strong><br>
      บะหมี่เย็น 4,500 วอน<br>
      ข้าวเปล่า <span class="small-note">(ถ้าสั่งทั้งโต๊ะ<span class="unlimited">ไม่อั้น</span>)</span> 1,000 วอน<br>
      เครื่องดื่มกระป๋อง 2,500 วอน<br>
      เครื่องดื่ม<span class="unlimited">ไม่อั้น</span> <span class="small-note">(สั่งทุกคน)</span> 2,500 วอน/คน<br>
      ราเม็งฮันกัง 1,500 วอน<br>
      ซุปเต้าเจี้ยว 2,000 วอน<br>
      โซจู 5,500 วอน<br>
      เบียร์ 6,000 วอน<br>
      ชองฮา / โซจูผลไม้ 6,500 วอน
    </p>

    <p data-lang="ph" style="display:none;">
      <strong>Side Menu</strong><br>
      Hamheung cold noodles <span class="small-note">(spicy / mild)</span> ₩4,500<br>
      Steamed rice <span class="small-note">(<span class="unlimited">Unlimited</span> if everyone orders)</span> ₩1,000<br>
      Soft drink <span class="small-note">(can)</span> ₩2,500<br>
      <span class="unlimited">Unlimited</span> drinks <span class="small-note">(requires all members)</span> ₩2,500 each<br>
      Hangang ramen ₩1,500<br>
      Soybean stew ₩2,000<br>
      Soju ₩5,500<br>
      Beer ₩6,000<br>
      Cheongha / Fruit soju ₩6,500
    </p>

    <!-- Français -->
    <p data-lang="fr" style="display:none;">
      <strong>Menu d’accompagnement</strong><br>
      Nouilles froides <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> 4 500₩<br>
      Riz blanc <span class="small-note">(<span class="unlimited">à volonté</span> si commandé pour tous)</span> 1 000₩<br>
      Boisson <span class="small-note">(canette)</span> 2 500₩<br>
      Boissons <span class="unlimited">à volonté</span> <span class="small-note">(commande pour tous requise)</span> 2 500₩/pers.<br>
      Ramen Hangang 1 500₩<br>
      Ragoût de pâte de soja (Doenjang) 2 000₩<br>
      Soju 5 500₩<br>
      Bière 6 000₩<br>
      Cheongha / Soju fruité 6 500₩
    </p>

    <!-- Español -->
    <p data-lang="es" style="display:none;">
      <strong>Menú lateral</strong><br>
      Fideos fríos <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> 4,500₩<br>
      Arroz blanco <span class="small-note">(para todos <span class="unlimited">sin límite</span>)</span> 1,000₩<br>
      Bebida <span class="small-note">(Lata)</span> 2,500₩<br>
      Bebida <span class="unlimited">sin límite</span> <span class="small-note">(Todos deben pedir)</span> 2,500₩ por persona<br>
      Ramen Hangang 1,500₩<br>
      Guiso de pasta de soja (Doenjang) 2,000₩<br>
      Soju 5,500₩<br>
      Cerveza 6,000₩<br>
      Cheongha / Soju de frutas 6,500₩
    </p>

    <!-- Português -->
    <p data-lang="pt" style="display:none;">
      <strong>Menu Lateral</strong><br>
      Macarrão frio <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> ₩4.500<br>
      Arroz branco <span class="small-note">(<span class="unlimited">Ilimitado</span> se pedido para todos)</span> ₩1.000<br>
      Bebida <span class="small-note">(lata)</span> ₩2.500<br>
      Bebida <span class="unlimited">ilimitado</span> <span class="small-note">(todos devem pedir)</span> ₩2.500 por pessoa<br>
      Lámen Hangang ₩1.500<br>
      Ensopado de pasta de soja (Doenjang) ₩2.000<br>
      Soju ₩5.500<br>
      Cerveja ₩6.000<br>
      Cheongha / Soju de frutas ₩6.500
    </p>

    <!-- العربية -->
    <p data-lang="ar" style="display:none;">
      <strong>قائمة الجوانب</strong><br>
      نودلز باردة (مول نينغميون / بيبيم نينغميون) 4,500₩<br>
      أرز أبيض (لكل الطاولة <span class="unlimited">غير محدود</span>) 1,000₩<br>
      مشروب (معلب) 2,500₩<br>
       مشروبات <span class="unlimited">غير محدودة</span> (يجب أن يطلبها الجميع) 2,500₩ للشخص<br>
      رامن هانغانغ 1,500₩<br>
      حساء دوينجانغ 2,000₩<br>
      سوجو 5,500₩<br>
      بيرة 6,000₩<br>
      تشيونغها / سوجو الفواكه 6,500₩
    </p>

    <!-- Русский -->
    <p data-lang="ru" style="display:none;">
      <strong>Сайд-меню</strong><br>
      Холодная лапша <span class="small-note">(Муль-нэнмён / Пибим-нэнмён)</span> 4,500₩<br>
      Белый рис <span class="small-note">(<span class="unlimited">безлимит</span> при заказе для всех)</span> 1,000₩<br>
      Напиток <span class="small-note">(банка)</span> 2,500₩<br>
      <span class="unlimited">Безлимитные</span> напитки <span class="small-note">(при заказе для всех)</span> 2,500₩/чел<br>
      Рамен Ханган 1,500₩<br>
      Соевый суп (Тэнджан-чиге) 2,000₩<br>
      Соджу 5,500₩<br>
      Пиво 6,000₩<br>
      Чхонха / фруктовое соджу 6,500₩
    </p>

    <!-- Türkçe -->
    <p data-lang="tr" style="display:none;">
      <strong>Yan Menü</strong><br>
      Soğuk erişte <span class="small-note">(Mul-naengmyeon / Bibim-naengmyeon)</span> ₩4.500<br>
      Beyaz pirinç <span class="small-note">(Herkes sipariş ederse <span class="unlimited">sınırsız</span>)</span> ₩1.000<br>
      İçecek <span class="small-note">(Kutu)</span> ₩2.500<br>
      <span class="unlimited">Sınırsız</span> içecek <span class="small-note">(Herkes sipariş etmeli)</span> Kişi başı ₩2.500<br>
      Hangang ramen ₩1.500<br>
      Soya ezmesi güveci (Doenjang jjigae) ₩2.000<br>
      Soju ₩5.500<br>
      Bira ₩6.000<br>
      Cheongha / Meyveli Soju ₩6.500
    </p>
  `;

  detailBox.innerHTML = content;
  detailBox.style.display = "block";

  // ✅ 페이드인 효과를 위해 약간의 지연 후 show 클래스 추가
  setTimeout(() => detailBox.classList.add("show"), 10);

  // 현재 언어만 표시
  const currentLang = document.documentElement.lang || 'ko';
  detailBox.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = (el.getAttribute('data-lang') === currentLang) ? '' : 'none';
  });
}
// ✅ 박스 닫기 함수
function closeDetailBox(id) {
  const box = document.getElementById(id);
  if (box) {
    box.classList.remove("show");
    setTimeout(() => {
      box.style.display = "none";
    }, 300);
  }
}
// 이용방법 상세 설명
function showUsageDetail() {
  const usageBox = document.getElementById("usageDetailBox");
  const courseBox = document.getElementById("courseTipBox");
  if (!usageBox) return;

  usageBox.innerHTML = `
    <p data-lang="ko">
      물, 앞접시 → <strong>창가쪽 냉장고</strong><br>
      숟가락 및 젓가락, 냅킨 → <strong>테이블 옆 서랍</strong><br>
      고기, 야채, 야채접시, 반찬, 물티슈, 집게 등 → <strong>셀프바</strong><br>
      <br>
      <strong>셀프로 이용가능!</strong>
    </p>

    <!-- 🇺🇸 영어 -->
    <p data-lang="en" style="display:none;">
      Water and small plates → <strong>Refrigerator by the window</strong><br>
      Spoons, chopsticks, and napkins → <strong>Drawer beside the table</strong><br>
      Meat, vegetables, dishes, side dishes, wet tissues, tongs, etc. → <strong>Self bar</strong><br>
      <br>
      <strong>Everything is self-service!</strong>
    </p>

    <!-- 🇨🇳 중국어 -->
    <p data-lang="zh" style="display:none;">
      水、小盘子 → <strong>窗边冰箱</strong><br>
      勺子、筷子、餐巾纸 → <strong>桌子旁抽屉</strong><br>
      肉、蔬菜、蔬菜盘、小菜、湿巾、夹子等 → <strong>自助吧</strong><br>
      <br>
      <strong>一切都可自助取用！</strong>
    </p>

    <!-- 🇯🇵 일본어 -->
    <p data-lang="ja" style="display:none;">
      水、小皿 → <strong>窓際の冷蔵庫</strong><br>
      スプーン・箸・ナプキン → <strong>テーブル横の引き出し</strong><br>
      肉・野菜・野菜皿・おかず・おしぼり・トングなど → <strong>セルフバー</strong><br>
      <br>
      <strong>すべてセルフサービスです！</strong>
    </p>

    <!-- 🇻🇳 베트남어 -->
    <p data-lang="vi" style="display:none;">
      Nước, đĩa nhỏ → <strong>Tủ lạnh cạnh cửa sổ</strong><br>
      Muỗng, đũa và khăn giấy → <strong>Ngăn kéo bên bàn</strong><br>
      Thịt, rau, đĩa rau, món phụ, khăn ướt, kẹp, v.v. → <strong>Quầy tự phục vụ</strong><br>
      <br>
      <strong>Tất cả đều tự phục vụ!</strong>
    </p>

    <!-- 🇹🇭 태국어 -->
    <p data-lang="th" style="display:none;">
      น้ำและจานเล็ก → <strong>ตู้เย็นริมหน้าต่าง</strong><br>
      ช้อน ตะเกียบ และกระดาษทิชชู → <strong>ลิ้นชักข้างโต๊ะ</strong><br>
      เนื้อ ผัก จานผัก กับข้าว ทิชชูเปียก คีมคีบ ฯลฯ → <strong>บาร์บริการตัวเอง</strong><br>
      <br>
      <strong>ทุกอย่างสามารถใช้ได้ด้วยตนเอง!</strong>
    </p>

    <!-- 🇵🇭 필리핀어 -->
    <p data-lang="ph" style="display:none;">
      Tubig at maliit na plato → <strong>Refrigerator sa tabi ng bintana</strong><br>
      Kutsara, tinidor, at tissue → <strong>Drawer sa tabi ng mesa</strong><br>
      Karne, gulay, side dish, basang tissue, sipit, at iba pa → <strong>Self bar</strong><br>
      <br>
      <strong>Lahat ay self-service!</strong>
    </p>

    <!-- 🇫🇷 프랑스어 -->
    <p data-lang="fr" style="display:none;">
      Eau et petites assiettes → <strong>Réfrigérateur près de la fenêtre</strong><br>
      Cuillères, baguettes et serviettes → <strong>Tiroir à côté de la table</strong><br>
      Viande, légumes, plats, accompagnements, lingettes, pinces, etc. → <strong>Bar en libre-service</strong><br>
      <br>
      <strong>Tout est en libre-service !</strong>
    </p>

    <!-- 🇪🇸 스페인어 -->
    <p data-lang="es" style="display:none;">
      Agua y platos pequeños → <strong>Refrigerador junto a la ventana</strong><br>
      Cucharas, palillos y servilletas → <strong>Cajón al lado de la mesa</strong><br>
      Carne, verduras, platos, guarniciones, toallitas, pinzas, etc. → <strong>Barra de autoservicio</strong><br>
      <br>
      <strong>¡Todo es autoservicio!</strong>
    </p>

    <!-- 🇵🇹 포르투갈어 -->
    <p data-lang="pt" style="display:none;">
      Água e pratinhos → <strong>Geladeira ao lado da janela</strong><br>
      Colheres, hashis e guardanapos → <strong>Gaveta ao lado da mesa</strong><br>
      Carne, vegetais, acompanhamentos, guardanapos úmidos, pinças, etc. → <strong>Bar de autoatendimento</strong><br>
      <br>
      <strong>Tudo é autoatendimento!</strong>
    </p>

    <!-- 🇸🇦 아랍어 -->
    <p data-lang="ar" style="display:none;">
      الماء والأطباق الصغيرة → الثلاجة بجانب النافذة<br>
      الملاعق والعيدان والمناديل → الدرج بجانب الطاولة<br>
      اللحم، الخضروات، الأطباق الجانبية، المناديل المبللة، الملاقط، إلخ → بار الخدمة الذاتية<br>
      <br>
      <strong>كل شيء بخدمة ذاتية!</strong>
    </p>

    <!-- 🇷🇺 러시아어 -->
    <p data-lang="ru" style="display:none;">
      Вода и маленькие тарелки → <strong>Холодильник у окна</strong><br>
      Ложки, палочки и салфетки → <strong>Ящик рядом со столом</strong><br>
      Мясо, овощи, гарниры, влажные салфетки, щипцы и т.д. → <strong>Зона самообслуживания</strong><br>
      <br>
      <strong>Всё в формате самообслуживания!</strong>
    </p>

    <!-- 🇹🇷 튀르키예어 -->
    <p data-lang="tr" style="display:none;">
      Su ve küçük tabaklar → <strong>Pencere kenarındaki buzdolabı</strong><br>
      Kaşık, çubuk ve peçeteler → <strong>Masanın yanındaki çekmece</strong><br>
      Et, sebzeler, yan yemekler, ıslak mendil, maşa vb. → <strong>Self-servis barı</strong><br>
      <br>
      <strong>Her şey self-servistir!</strong>
    </p>
      `;

  usageBox.style.display = "block";
  setTimeout(() => usageBox.classList.add("show"), 10);
  usageBox.classList.add("show");

  const currentLang = document.documentElement.lang || 'ko';
  usageBox.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = (el.getAttribute('data-lang') === currentLang) ? '' : 'none';
  });
}

// ✅ 코스별 이용팁 상세 표시
function showCourseTips() {
  const detailBox = document.getElementById("courseTipBox");
  const usageBox = document.getElementById("usageDetailBox");
  if (!detailBox) return;

  detailBox.innerHTML = `
    <p data-lang="ko">
     <strong>A 코스</strong>: 고기와 야채, 그리고 각종 소스를 이용가능한 코스<br>
     <em>이용팁</em>: 고기는 도마, 야채는 야채접시, 반찬은 앞접시를 이용한다.<br><br>

     <strong>B 코스</strong>: A 코스에 치킨 무제한이 포함된 코스<br>
     <em>이용팁</em>: 치킨은 테이블벨을 이용하여 직원에게 리필 요청한다.<br>
     고기는 도마, 야채는 야채접시, 반찬은 앞접시를 이용한다.<br><br>

     <strong>Full 코스</strong>: A 코스에 치킨, 공기밥, 냉면, 음료수까지 무제한 포함된 코스<br>
     <em>이용팁</em>: 치킨, 냉면, 음료수는 테이블 벨로 리필 요청.<br>
     (냉면 → 물냉면/비빔냉면, 음료 → 콜라/제로콜라/사이다)
   </p>

   <p data-lang="en" style="display:none;">
     <strong>Course A</strong>: Includes meat, vegetables, and sauces.<br>
     <em>Tip</em>: Use the cutting board for meat, the vegetable plate for veggies, and the small plate for side dishes.<br><br>

     <strong>Course B</strong>: Adds unlimited chicken to Course A.<br>
     <em>Tip</em>: Ask for chicken refills using the table bell. Use the cutting board for meat, the vegetable plate for veggies, and the small plate for side dishes.<br><br>

     <strong>Full Course</strong>: Includes Course A + chicken + unlimited rice, cold noodles, and beverages.<br>
     <em>Tip</em>: Use the table bell for refills of chicken, cold noodles, and drinks.<br>
     (Cold noodles → Mul-naengmyeon / Bibim-naengmyeon, Drinks → Cola / Zero Cola / Sprite)
   </p>

   <p data-lang="zh" style="display:none;">
     <strong>A 套餐</strong>: 可享用肉类、蔬菜和各种酱料。<br>
     <em>提示</em>: 肉用砧板，蔬菜用蔬菜盘，小菜用小盘。<br><br>

     <strong>B 套餐</strong>: 在A套餐基础上增加无限量鸡肉。<br>
     <em>提示</em>: 鸡肉请按桌上铃呼叫员工加餐。肉用砧板，蔬菜用蔬菜盘，小菜用小盘。<br><br>

     <strong>Full 套餐</strong>: A套餐基础上增加鸡肉、米饭、冷面、饮料无限量。<br>
     <em>提示</em>: 鸡肉、冷面、饮料可按桌上铃呼叫员工加餐。<br>
     （冷面→水冷面/拌冷面，饮料→可乐/零度可乐/雪碧）
   </p>

   <p data-lang="ja" style="display:none;">
     <strong>A コース</strong>: 肉、野菜、各種ソースが利用可能なコース。<br>
     <em>ヒント</em>: 肉はまな板、野菜は野菜皿、おかずは取り皿を使用。<br><br>

     <strong>B コース</strong>: Aコースにチキン食べ放題が追加されたコース。<br>
     <em>ヒント</em>: チキンはテーブルベルでスタッフにリフィルを依頼。肉はまな板、野菜は野菜皿、おかずは取り皿を使用。<br><br>

     <strong>Full コース</strong>: Aコースにチキン、ご飯、冷麺、飲み物の食べ放題が追加。<br>
     <em>ヒント</em>: チキン、冷麺、飲み物はテーブルベルでスタッフに依頼。<br>
     （冷麺→水冷麺/ビビン冷麺、飲み物→コーラ/ゼロコーラ/サイダー）
   </p>

   <p data-lang="vi" style="display:none;">
     <strong>Suất A</strong>: Bao gồm thịt, rau và các loại nước sốt.<br>
     <em>Mẹo</em>: Dùng thớt cho thịt, đĩa rau cho rau, đĩa nhỏ cho món phụ.<br><br>

     <strong>Suất B</strong>: Giống suất A nhưng có thêm gà không giới hạn.<br>
     <em>Mẹo</em>: Nhấn chuông bàn để yêu cầu thêm gà. Dùng thớt cho thịt, đĩa rau cho rau, đĩa nhỏ cho món phụ.<br><br>

     <strong>Suất Full</strong>: Bao gồm suất A + gà + cơm, mì lạnh và nước uống không giới hạn.<br>
     <em>Mẹo</em>: Nhấn chuông bàn để yêu cầu thêm gà, mì lạnh, hoặc nước uống.<br>
     (Mì lạnh → Mul-naengmyeon / Bibim-naengmyeon, Nước → Cola / Zero Cola / Sprite)
   </p>

   <p data-lang="th" style="display:none;">
     <strong>คอร์ส A</strong>: สามารถเลือกเนื้อ ผัก และซอสต่างๆ ได้ไม่จำกัด<br>
     <em>เคล็ดลับ</em>: ใช้เขียงสำหรับเนื้อ จานผักสำหรับผัก และจานเล็กสำหรับกับข้าว<br><br>

     <strong>คอร์ส B</strong>: คอร์ส A พร้อมไก่ซอสถั่วเหลืองไม่อั้น<br>
     <em>เคล็ดลับ</em>: กดกริ่งเรียกพนักงานเพื่อขอรีฟิลไก่<br>
     ใช้เขียงสำหรับเนื้อ จานผักสำหรับผัก และจานเล็กสำหรับกับข้าว<br><br>

     <strong>คอร์ส Full</strong>: รวมเนื้อ ไก่ ข้าว บะหมี่เย็น และเครื่องดื่มไม่จำกัด<br>
     <em>เคล็ดลับ</em>: ใช้กริ่งเรียกพนักงานเมื่ออยากรีฟิลไก่ บะหมี่ หรือเครื่องดื่ม<br>
     (บะหมี่เย็น: แบบน้ำ/แบบเผ็ด, เครื่องดื่ม: โคล่า/โคล่าไม่มีน้ำตาล/ไซเดอร์)
   </p>

   <p data-lang="ph" style="display:none;">
     <strong>A Course</strong>: Maaaring kumuha ng karne, gulay, at iba't ibang sawsawan<br>
     <em>Tip</em>: Gumamit ng chopping board para sa karne, plato ng gulay para sa gulay, at maliit na plato para sa side dish.<br><br>

     <strong>B Course</strong>: Katulad ng A Course ngunit may unlimited soy chicken<br>
     <em>Tip</em>: Gamitin ang table bell para humingi ng refill ng chicken sa staff.<br>
     Gumamit ng chopping board, plato ng gulay, at maliit na plato tulad ng A Course.<br><br>

     <strong>Full Course</strong>: May kasamang unlimited chicken, rice, cold noodles, at inumin<br>
     <em>Tip</em>: I-ring ang bell para sa refill ng chicken, noodles, o inumin.<br>
     (Cold noodles: may sabaw o maanghang / Inumin: cola, zero cola, o sprite)
   </p>

   <p data-lang="fr" style="display:none;">
     <strong>Menu A</strong>: Comprend viande, légumes et sauces variées.<br>
     <em>Astuce</em>: Utilisez la planche à découper pour la viande, l’assiette de légumes pour les légumes et la petite assiette pour les accompagnements.<br><br>

     <strong>Menu B</strong>: Ajoute du poulet à volonté au menu A.<br>
     <em>Astuce</em>: Demandez un remplissage du poulet avec la cloche de table.<br><br>

     <strong>Menu Full</strong>: Comprend le menu A + poulet + riz, nouilles froides et boissons à volonté.<br>
     <em>Astuce</em>: Utilisez la cloche pour redemander du poulet, des nouilles ou des boissons.<br>
     (Nouilles froides → Mul-naengmyeon / Bibim-naengmyeon, Boissons → Cola / Zéro Cola / Sprite)
   </p>

   <p data-lang="es" style="display:none;">
     <strong>Menú A</strong>: Incluye carne, verduras y diversas salsas.<br>
     <em>Consejo</em>: Use la tabla para carne, el plato de verduras para vegetales y el plato pequeño para guarniciones.<br><br>

     <strong>Menú B</strong>: Agrega pollo ilimitado al Menú A.<br>
     <em>Consejo</em>: Solicite recargas de pollo con el timbre de mesa.<br><br>

     <strong>Menú Full</strong>: Incluye Menú A + pollo + arroz, fideos fríos y bebidas ilimitadas.<br>
     <em>Consejo</em>: Use el timbre para solicitar recargas. (Fideos fríos → Mul-naengmyeon / Bibim-naengmyeon, Bebidas → Cola / Zero Cola / Sprite)
   </p>

   <p data-lang="pt" style="display:none;">
     <strong>Curso A</strong>: Inclui carne, legumes e molhos variados.<br>
     <em>Dica</em>: Use a tábua para carne, o prato de legumes para vegetais e o prato pequeno para acompanhamentos.<br><br>

     <strong>Curso B</strong>: Adiciona frango ilimitado ao Curso A.<br>
     <em>Dica</em>: Peça mais frango usando o sino da mesa.<br><br>

     <strong>Curso Full</strong>: Inclui Curso A + frango + arroz, macarrão frio e bebidas ilimitadas.<br>
     <em>Dica</em>: Use o sino da mesa para pedir reposição de frango, macarrão ou bebidas.<br>
     (Macarrão frio → Mul-naengmyeon / Bibim-naengmyeon, Bebidas → Cola / Zero Cola / Sprite)
   </p>

   <p data-lang="ar" style="display:none;">
     <strong>قائمة A</strong>: تشمل اللحوم والخضروات والصلصات المختلفة.<br>
     <em>نصيحة</em>: استخدم لوح التقطيع للحوم، طبق الخضار للخضروات، والطبق الصغير للأطباق الجانبية.<br><br>

     <strong>قائمة B</strong>: تشمل نفس محتوى A بالإضافة إلى دجاج غير محدود.<br>
     <em>نصيحة</em>: اطلب المزيد من الدجاج باستخدام جرس الطاولة.<br><br>

     <strong>قائمة Full</strong>: تشمل قائمة A مع دجاج، أرز، نودلز باردة ومشروبات غير محدودة.<br>
     <em>نصيحة</em>: استخدم جرس الطاولة لطلب إعادة التعبئة. (النودلز الباردة → Mul-naengmyeon / Bibim-naengmyeon، المشروبات → كوكاكولا / زيرو كولا / سبرايت)
   </p>

   <p data-lang="ru" style="display:none;">
     <strong>Курс A</strong>: Включает мясо, овощи и различные соусы.<br>
     <em>Совет</em>: Используйте разделочную доску для мяса, тарелку для овощей и маленькую тарелку для гарниров.<br><br>

     <strong>Курс B</strong>: Добавляет безлимитную курицу к Курсу A.<br>
     <em>Совет</em>: Попросите добавку курицы с помощью настольного звонка.<br><br>

     <strong>Полный курс</strong>: Включает Курс A + курицу + безлимитный рис, холодную лапшу и напитки.<br>
     <em>Совет</em>: Используйте звонок, чтобы заказать добавку курицы, лапши или напитков.
   </p>

   <p data-lang="tr" style="display:none;">
     <strong>A Kursu</strong>: Et, sebze ve çeşitli sosları içerir.<br>
     <em>İpucu</em>: Et için kesme tahtası, sebzeler için sebze tabağı, yan yemekler için küçük tabak kullanın.<br><br>

     <strong>B Kursu</strong>: A Kursuna sınırsız tavuk eklenmiştir.<br>
     <em>İpucu</em>: Tavuk yenilemesi için masa zilini kullanın.<br><br>

     <strong>Full Kursu</strong>: A Kursuna ek olarak tavuk, pilav, soğuk erişte ve içecekler sınırsızdır.<br>
     <em>İpucu</em>: Tavuk, erişte veya içecek için masa zilini kullanın. (Soğuk erişte → Mul-naengmyeon / Bibim-naengmyeon, İçecekler → Kola / Zero Kola / Sprite)
</p>

  `;

  detailBox.style.display = "block";
  setTimeout(() => detailBox.classList.add("show"), 10);
  usageBox.classList.add("show");

  const currentLang = document.documentElement.lang || 'ko';
  detailBox.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = (el.getAttribute('data-lang') === currentLang) ? '' : 'none';
  });
}

// ✅ 가마솥뚜껑 상세 표시 (다국어 완전판)
function showGamasotDetail() {
  const box = document.getElementById("gamasotDetailBox");
  if (!box) return;

  const content = `
     <div class="detail-header">
      <span class="close-btn" onclick="closeDetailBox('gamasotDetailBox')">✕</span>
    </div>
    
    <p data-lang="ko">
      <strong>가마솥의 유래와 특징</strong><br><br>
      가마솥은 삼국시대 이전(약 2,000년 전)부터 사용된 것으로 추정되며,
      무쇠로 만든 가마솥은 삼국시대 후기(약 1,400년 전)부터 서민들에게 보급되었습니다.<br><br>
      무쇠는 열전도율이 낮아 천천히 달궈지지만, 열이 쉽게 식지 않고 오래 유지됩니다.
      덕분에 열이 고르게 전달되어 고기가 맛있게 익습니다.<br><br>
      이처럼 가마솥은 한국의 전통 조리 도구이자, 가족의 상징과 공동체 문화를 담은 중요한 생활 용구입니다.
    </p>

    <p data-lang="en" style="display:none;">
      <strong>Origins and Features of the Iron Pot Lid (Gamasot)</strong><br><br>
      The gamasot (iron pot) is believed to have been used since before the Three Kingdoms period (about 2,000 years ago).
      Cast-iron versions became common among ordinary people around 1,400 years ago.<br><br>
      Cast iron heats slowly due to its low thermal conductivity, but it retains heat well.
      This even, lasting heat cooks meat thoroughly and deliciously.<br><br>
      The gamasot is a traditional Korean cooking tool and a symbol of family and community culture.
    </p>

    <p data-lang="zh" style="display:none;">
      <strong>铁釜锅盖的由来与特点</strong><br><br>
      据推测，铁釜在三国时代以前（约 2000 年前）就已被使用；
      生铁制的铁釜在三国后期（约 1400 年前）开始在平民中普及。<br><br>
      生铁导热率较低，加热较慢，但保温性极佳，热量分布均匀，
      因而能使肉类熟得更香更均匀。<br><br>
      铁釜不仅是韩国的传统烹饪用具，也承载着家庭与共同体文化的象征意义。
    </p>

    <p data-lang="ja" style="display:none;">
      <strong>釜蓋（かまぶた）の由来と特徴</strong><br><br>
      釜は三国時代以前（約 2000 年前）から使用されていたとされ、
      鋳鉄製の釜は三国時代後期（約 1400 年前）から庶民にも普及しました。<br><br>
      鋳鉄は熱伝導率が低くゆっくり温まりますが、熱保持に優れ均一に熱が伝わるため、
      肉が美味しく焼き上がります。<br><br>
      釜は韓国の伝統的な調理器具であり、家族や共同体文化の象徴でもあります。
    </p>

    <p data-lang="vi" style="display:none;">
      <strong>Nắp nồi gang (Gamasot) — nguồn gốc và đặc điểm</strong><br><br>
      Gamasot được cho là đã xuất hiện từ trước thời Tam Quốc (khoảng 2.000 năm trước).
      Phiên bản bằng gang trở nên phổ biến trong dân chúng khoảng 1.400 năm trước.<br><br>
      Gang dẫn nhiệt chậm nhưng giữ nhiệt lâu, tỏa nhiệt đều nên thịt chín ngon và đồng đều.<br><br>
      Gamasot là dụng cụ nấu ăn truyền thống của Hàn Quốc, đồng thời là biểu tượng của gia đình và văn hóa cộng đồng.
    </p>

    <p data-lang="th" style="display:none;">
      <strong>ที่มาของหม้อเหล็ก (กามาซ็อต)</strong><br><br>
      หม้อเหล็กถูกใช้ในเกาหลีตั้งแต่ก่อนยุคสามก๊ก (ราว 2,000 ปีก่อน)<br>
      หม้อเหล็กหล่อเริ่มแพร่หลายในหมู่ชาวบ้านราว 1,400 ปีก่อน<br><br>
      หม้อเหล็กรักษาความร้อนได้ดี ทำให้อาหารสุกทั่วถึงและอร่อย<br>
      จึงเป็นสัญลักษณ์ของครอบครัวและวัฒนธรรมการกินร่วมกันในเกาหลี
    </p>

    <p data-lang="ph" style="display:none;">
      <strong>Pinagmulan ng “Gamasot” (Iron Pot)</strong><br><br>
      Ginagamit sa Korea bago pa ang panahon ng Three Kingdoms (mahigit 2,000 taon na ang nakaraan).<br>
      Ang cast iron pot ay naging karaniwan sa mga tao mga 1,400 taon na ang nakalipas.<br><br>
      Mabagal itong uminit ngunit matagal ding mananatiling mainit, kaya pantay ang pagkaluto ng karne.<br>
      Isa itong simbolo ng pamilya at pagkakaisa sa kulturang Koreano.
    </p>

    <p data-lang="fr" style="display:none;">
      <strong>Le couvercle de marmite en fonte (Gamasot) — origine et caractéristiques</strong><br><br>
      Le gamasot aurait été utilisé avant la période des Trois Royaumes (il y a environ 2 000 ans) ;
      les versions en fonte se sont répandues parmi le peuple il y a environ 1 400 ans.<br><br>
      La fonte chauffe lentement en raison de sa faible conductivité thermique, mais conserve très bien la chaleur,
      ce qui assure une diffusion uniforme et une cuisson savoureuse des viandes.<br><br>
      Le gamasot est à la fois un ustensile de cuisine traditionnel coréen et un symbole de la famille et de la communauté.
    </p>

    <p data-lang="es" style="display:none;">
      <strong>Tapa de olla de hierro (Gamasot) — origen y características</strong><br><br>
      Se cree que el gamasot se utilizaba antes del período de los Tres Reinos (hace unos 2.000 años),
      y las versiones de hierro fundido se popularizaron entre la gente común hace unos 1.400 años.<br><br>
      El hierro fundido se calienta lentamente por su baja conductividad térmica, pero retiene muy bien el calor,
      distribuyéndolo de forma uniforme para cocinar la carne de manera deliciosa.<br><br>
      El gamasot es una herramienta culinaria tradicional coreana y un símbolo de la familia y la cultura comunitaria.
    </p>

    <p data-lang="pt" style="display:none;">
      <strong>Tampa de panela de ferro (Gamasot) — origem e características</strong><br><br>
      Acredita-se que o gamasot tenha sido usado antes do período dos Três Reinos (há cerca de 2.000 anos);
      as versões em ferro fundido se popularizaram entre o povo comum há cerca de 1.400 anos.<br><br>
      O ferro fundido aquece lentamente devido à baixa condutividade térmica, mas mantém o calor por muito tempo,
      distribuindo-o de forma uniforme para um cozimento saboroso da carne.<br><br>
      O gamasot é um utensílio de cozinha tradicional coreano e um símbolo da família e da cultura comunitária.
    </p>

    <p data-lang="ar" style="display:none; direction: rtl; text-align: right;">
      <strong>غطاء قدر الحديد (غاماسوت) — الأصل والميزات</strong><br><br>
      يُعتقد أن الغاماسوت استُخدم منذ ما قبل عصر الممالك الثلاث (قبل نحو 2000 عام)،
      وأصبحت الأواني المصنوعة من الحديد المصبوب شائعة بين الناس قبل نحو 1400 عام.<br><br>
      يسخن الحديد المصبوب ببطء بسبب انخفاض التوصيل الحراري، لكنه يحتفظ بالحرارة جيدًا
      ويوزعها بشكل متساوٍ، مما يجعل اللحم يُطهى بنكهة ممتازة.<br><br>
      الغاماسوت أداة طهي كورية تقليدية ورمز للعائلة والثقافة المجتمعية.
    </p>

    <p data-lang="ru" style="display:none;">
      <strong>Крышка чугунного котла (Гамасот) — происхождение и особенности</strong><br><br>
      Считается, что гамасот использовался ещё до периода Трёх царств (около 2000 лет назад),
      а чугунные версии стали распространены среди простого народа примерно 1400 лет назад.<br><br>
      Чугун медленно нагревается из-за низкой теплопроводности, но хорошо удерживает тепло
      и равномерно его распределяет, благодаря чему мясо прожаривается вкусно и равномерно.<br><br>
      Гамасот — это традиционная корейская утварь и символ семьи и общинной культуры.
    </p>

    <p data-lang="tr" style="display:none;">
      <strong>Dökme demir tencere kapağı (Gamasot) — köken ve özellikler</strong><br><br>
      Gamasot’un Üç Krallıklar döneminden önce (yaklaşık 2000 yıl önce) kullanıldığı düşünülür;
      dökme demir versiyonları yaklaşık 1400 yıl önce halk arasında yaygınlaşmıştır.<br><br>
      Dökme demir, düşük ısı iletkenliği nedeniyle yavaş ısınır ancak ısıyı uzun süre korur
      ve eşit dağıtarak eti lezzetli şekilde pişirir.<br><br>
      Gamasot, geleneksel bir Kore pişirme aracı olmasının yanında aile ve topluluk kültürünün de simgesidir.
    </p>
  `;

  box.innerHTML = content;
  box.style.display = "block";
  box.classList.add("show");


  // 현재 언어만 표시
  const currentLang = document.documentElement.lang || 'ko';
  box.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = (el.getAttribute('data-lang') === currentLang) ? '' : 'none';
  });
}

// ✅ 한국식 쌈 상세
function showSsamDetail() {
  const ssamBox = document.getElementById("ssamDetailBox");
  if (!ssamBox) return;

  ssamBox.innerHTML = `
    <div class="detail-header">
      <span class="close-btn" onclick="closeDetailBox('ssamDetailBox')">✕</span>
    </div>

    <p data-lang="ko">
      <strong>쌈이란?</strong><br>
      본인 입맛에 맞게 싸서 먹는 것이 정답이다.<br><br>
      야채에 참기름 혹은 콩가루를 찍은 고기를 올리고, 쌈장을 올려서 먹는다.<br>
      위와 같은 방식으로 고기에 여러 가지 소스를 찍어서 야채 위에 올리고, 
      기호에 맞는 파절이, 김치, 구운 마늘, 콩나물 등을 곁들여서 먹는다.<br><br>
      고기 본연의 맛을 즐기고 싶다면, 고기에 소금만 찍어 먹는 것을 추천한다.
    </p>

    <p data-lang="en" style="display:none;">
      <strong>What is Ssam?</strong><br>
      The Korean way to enjoy barbecue is wrapping it your own way.<br><br>
      Place grilled meat dipped in sesame oil or soybean powder on a leaf, add ssamjang (soybean paste sauce), and eat in one bite.<br>
      You can also add other sauces to the meat and wrap it with vegetables, along with green onions, kimchi, grilled garlic, or bean sprouts as you like.<br><br>
      To enjoy the pure flavor of the meat, try dipping it only in salt.
    </p>

    <p data-lang="zh" style="display:none;">
      <strong>什么是包菜(쌈)?</strong><br>
      根据个人口味包着吃就是正确的方式。<br><br>
      在蔬菜叶上放上蘸了香油或黄豆粉的烤肉，再加上包酱一起食用。<br>
      也可以蘸上各种酱料后包上蔬菜，加上葱丝、泡菜、烤蒜、豆芽等一起享用。<br><br>
      想品尝肉的原味时，只蘸盐食用即可。
    </p>

    <p data-lang="ja" style="display:none;">
      <strong>サムとは？</strong><br>
      自分の好みに合わせて包んで食べるのが正解。<br><br>
      野菜にごま油やきな粉をつけた肉をのせ、サムジャンをのせて食べる。<br>
      同じように肉にいろいろなソースをつけて野菜にのせ、好みに合わせてネギサラダ、キムチ、焼きニンニク、もやしなどを添えて食べる。<br><br>
      肉本来の味を楽しみたい場合は、塩だけで食べるのがおすすめ。
    </p>

    <p data-lang="vi" style="display:none;">
      <strong>Ssam là gì?</strong><br>
      Cách đúng là cuốn và ăn theo khẩu vị riêng của bạn.<br><br>
      Đặt thịt nướng đã chấm dầu mè hoặc bột đậu lên rau, thêm tương ssamjang và ăn.<br>
      Cũng có thể chấm thịt với nhiều loại sốt khác nhau, đặt lên rau và ăn kèm hành trộn, kimchi, tỏi nướng hoặc giá đỗ tùy sở thích.<br><br>
      Nếu muốn thưởng thức vị thịt nguyên bản, hãy chấm thịt với muối.
    </p>

    <p data-lang="th" style="display:none;">
      <strong>ซัม (쌈) คืออะไร?</strong><br>
      คือการห่ออาหารตามใจชอบของคุณ!<br><br>
      วางเนื้อที่จิ้มซอสน้ำมันงาหรือผงถั่วบนผัก แล้วใส่ซัมจัง (ซอสถั่วหมัก)<br>
      สามารถเพิ่มหัวหอมดอง กิมจิ กระเทียมย่าง หรือถั่วงอกได้ตามชอบ<br><br>
      ถ้าอยากลิ้มรสเนื้อแท้ๆ แนะนำให้จิ้มเกลือเพียงเล็กน้อย
    </p>

    <p data-lang="ph" style="display:none;">
      <strong>Ano ang “Ssam”?</strong><br>
      Ito ay paraan ng pagkain na ikaw ang bumubuo ng perpektong kagat!<br><br>
      Ilagay ang karne sa dahon ng gulay, lagyan ng sesame oil o soybean powder, at ng ssamjang (spicy soybean paste).<br>
      Maaari mong dagdagan ng kimchi, bean sprouts, o bawang ayon sa panlasa.<br><br>
      Kung gusto mo maramdaman ang tunay na lasa ng karne, simpleng asin lang ang kailangan.
    </p>

    <p data-lang="fr" style="display:none;">
      <strong>Qu’est-ce que le Ssam ?</strong><br>
      La bonne façon est de l’envelopper selon votre goût personnel.<br><br>
      Mettez de la viande grillée trempée dans de l’huile de sésame ou de la poudre de soja sur une feuille de légume, ajoutez du ssamjang et dégustez.<br>
      Vous pouvez aussi varier les sauces et accompagner de kimchi, d’ail grillé, de germes de soja, etc.<br><br>
      Pour savourer la viande pure, trempez-la simplement dans du sel.
    </p>

    <p data-lang="es" style="display:none;">
      <strong>¿Qué es el Ssam?</strong><br>
      La forma correcta es envolver y comer según tu gusto.<br><br>
      Coloca carne asada bañada en aceite de sésamo o polvo de soja sobre una hoja de vegetal, añade ssamjang y cómelo.<br>
      También puedes usar diferentes salsas y añadir cebolla verde, kimchi, ajo asado o brotes de soja.<br><br>
      Para disfrutar el sabor puro de la carne, solo sumérgela en sal.
    </p>

    <p data-lang="pt" style="display:none;">
      <strong>O que é Ssam?</strong><br>
      O jeito certo é enrolar e comer do seu jeito.<br><br>
      Coloque carne grelhada mergulhada em óleo de gergelim ou farinha de soja sobre uma folha, adicione ssamjang e coma.<br>
      Também pode adicionar vários molhos, legumes, kimchi, alho grelhado e brotos de feijão.<br><br>
      Para saborear o gosto puro da carne, mergulhe apenas no sal.
    </p>

    <p data-lang="ar" style="display:none;">
      <strong>ما هو السام (Ssam)؟</strong><br>
      الطريقة الصحيحة هي أن تلف الطعام حسب ذوقك.<br><br>
      ضع اللحم المشوي المغموس في زيت السمسم أو مسحوق فول الصويا على ورقة خضار، أضف صلصة السامجانغ وتناوله.<br>
      يمكنك أيضًا إضافة صلصات أخرى مع اللحم وتناوله مع الكراث، الكيمتشي، الثوم المشوي، أو براعم الفول حسب ذوقك.<br><br>
      للاستمتاع بطعم اللحم الأصلي، اغمس اللحم بالملح فقط.
    </p>

    <p data-lang="ru" style="display:none;">
      <strong>Что такое сам (Ssam)?</strong><br>
      Правильный способ — заворачивать мясо по своему вкусу.<br><br>
      Положите мясо, обмакнутое в кунжутное масло или соевую муку, на лист салата, добавьте соус самджан и ешьте.<br>
      Можно также использовать разные соусы и добавлять лук, кимчи, жареный чеснок или ростки фасоли.<br><br>
      Чтобы насладиться вкусом самого мяса, попробуйте просто посолить его.
    </p>

    <p data-lang="tr" style="display:none;">
      <strong>Ssam nedir?</strong><br>
      Kendi damak zevkinize göre sarmak ve yemek en doğru yoldur.<br><br>
      Susam yağına veya soya tozuna batırılmış eti bir yaprağın üzerine koyun, ssamjang ekleyin ve yiyin.<br>
      Ayrıca ete farklı soslar ekleyebilir, yeşil soğan, kimchi, kızarmış sarımsak veya fasulye filiziyle birlikte yiyebilirsiniz.<br><br>
      Etin doğal tadını almak için sadece tuza batırmanızı öneririz.
    </p>
  `;

  ssamBox.style.display = "block";
  setTimeout(() => ssamBox.classList.add("show"), 10);

  const currentLang = document.documentElement.lang || 'ko';
  ssamBox.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = (el.getAttribute('data-lang') === currentLang) ? '' : 'none';
  });
}

