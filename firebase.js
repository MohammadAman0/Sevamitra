import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZSrUXEHQw5HhPbzIABrqMSzmmsJUATRc",
  authDomain: "sevamitra-fe9fe.firebaseapp.com",
  projectId: "sevamitra-fe9fe",
  storageBucket: "sevamitra-fe9fe.firebasestorage.app",
  messagingSenderId: "1074700783560",
  appId: "1:1074700783560:web:37f5f10426cef42795fafd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);