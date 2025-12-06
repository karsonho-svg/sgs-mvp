import { database } from "./firebase.js";
import { ref, set, onValue, push, get, update } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { renderCard, renderGeneral, createGeneralCard } from "./render.js";
import { deck } from "./deck.js";
import { generals } from "./heroes.js";

document.getElementById("create-room-btn").addEventListener("click", () => {
  showNameInput((playerName) => {
    // 存起來等下建立房間時用
    window.tempCreatorName = playerName;

    // 打開房間設定彈窗
    document.getElementById("modal-bg").style.display = "block";
    document.getElementById("room-settings").style.display = "block";
  });
});


function generateRoomId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

const identityModes = {
  4: ["主忠反內"],
  5: ["主忠反反內"],
  6: ["主忠反反內內", "主忠忠反反內"],
  7: ["主忠忠反反反內"],
  8: ["主忠忠反反反反內", "主忠忠反反反內內"]
};

document.getElementById("mode-select").addEventListener("change", function() {
  const mode = this.value;
  const countSelect = document.getElementById("player-count");
  const roleRow = document.getElementById("role-group-row");
  const roleSelect = document.getElementById("role-group-select");

  // 重置
  countSelect.disabled = true;
  countSelect.innerHTML = "<option value=''>请选择</option>";
  if (roleRow) roleRow.style.display = "none";
  if (roleSelect) roleSelect.innerHTML = "<option value=''>请选择</option>";

  if (mode === "identity") {
    countSelect.disabled = false;
    countSelect.innerHTML = "<option value=''>请选择</option>";
    Object.keys(identityModes).forEach(n => {
      const op = document.createElement("option");
      op.value = n;
      op.textContent = `${n} 人`;
      countSelect.appendChild(op);
    });
  } else if (mode === "1v1") {
    // 1v1 模式固定為 2 人，沒有身份組合
    countSelect.disabled = true;
    countSelect.innerHTML = "<option value='2'>2 人</option>";
    if (roleRow) roleRow.style.display = "none";
  }
});

document.getElementById("player-count").addEventListener("change", function() {
  const count = Number(this.value);
  const roles = identityModes[count];

  const roleRow = document.getElementById("role-group-row");
  const roleSelect = document.getElementById("role-group-select");

  if (!roles) {
    roleRow.style.display = "none";
    return;
  }

  // 只有 6 人 / 8 人才顯示身份組合
  if (roles.length > 1) {
    roleRow.style.display = "flex";

    roleSelect.innerHTML = `<option value="">请选择</option>`;
    roles.forEach((r, i) => {
      const op = document.createElement("option");
      op.value = r;
      op.textContent = `组合 ${i+1}：${r}`;
      roleSelect.appendChild(op);
    });
  } else {
    roleRow.style.display = "none";
  }
});

document.getElementById("confirm-create").addEventListener("click", async () => {
  const mode = document.getElementById("mode-select").value;
  const count = document.getElementById("player-count").value;

  const poolCheckboxes = document.querySelectorAll(".pool");
  let pool = [];
  poolCheckboxes.forEach(cb => {
  if (cb.checked) pool.push(cb.value);
});

// ✨ 新增：選將底池必須至少一個
if (pool.length === 0) {
  alert("请至少选择一个选将底池！");
  return;
}

  const gCount = document.getElementById("general-count").value;
  const playTime = document.getElementById("play-time").value;

  if (!mode || !count) {
    alert("请先把设定调好");
    return;
  }
  const roleGroup = document.getElementById("role-group-select").value;
  // ✨ 若為 6 人或 8 人，且有多組身份但未選擇
  if ((count === "6" || count === "8") && identityModes[count].length > 1) {
    if (!roleGroup) {
      alert("请选择一个身份组合！");
      return;
    }
  }

  const roomId = generateRoomId();
  const uid = "player_" + Math.floor(Math.random() * 99999);

await set(ref(database, "rooms/" + roomId), {
  host: uid,
  status: "waiting",
  settings: { 
    mode, 
    count, 
    pool, 
    generalChoice: gCount, 
    playTime,
    roleGroup: roleGroup || null   // ⭐ 儲存身份組合
  },
  players: {
    [uid]: { name: window.tempCreatorName, hero: null, ready: false, seat: 1 }
  }
});

  // 關掉彈窗
  document.getElementById("modal-bg").style.display = "none";
  document.getElementById("room-settings").style.display = "none";

  // ⭐⭐ 立刻跳進大廳 ⭐⭐
  showLobby(roomId, uid);
});
function showLobby(roomId, uid) {
  const lobby = document.getElementById("room-lobby");
  lobby.style.display = "block";
  document.getElementById("lobby-room-id").textContent = roomId;

  const roomRef = ref(database, "rooms/" + roomId);

  onValue(roomRef, snapshot => {

  if (!snapshot.exists()) return;
  const data = snapshot.val();

  // 🔥 若玩家不存在（刷新太快 or 剛退出房間）→ 不處理
  if (!data.players || !data.players[uid]) return;

  const me = data.players[uid];


  // ===========================
  // ⭐ 更新「準備 / 取消準備」按鈕
  // ===========================
  document.getElementById("ready-btn").textContent =
    me.ready ? "取消准备" : "准备";


  // ===========================
  // ⭐ 更新設定資訊
  // ===========================
  // ⭐ 1v1 顯示「1v1：2 人」，其他模式維持原本格式
  if (data.settings.mode === "1v1") {
    document.getElementById("lobby-mode").textContent = "1v1";
    document.getElementById("lobby-count").textContent = "：2 人";
  } else {
    document.getElementById("lobby-mode").textContent = data.settings.mode;
    document.getElementById("lobby-count").textContent = `：${data.settings.count} 人`;
  }
  document.getElementById("lobby-pool").textContent = data.settings.pool.join("、");
  document.getElementById("lobby-gcount").textContent = data.settings.generalChoice;
  document.getElementById("lobby-playtime").textContent = data.settings.playTime + " 秒";


  // ===========================
  // ⭐ 更新玩家列表
  // ===========================
  const list = document.getElementById("player-list");
  list.innerHTML = "";

  Object.entries(data.players).forEach(([pid, p]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.name}
      ${p.ready ? '<img src="/sgs-mvp/images/photos/room/ready.png" class="ui-icon"/>' : ''}
      ${pid === data.host ? '<img src="/sgs-mvp/images/photos/room/host.png" class="ui-icon"/>' : ''}
    `;
    list.appendChild(li);
  });


  // ===========================
  // ⭐ 房主若離開 → 自動換房主
  // ===========================
  if (!data.players[data.host]) {

    const allPlayers = Object.keys(data.players);

    if (allPlayers.length === 0) {
      // 房間沒人 → 自動刪除
      set(ref(database, `rooms/${roomId}`), null);
      return;
    }

    const newHost = allPlayers[0];   // 指定第一位玩家
    update(ref(database, `rooms/${roomId}`), { host: newHost });
  }


  // ===========================
  // ⭐ 房主專屬按鈕（開始遊戲 / 刪除房間）
  // ===========================
  const startBtn = document.getElementById("start-game-btn");
  const deleteBtn = document.getElementById("delete-room-btn");

  const isHost = (data.host === uid);

  // 顯示或隱藏按鈕
  startBtn.style.display = isHost ? "block" : "none";
  deleteBtn.style.display = isHost ? "block" : "none";


  // ===========================
  // ⭐ 檢查是否達到開始條件
  // ===========================
  const currentPlayerCount = Object.values(data.players).length;
  const requiredCount = Number(data.settings.count);

  const full = currentPlayerCount >= requiredCount;
  const allReady = Object.values(data.players).every(p => p.ready);

  startBtn.disabled = !(full && allReady);


  // 🔥 遊戲開始 → 進入選將 / 遊戲流程（先隱藏大廳）
  if (data.status === "started") {
      document.getElementById("room-lobby").style.display = "none";
      // 先進入 showGame，由 showGame 自己控制要顯示哪個畫面
      showGame(roomId, uid);
      return;
  }
});

  // ⭐ 準備鍵（外面綁一次，不會重複）
document.getElementById("ready-btn").onclick = () => {
  const meRef = ref(database, `rooms/${roomId}/players/${uid}`);
  get(meRef).then(snap => {
    const currReady = snap.val().ready || false;
    update(meRef, { ready: !currReady });
  });
};

// ⭐ Host 開始遊戲（外面綁一次）
document.getElementById("start-game-btn").onclick = async () => {
  const roomRef = ref(database, `rooms/${roomId}`);
  const snap = await get(roomRef);
  if (!snap.exists()) return;
  const data = snap.val();

  if (data.settings.mode === "1v1") {
    const updates = { status: "started" };
    Object.entries(data.players || {}).forEach(([pid, p]) => {
      if (p.seat === 1) {
        updates[`players/${pid}/role`] = "主";
      } else if (p.seat === 2) {
        updates[`players/${pid}/role`] = "反";
      }
    });
    await update(roomRef, updates);
  } else {
    await update(roomRef, { status: "started" });
  }
};

// ⭐ 退出房間
document.getElementById("exit-room-btn").onclick = async () => {

  const playerRef = ref(database, `rooms/${roomId}/players/${uid}`);
  const roomRef = ref(database, `rooms/${roomId}`);

  // 拿房間資料
  const snap = await get(roomRef);
  if (!snap.exists()) return;
  const data = snap.val();

  // 如果是房主 → 指定新房主
  if (data.host === uid) {
    const others = Object.keys(data.players).filter(id => id !== uid);

    if (others.length > 0) {
      await update(roomRef, { host: others[0] });
    } else {
      // 沒其他玩家 → 刪除房間
      await set(roomRef, null);
      alert("房间已解散");
      location.reload();
      return;
    }
  }

  // 🔥 正確刪除玩家（只能用 set null）
  await set(playerRef, null);

  alert("你已退出房间");
  location.reload();
};

// =========================
// ⭐ 房主刪除房間按鈕
// =========================
document.getElementById("delete-room-btn").onclick = () => {
const ok = confirm("确定要删除房间吗？所有玩家都会被踢出！");
  if (!ok) return;

  // 直接刪除房間整個資料
  set(ref(database, `rooms/${roomId}`), null);

  alert("房间已删除");
  location.reload();   // 回首頁
};

  
}

async function joinRoom(roomId, playerName) {
  const roomRef = ref(database, "rooms/" + roomId);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) {
    alert("房号不存在！");
    return;
  }

  const data = snapshot.val();
  const currentPlayers = data.players ? Object.keys(data.players).length : 0;
  const seat = currentPlayers + 1;

  const uid = "player_" + Math.floor(Math.random() * 99999);

  await update(ref(database, `rooms/${roomId}/players/${uid}`), {
    name: playerName,
    hero: null,
    ready: false,
    seat
  });

  return uid;
}

// 使用者按「加入房間」
document.getElementById("join-room-btn").addEventListener("click", async () => {
  const roomId = prompt("请输入房号：");
  if (!roomId) return;

  // 先要求輸入名稱
  showNameInput(async (playerName) => {
    const uid = await joinRoom(roomId, playerName);
    showLobby(roomId, uid);   // 訪客直接進入大廳
  });
});
function showNameInput(callback) {
  const bg = document.getElementById("name-modal-bg");
  const modal = document.getElementById("name-modal");
  const confirmBtn = document.getElementById("confirm-name-btn");

  bg.style.display = "block";
  modal.style.display = "block";

  confirmBtn.onclick = () => {
    const name = document.getElementById("player-name-input").value.trim();
    if (!name) return alert("请输入名称");

    bg.style.display = "none";
    modal.style.display = "none";

    callback(name);
  };
}

// ===========================
// ⭐ 進入遊戲畫面
// ===========================
function showGame(roomId, uid) {
    console.log("Game started for:", uid);
    // ⭐ 顯示選將畫面
    document.getElementById("choose-general-screen").style.display = "block";

    // （之後會逐步加入武將 / 手牌 / 回合資訊顯示）

    // ⭐ 根據選將底池渲染武將列表
    const generalListEl = document.getElementById("general-list");
    generalListEl.innerHTML = "";

    const settingsRef = ref(database, `rooms/${roomId}/settings`);
    get(settingsRef).then(snap => {
      if (!snap.exists()) return;
      const settings = snap.val();
      const pool = settings.pool || [];

      // 先暫時渲染全部武將，之後再根據 pool 做篩選
      const filtered = Object.values(generals);

      // 渲染每一張武將卡
      filtered.forEach(g => {
        const wrap = document.createElement("div");
        wrap.className = "general-option";

        // ⭐ 點擊武將 → 金框選取
        wrap.onclick = () => selectGeneral(g.id, wrap.firstElementChild);

        wrap.appendChild(createGeneralCard(g));
        generalListEl.appendChild(wrap);
      });
    });
}

// ===========================
// ⭐ 選將選取邏輯（多選）
// ===========================
let selectedGenerals = [];

function selectGeneral(id, element) {
  const maxSelect = Number(document.getElementById("lobby-gcount")?.textContent || 1);

  // 若已選過 → 取消選取
  if (selectedGenerals.includes(id)) {
    selectedGenerals = selectedGenerals.filter(g => g !== id);
    element.classList.remove("general-selected");
    return;
  }

  // 若已達最大上限 → 不再新增
  if (selectedGenerals.length >= maxSelect) {
    return;
  }

  // 新選的
  selectedGenerals.push(id);
  element.classList.add("general-selected");
}
