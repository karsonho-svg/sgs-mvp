import { database } from "./firebase.js";
import { ref, set, onValue, push, get, update } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { renderCard, renderGeneral } from "./render.js";
import { deck } from "./deck.js";
import { generals } from "./heroes.js";

document.getElementById("create-room-btn").addEventListener("click", () => {
  document.getElementById("modal-bg").style.display = "block";
  document.getElementById("room-settings").style.display = "block";
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
  const count = this.value;
  const roles = identityModes[count];

  console.log("身份組合：", roles);
  // 未來 UI 會顯示
});

document.getElementById("confirm-create").addEventListener("click", async () => {
  const mode = document.getElementById("mode-select").value;
  const count = document.getElementById("player-count").value;

  const poolCheckboxes = document.querySelectorAll(".pool");
  let pool = [];
  poolCheckboxes.forEach(cb => {
    if (cb.checked) pool.push(cb.value);
  });

  const gCount = document.getElementById("general-count").value;
  const playTime = document.getElementById("play-time").value;

  if (!mode || !count) {
    alert("請先把設定選好");
    return;
  }

  const roomId = generateRoomId();
  const uid = "player_" + Math.floor(Math.random() * 99999);

  await set(ref(database, "rooms/" + roomId), {
    host: uid,
    status: "waiting",
    settings: { mode, count, pool, generalChoice: gCount, playTime },
    players: {
      [uid]: { name: "玩家1", hero: null, ready: false }
    }
  });

  // 關掉彈窗
  document.getElementById("modal-bg").style.display = "none";
  document.getElementById("room-settings").style.display = "none";

  // ⭐⭐ 立刻跳進大廳 ⭐⭐
  showLobby(roomId);
});
function showLobby(roomId, uid) {
  const lobby = document.getElementById("room-lobby");
  lobby.style.display = "block";
  document.getElementById("lobby-room-id").textContent = roomId;

  const roomRef = ref(database, "rooms/" + roomId);

  onValue(roomRef, snapshot => {
    if (!snapshot.exists()) return;
    const data = snapshot.val();

    // 更新設定
    document.getElementById("lobby-mode").textContent = data.settings.mode;
    document.getElementById("lobby-count").textContent = data.settings.count;
    document.getElementById("lobby-pool").textContent = data.settings.pool.join("、");
    document.getElementById("lobby-gcount").textContent = data.settings.generalChoice;
    document.getElementById("lobby-playtime").textContent = data.settings.playTime + " 秒";

    // 更新玩家列表
    const list = document.getElementById("player-list");
    list.innerHTML = "";
    Object.values(data.players).forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.name + (p.ready ? " ✔️" : "");
      list.appendChild(li);
    });

    // ⭐ 準備按鈕
    document.getElementById("ready-btn").onclick = () => {
      update(ref(database, `rooms/${roomId}/players/${uid}`), {
        ready: true
      });
    };

    // ⭐ Host 顯示「開始遊戲」
    if (data.host === uid) {
      document.getElementById("start-game-btn").style.display = "block";
    } else {
      document.getElementById("start-game-btn").style.display = "none";
    }

    // ⭐ 全員準備才能開始
    const allReady = Object.values(data.players).every(p => p.ready);
    document.getElementById("start-game-btn").disabled = !allReady;

    // ⭐ Host 按下開始遊戲
    document.getElementById("start-game-btn").onclick = () => {
      update(ref(database, `rooms/${roomId}`), {
        status: "started"
      });
    };

    // ⭐ 遊戲開始 → 切到 16:9 畫面
    if (data.status === "started") {
      document.getElementById("room-lobby").style.display = "none";
      document.getElementById("game-screen").style.display = "block";
    }
  });
}

async function joinRoom(roomId, playerName) {
  const roomRef = ref(database, "rooms/" + roomId);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) {
    alert("房號不存在！");
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
  const roomId = prompt("請輸入房號：");
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
    if (!name) return alert("請輸入名稱喔～");

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