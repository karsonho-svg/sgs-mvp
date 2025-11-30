import { database } from "./firebase.js";
import { ref, set, onValue, push, get, update } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { renderCard, renderGeneral } from "./render.js";
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

  if (mode === "identity") {
    countSelect.disabled = false;

    countSelect.innerHTML = "<option value=''>請選擇</option>";
    Object.keys(identityModes).forEach(n => {
      const op = document.createElement("option");
      op.value = n;
      op.textContent = `${n} 人`;
      countSelect.appendChild(op);
    });
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

    roleSelect.innerHTML = `<option value="">請選擇</option>`;
    roles.forEach((r, i) => {
      const op = document.createElement("option");
      op.value = r;
      op.textContent = `組合 ${i+1}：${r}`;
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
  alert("請至少選擇一個選將底池！");
  return;
}

  const gCount = document.getElementById("general-count").value;
  const playTime = document.getElementById("play-time").value;

  if (!mode || !count) {
    alert("请先把设定调好");
    return;
  }

  const roomId = generateRoomId();
  const uid = "player_" + Math.floor(Math.random() * 99999);

  const roleGroup = document.getElementById("role-group-select").value;

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
    [uid]: { name: window.tempCreatorName, hero: null, ready: false }
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
  document.getElementById("lobby-mode").textContent = data.settings.mode;
  document.getElementById("lobby-count").textContent = data.settings.count;
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
    li.textContent = p.name + (p.ready ? " ✔️" : "") + (pid === data.host ? "（房主）" : "");
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


  // ===========================
  // ⭐ 遊戲開始 → 進入遊戲畫面
  // ===========================
  if (data.status === "started") {
    document.getElementById("room-lobby").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
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
document.getElementById("start-game-btn").onclick = () => {
  update(ref(database, `rooms/${roomId}`), {
    status: "started"
  });
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
  const ok = confirm("確定要刪除房間嗎？所有玩家都會被踢出。");
  if (!ok) return;

  // 直接刪除房間整個資料
  set(ref(database, `rooms/${roomId}`), null);

  alert("房間已刪除");
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

  const uid = "player_" + Math.floor(Math.random() * 99999);

  await update(ref(database, `rooms/${roomId}/players/${uid}`), {
    name: playerName,
    hero: null,
    ready: false
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

// 下面兩段可留可刪（取決於你要不要 debug 顯示全牌）
// const deckRef = ref(database, 'deck');
// onValue(deckRef, (snapshot) => {
//   const deckData = snapshot.val();
//   document.getElementById("card-area").innerHTML = "";
//   Object.values(deckData).forEach(card => {
//     renderCard(card);
//   });
// });

// const generalsRef = ref(database, "generals");
// onValue(generalsRef, snapshot => {
//   const data = snapshot.val();
//   document.getElementById("general-area").innerHTML = "";
//   Object.values(data).forEach(g => {
//     renderGeneral(g);
//   });
// });