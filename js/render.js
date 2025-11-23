// 勢力框架對應
const factionImageMap = {
  "蜀": "shu.png",
  "魏": "wei.png",
  "吳": "wu.png",
  "群": "qun.png"
};

// HP 生成
function getHpDots(currHp, maxHp) {
  if (maxHp >= 6) {
    return `<div class="hp-fraction">${currHp}/${maxHp}</div>`;
  }

  const hpPatternMap = {
    5: {
      5: [3,3,3,3,3],
      4: [0,3,3,3,3],
      3: [0,0,2,2,2],
      2: [0,0,0,2,2],
      1: [0,0,0,0,1],
      0: [0,0,0,0,0]
    },
    4: {
      4: [3,3,3,3],
      3: [0,3,3,3],
      2: [0,0,2,2],
      1: [0,0,0,1],
      0: [0,0,0,0]
    },
    3: {
      3: [3,3,3],
      2: [0,2,2],
      1: [0,0,1],
      0: [0,0,0]
    },
    2: {
      2: [3,3],
      1: [0,2],
      0: [0,0]
    }
  };

  const pattern = hpPatternMap[maxHp][currHp];
  return pattern.map(v => 
    `<img class="hp-dot-img" src="sgs-images/photos/magatama/${v}.png">`
  ).join("");
}

// 長按技能顯示
function addGeneralPressEffect(cardElement) {
  const skillBox = cardElement.querySelector(".skill-box");
  let pressTimer = null;

  const showBox = () => skillBox.style.display = "block";
  const hideBox = () => skillBox.style.display = "none";

  const startPress = () => pressTimer = setTimeout(showBox, 300);
  const cancelPress = () => { clearTimeout(pressTimer); hideBox(); };

  cardElement.addEventListener("mousedown", startPress);
  cardElement.addEventListener("mouseup", cancelPress);
  cardElement.addEventListener("mouseleave", cancelPress);

  cardElement.addEventListener("touchstart", startPress);
  cardElement.addEventListener("touchend", cancelPress);
  cardElement.addEventListener("touchcancel", cancelPress);
}

// -----------------------
//   ⭐ renderGeneral
// -----------------------
function renderGeneral(g) {

  const frame = factionImageMap[g.kingdom];
  const imgPath = `sgs-images/heroes/generals/biao${g.id}.png`;

  const currHp = g.maxHp;
  const maxHp = g.maxHp;
  const hpHTML = getHpDots(currHp, maxHp);

  const skillText = g.skills
    .map(s => `【${s.name}】${s.description}`)
    .join("<br><br>");

  const html = `
    <div class="general-card"
         style="background-image: url('sgs-images/photos/back/${frame}'); background-size: cover;">

      <div class="general-side">
        <div class="general-name-vert">${g.name}</div>
        <div class="hp-area">${hpHTML}</div>
      </div>

      <div class="general-main">
        <div class="general-art-wrapper">
          <img class="general-art" src="${imgPath}">
        </div>
        <div class="skill-box">${skillText}</div>
      </div>

    </div>
  `;

  const area = document.getElementById("general-area");
  area.insertAdjacentHTML("beforeend", html);

  addGeneralPressEffect(area.lastElementChild);
}






  function renderCard(card) {
  // 1️⃣ 花色顏色（紅心、方塊紅色，其他黑色）
  const suitColor = (card.suit === "♥" || card.suit === "♦") ? "red" : "black";

  // 2️⃣ 依卡片 types 決定資料夾
  let folder = "other";
  if (card.subtype === "武器牌") {
    folder = "weapons";
  } else if (card.subtype === "防具牌") {
    folder = "armors";
  } else if (card.subtype === "坐騎牌") {
    folder = "mounts";
  } else if (card.type === "錦囊牌") {
    folder = "tricks";
  } else if (card.type === "基本牌") {
    folder = "basic";
  }

const imageNameMap = {

  // ====== 武器（weapons/）======
  gudingdao: "gudingdao.png",
  qinglongyanyuedao: "qinglongyanyuedao.png",
  cixiongshuanggujian: "cixiongshuanggujian.png",
  hanbingjian: "hanbingjian.png",
  qinggangjian: "qinggangjian.png",
  zhangbashemao: "zhangbashemao.png",
  guanshifu: "guanshifu.png",
  fangtianhuaji: "fangtianhuaji.png",
  zhuqueyushan: "zhuqueyushan.png",
  qilingong: "qilingong.png",
  club_zhugeliannu: "zhugeliannu.png",
  diamond_zhugeliannu: "zhugeliannu.png",

  // ====== 防具（armors/）======
  spade_baguazhen: "baguazhen.png",
  club_baguazhen: "baguazhen.png",
  baiyinshizi: "baiyinshizi.png",
  renwangdun: "renwangdun.png",
  spade_tengjia: "tengjia.png",
  club_tengjia: "tengjia.png",

  // ====== 坐騎（mounts/）======
  jueying: "jueying.png",
  chitu: "chitu.png",
  dilu: "dilu.png",
  zhuahuangfeidian: "zhuahuangfeidian.png",
  dawan: "dawan.png",
  zixing: "zixing.png",
  hualiu: "hualiu.png",

  // ====== 延時錦囊（tricks/）======
  spade_shandian: "shandian.png",
  heart_shandian: "shandian.png",

  spade_lebusishu: "lebusishu.png",
  heart_lebusishu: "lebusishu.png",
  club_lebusishu: "lebusishu.png",

  spade_bingliangcunduan: "bingliangcunduan.png",
  club_bingliangcunduan: "bingliangcunduan.png",

  // ====== 普通錦囊（tricks/）======
  spade_juedou: "juedou.png",
  club_juedou: "juedou.png",
  diamond_juedou: "juedou.png",

  spade3_guohechaiqiao: "guohechaiqiao.png",
  spade4_guohechaiqiao: "guohechaiqiao.png",
  spadeQ_guohechaiqiao: "guohechaiqiao.png",
  heartQ_guohechaiqiao: "guohechaiqiao.png",
  club3_guohechaiqiao: "guohechaiqiao.png",
  club4_guohechaiqiao: "guohechaiqiao.png",

  spade3_shunshouqianyang: "shunshouqianyang.png",
  spade4_shunshouqianyang: "shunshouqianyang.png",
  spadeJ_shunshouqianyang: "shunshouqianyang.png",
  diamond3_shunshouqianyang: "shunshouqianyang.png",
  diamond4_shunshouqianyang: "shunshouqianyang.png",

  spadeJ_tiesuolianhuan: "tiesuolianhuan.png",
  spadeQ_tiesuolianhuan: "tiesuolianhuan.png",
  club10_tiesuolianhuan: "tiesuolianhuan.png",
  clubJ_tiesuolianhuan: "tiesuolianhuan.png",
  clubQ_tiesuolianhuan: "tiesuolianhuan.png",
  clubK_tiesuolianhuan: "tiesuolianhuan.png",

  spade7_nanmanruqin: "nanmanruqin.png",
  club7_nanmanruqin: "nanmanruqin.png",
  spadeK_nanmanruqin: "nanmanruqin.png",

  heartA_wanjianqifa: "wanjianqifa.png",

  heart7_wuzhongshengyou: "wuzhongshengyou.png",
  heart8_wuzhongshengyou: "wuzhongshengyou.png",
  heart9_wuzhongshengyou: "wuzhongshengyou.png",
  heartJ_wuzhongshengyou: "wuzhongshengyou.png",

  heart3_wugufengdeng: "wugufengdeng.png",
  heart4_wugufengdeng: "wugufengdeng.png",

  heart2_huogong: "huogong.png",
  heart3_huogong: "huogong.png",
  diamondQ_huogong: "huogong.png",

  heartA_taoyuanjieyi: "taoyuanjieyi.png",

  clubQ_jiedaosharen: "jiedaosharen.png",
  clubK_jiedaosharen: "jiedaosharen.png",

  // ====== 無懈可擊 =======
  spadeJ_wuxiekeji: "wuxiekeji.png",
  spadeK_wuxiekeji: "wuxiekeji.png",
  heartA_wuxiekeji: "wuxiekeji.png",
  heartK_wuxiekeji: "wuxiekeji.png",
  clubQ_wuxiekeji: "wuxiekeji.png",
  clubK_wuxiekeji: "wuxiekeji.png",

  // ====== 基本牌：桃（basic/）======
  heart3_tao: "tao.png",
  heart4_tao: "tao.png",
  heart5_tao_1: "tao.png",
  heart6_tao_1: "tao.png",
  heart6_tao_2: "tao.png",
  heart7_tao: "tao.png",
  heart8_tao: "tao.png",
  heart9_tao: "tao.png",
  heartQ_tao: "tao.png",
  diamond2_tao: "tao.png",
  diamond3_tao: "tao.png",
  diamondQ_tao: "tao.png",

  // ====== 基本牌：酒 ======
  spade3_jiu: "jiu.png",
  spade9_jiu: "jiu.png",
  club3_jiu: "jiu.png",
  club9_jiu: "jiu.png",
  diamond9_jiu: "jiu.png",

  // ====== 基本牌：閃 ======
  heart2_shan_1: "shan.png",
  heart2_shan_2: "shan.png",
  heart8_shan: "shan.png",
  heart9_shan: "shan.png",
  heartJ_shan: "shan.png",
  heartQ_shan: "shan.png",
  heartK_shan: "shan.png",

  diamond2_shan_1: "shan.png",
  diamond2_shan_2: "shan.png",
  diamond3_shan: "shan.png",
  diamond4_shan: "shan.png",
  diamond5_shan: "shan.png",
  diamond6_shan_1: "shan.png",
  diamond6_shan_2: "shan.png",
  diamond7_shan_1: "shan.png",
  diamond7_shan_2: "shan.png",
  diamond8_shan_1: "shan.png",
  diamond8_shan_2: "shan.png",
  diamond9_shan: "shan.png",
  diamond10_shan_1: "shan.png",
  diamond10_shan_2: "shan.png",
  diamondJ_shan_1: "shan.png",
  diamondJ_shan_2: "shan.png",
  diamondJ_shan_3: "shan.png",

  // ====== 基本牌：普通殺／火殺／雷殺（全部 sha.png）======
  spade7_sha: "sha.png",
  spade8_sha_1: "sha.png",
  spade8_sha_2: "sha.png",
  spade9_sha_1: "sha.png",
  spade9_sha_2: "sha.png",
  spade10_sha_1: "sha.png",
  spade10_sha_2: "sha.png",

  heart10_sha_1: "sha.png",
  heart10_sha_2: "sha.png",
  heartJ_sha: "sha.png",

  club2_sha: "sha.png",
  club3_sha: "sha.png",
  club4_sha: "sha.png",
  club5_sha: "sha.png",
  club6_sha: "sha.png",
  club7_sha: "sha.png",
  club8_sha_1: "sha.png",
  club8_sha_2: "sha.png",
  club9_sha_1: "sha.png",
  club9_sha_2: "sha.png",
  club10_sha_1: "sha.png",
  club10_sha_2: "sha.png",
  clubJ_sha_1: "sha.png",
  clubJ_sha_2: "sha.png",

  diamond6_sha: "sha.png",
  diamond7_sha: "sha.png",
  diamond8_sha: "sha.png",
  diamond9_sha: "sha.png",
  diamond10_sha: "sha.png",
  diamondK_sha: "sha.png",

  // ===== 火殺也 sha.png =====
  heart4_huosha: "sha.png",
  heart7_huosha: "sha.png",
  heart10_huosha: "sha.png",
  diamond4_huosha: "sha.png",
  diamond5_huosha: "sha.png",

  // ===== 雷殺也 sha.png =====
  spade4_leisha: "sha.png",
  spade5_leisha: "sha.png",
  spade6_leisha: "sha.png",
  spade7_leisha: "sha.png",
  spade8_leisha: "sha.png",
  club5_leisha: "sha.png",
  club6_leisha: "sha.png",
  club7_leisha: "sha.png",
  club8_leisha: "sha.png",
};
  

  let fileName = imageNameMap[card.id] || `${card.id}.png`;
  const imgPath = `sgs-images/cards/${folder}/${fileName}`;

  // 4️⃣ 武器顯示「範圍：X」
  const rangeHTML =
    card.subtype === "武器牌" && card.extra && card.extra.range
      ? `<div class="card-range">范围：${card.extra.range}</div>`
      : "";

  // 5️⃣ 坐騎顯示 +1 / -1
  let mountHTML = "";
  if (card.subtype === "坐騎牌") {
    if (card.subsubtype === "+1坐騎") {
      mountHTML = `<div class="card-mount">+1</div>`;
    } else if (card.subsubtype === "-1坐騎") {
      mountHTML = `<div class="card-mount">-1</div>`;
    }
  }

  // 6️⃣ 組卡片 HTML
  const effectText = card.effect || "（无效果）";

  const html = `
    <div class="card">
      <img src="sgs-images/cards/card-base/card-base.png" class="card-base">

      <div class="card-suit-rank" style="color:${suitColor}">
        <div class="card-rank">${card.rank}</div>
        <div class="card-suit">${card.suit}</div>
      </div>

      <div class="card-name">${card.name}</div>

      ${rangeHTML}
      ${mountHTML}

      <div class="card-img">
        <img src="${imgPath}">
      </div>

      <!-- ⭐⭐ 效果框，加在卡片最底下（不會影響排版） ⭐⭐ -->
      <div class="card-effect-box">${effectText}</div>
    </div>
  `;

  document.getElementById("card-area").insertAdjacentHTML("beforeend", html);

const cardElement = document.getElementById("card-area").lastElementChild;
addPressEffect(cardElement);
}

// 長按邏輯（支援電腦＋手機）
function addPressEffect(cardElement) {
  const effectBox = cardElement.querySelector(".card-effect-box");
  let pressTimer = null;

  // 顯示效果框
  const showEffect = () => {
    effectBox.style.display = "block";
  };

  // 隱藏效果框
  const hideEffect = () => {
    effectBox.style.display = "none";
  };

  // 開始按住（mouse or touch）
  const startPress = () => {
    pressTimer = setTimeout(showEffect, 300); // 長按 0.3 秒才出現
  };

  // 放開（取消）
  const cancelPress = () => {
    clearTimeout(pressTimer);
    hideEffect();
  };

  // 電腦事件
  cardElement.addEventListener("mousedown", startPress);
  cardElement.addEventListener("mouseup", cancelPress);
  cardElement.addEventListener("mouseleave", cancelPress);

  // 手機 / 平板事件
  cardElement.addEventListener("touchstart", startPress);
  cardElement.addEventListener("touchend", cancelPress);
  cardElement.addEventListener("touchcancel", cancelPress);
}
export { renderCard, renderGeneral };
