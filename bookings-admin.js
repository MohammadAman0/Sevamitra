import {
    db,
    auth
} from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


const bookingsList =
    document.getElementById("bookingsList");

const backButton =
    document.getElementById("backButton");


backButton.addEventListener("click", () => {

    window.location.href =
        "admin-panel.html";

});


onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href =
            "admin.html";

        return;

    }


    try {

        const bookingsQuery = query(
            collection(db, "bookings"),
            orderBy("createdAt", "desc")
        );


        const snapshot =
            await getDocs(bookingsQuery);


        bookingsList.innerHTML = "";


        if (snapshot.empty) {

            bookingsList.innerHTML =
                "<p>No bookings found.</p>";

            return;

        }


        snapshot.forEach((doc) => {

            const booking =
                doc.data();


            const card =
                document.createElement("div");


            card.style.border =
                "1px solid #ddd";

            card.style.padding =
                "15px";

            card.style.marginBottom =
                "15px";


            card.innerHTML = `

                <h3>
                    ${booking.service || "Service"}
                </h3>

                <p>
                    <strong>Name:</strong>
                    ${booking.name || ""}
                </p>

                <p>
                    <strong>Mobile:</strong>
                    ${booking.mobile || ""}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${booking.address || ""}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${booking.description || ""}
                </p>

                <p>
                    <strong>Preferred Time:</strong>
                    ${booking.preferredTime || ""}
                </p>

                <p>
                    <strong>Duration:</strong>
                    ${booking.duration || ""}
                </p>

                <p>
                    <strong>Budget:</strong>
                    ${booking.budget || ""}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${booking.status || ""}
                </p>

                <hr>

            `;


            bookingsList.appendChild(card);

        });


    } catch (error) {

        console.error(error);


        bookingsList.innerHTML = `

            <p>
                Failed to load bookings.
            </p>

            <p>
                ${error.code}
            </p>

        `;

    }

});
