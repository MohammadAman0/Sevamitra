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


const list =
    document.getElementById("professionalsList");

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

        const applicationsQuery = query(
            collection(
                db,
                "professionalApplications"
            ),
            orderBy(
                "createdAt",
                "desc"
            )
        );


        const snapshot =
            await getDocs(
                applicationsQuery
            );


        list.innerHTML = "";


        if (snapshot.empty) {

            list.innerHTML =
                "<p>No professional applications found.</p>";

            return;

        }


        snapshot.forEach((doc) => {

            const professional =
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
                    ${professional.name || ""}
                </h3>

                <p>
                    <strong>Mobile:</strong>
                    ${professional.mobile || ""}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${professional.email || ""}
                </p>

                <p>
                    <strong>Service:</strong>
                    ${professional.service || ""}
                </p>

                <p>
                    <strong>Experience:</strong>
                    ${professional.experience || ""}
                    years
                </p>

                <p>
                    <strong>City:</strong>
                    ${professional.city || ""}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${professional.address || ""}
                </p>

                <p>
                    <strong>Skills:</strong>
                    ${professional.skills || ""}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${professional.status || ""}
                </p>

            `;


            list.appendChild(card);

        });


    } catch (error) {

        console.error(error);


        list.innerHTML = `

            <p>
                Failed to load applications.
            </p>

            <p>
                ${error.code}
            </p>

        `;

    }

});
