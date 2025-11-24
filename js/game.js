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

  // ⭐ 建立房間
  await set(ref(database, "rooms/" + roomId), {
    host: uid,
    status: "waiting",
    settings: { mode, count, pool, generalChoice: gCount, playTime },
    players: {
      [uid]: { name: "玩家1", hero: null, ready: false }
    }
  });

  // ⭐ 關閉彈窗
  document.getElementById("modal-bg").style.display = "none";
  document.getElementById("room-settings").style.display = "none";

  // ⭐ 顯示大廳
  showLobby(roomId);

});
function showLobby(roomId) {
  const lobby = document.getElementById("room-lobby");

  // 顯示大廳
  lobby.style.display = "block";

  // 寫上房號
  document.getElementById("lobby-room-id").textContent = roomId;

  const roomRef = ref(database, "rooms/" + roomId);

  // 🔥 即時監聽房間資料（玩家加入時自動更新）
  onValue(roomRef, snapshot => {
    if (!snapshot.exists()) return;
    const data = snapshot.val();

    // 更新設定顯示
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
  });
}

async function joinRoom(roomId) {
  const roomRef = ref(database, "rooms/" + roomId);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) {
    alert("房號不存在！");
    return;
  }

  const uid = "player_" + Math.floor(Math.random()*99999);

  await update(ref(database, `rooms/${roomId}/players/${uid}`), {
    name: "路人" + Math.floor(Math.random()*50),
    hero: null
  });

  console.log("🎉 成功加入房間！", roomId, uid);

  return uid;
}

document.getElementById("join-room-btn").addEventListener("click", () => {
  const roomId = prompt("請輸入房號：");
  if (!roomId) return;
  joinRoom(roomId);
});

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