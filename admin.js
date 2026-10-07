import {
    auth
} from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


const form =
    document.getElementById("adminLoginForm");


form.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email =
        document.getElementById("adminEmail").value;

    const password =
        document.getElementById("adminPassword").value;


    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        alert("Admin Login Successful! 🎉");


        window.location.href =
            "admin-panel.html";


    } catch (error) {

        console.error(
            "Admin Login Error:",
            error
        );


        alert(
            "Login failed!\n\n" +
            error.code
        );

    }

});
