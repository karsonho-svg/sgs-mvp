import { database } from "./firebase.js";
import { ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { renderCard, renderGeneral } from "./render.js";
import { deck } from "./deck.js";
import { generals } from "./heroes.js";
import { renderCard, renderGeneral } from "./render.js";
//     deck.forEach(card => {
//       set(ref(database, 'deck/' + card.id), card)
//         .then(() => console.log(`${card.name} 存入成功 ✅`))
//         .catch(err => console.error(`${card.name} 寫入失敗 ❌`, err));
//     });
//     generals.forEach(g => {
//   set(ref(database, "generals/" + g.id), g);
// });

    const createRoomBtn = document.getElementById("createRoomBtn");

    createRoomBtn.addEventListener("click", () => {
    const roomId = "room_" + Math.random().toString(36).substring(2, 8);

    const roomRef = ref(database, "rooms/" + roomId);

  set(roomRef, {
    players: {},
    gameState: "waiting",
    deckOrder: [],
    discardPile: []
  }).then(() => {
    console.log("房間建立成功！ID =", roomId);
  });
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
