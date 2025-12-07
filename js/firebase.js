import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { connectDatabaseEmulator } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";



    // 1️⃣ 初始化 Firebase
    const firebaseConfig = {
  apiKey: "AIzaSyDk9Drn-ZkLoKj6HjC6H2eSOYhI_A_pOM4",
  authDomain: "sgs-mvp.firebaseapp.com",
  databaseURL: "https://sgs-mvp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sgs-mvp",
  storageBucket: "sgs-mvp.firebasestorage.app",
  messagingSenderId: "749326209652",
  appId: "1:749326209652:web:5dbd03935ea60edb927721"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export { ref, set };

/* =========================================================
   ⭐ 上傳武將資料到 Firebase
   你在其他檔案可呼叫 uploadHeroes(heroesObject)
   ========================================================= */
export function uploadHeroes(heroesData) {
  const heroesRef = ref(database, "heroes");
  return set(heroesRef, heroesData)
    .then(() => {
      console.log("武將資料已成功上傳到 Firebase");
    })
    .catch(err => {
      console.error(" 上傳武將資料失敗：", err);
    });
}
export { ref, set };