import {
    auth
} from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


const adminStatus =
    document.getElementById("adminStatus");

const logoutButton =
    document.getElementById("logoutButton");

const bookingsButton =
    document.getElementById("bookingsButton");

const professionalsButton =
    document.getElementById("professionalsButton");


onAuthStateChanged(auth, (user) => {

    if (user) {

        adminStatus.innerText =
            "Logged in as: " + user.email;

    } else {

        window.location.href =
            "admin.html";

    }

});


logoutButton.addEventListener(
    "click",
    async () => {

        try {

            await signOut(auth);

            alert("Logged out successfully.");

            window.location.href =
                "admin.html";

        } catch (error) {

            console.error(error);

            alert(
                "Logout failed!\n\n" +
                error.message
            );

        }

    }
);


bookingsButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "bookings-admin.html";

    }
);


professionalsButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "professionals-admin.html";

    }
);
