import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { connectDatabaseEmulator } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

database.app.options.databaseAuthVariableOverride = null;

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