import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const form = document.getElementById("professionalForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = form.elements["name"].value;
    const mobile = form.elements["mobile"].value;
    const email = form.elements["email"].value;
    const service = form.elements["service"].value;
    const experience = form.elements["experience"].value;
    const city = form.elements["city"].value;
    const address = form.elements["address"].value;
    const skills = form.elements["skills"].value;

    try {

        await addDoc(
            collection(db, "professionalApplications"),
            {
                name: name,
                mobile: mobile,
                email: email,
                service: service,
                experience: experience,
                city: city,
                address: address,
                skills: skills,
                status: "Pending",
                createdAt: serverTimestamp()
            }
        );

        alert("Registration submitted successfully! 🎉");

        form.reset();

    } catch (error) {

        console.error(
            "Professional registration error:",
            error
        );

        alert(
            "Registration failed!\n\n" +
            error.code +
            "\n" +
            error.message
        );

    }

});
