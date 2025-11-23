import { database } from "./firebase.js";
import { ref, set, onValue, push, get, update } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { renderCard, renderGeneral } from "./render.js";
import { deck } from "./deck.js";
import { generals } from "./heroes.js";
//     deck.forEach(card => {
//       set(ref(database, 'deck/' + card.id), card)
//         .then(() => console.log(`${card.name} 存入成功 ✅`))
//         .catch(err => console.error(`${card.name} 寫入失敗 ❌`, err));
//     });
//     generals.forEach(g => {
//   set(ref(database, "generals/" + g.id), g);
// });
async function createRoom() {
  const roomRef = push(ref(database, "rooms"));
  const roomId = roomRef.key;

  const uid = "player_" + Math.floor(Math.random()*99999);

  await set(roomRef, {
    host: uid,
    status: "waiting",
    players: {
      [uid]: {
        name: "玩家1",
        hero: null
      }
    }
  });

  console.log("🎉 房間建立成功！roomId =", roomId);

  return { roomId, uid };
}

document.getElementById("create-room-btn").addEventListener("click", async () => {
  const { roomId } = await createRoom();
  alert("房間已建立！房號：" + roomId);
});

async function joinRoom(roomId) {
  const roomRef = ref(database, "rooms/" + roomId);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) {
    alert("❌ 房號不存在！");
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
    const deckRef = ref(database, 'deck');
onValue(deckRef, (snapshot) => {
  const deckData = snapshot.val();

  // 🔥🔥🔥：每次重新 render 之前先清空畫面
  document.getElementById("card-area").innerHTML = "";

  // 再把牌庫全部畫出來
  Object.values(deckData).forEach(card => {
    renderCard(card);
  });
});
const generalsRef = ref(database, "generals");
onValue(generalsRef, snapshot => {
  const data = snapshot.val();
  document.getElementById("general-area").innerHTML = "";

  Object.values(data).forEach(g => {
    renderGeneral(g);
  });
});
