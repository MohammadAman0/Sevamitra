import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


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

export const auth = getAuth(app);
