
import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const SERVICE_ID = "service_haimgap";
const TEMPLATE_ID = "template_7bphape";
const PUBLIC_KEY = "rhrllDN-A9Sp_Qys_";

const form = document.getElementById("professionalForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;

    const name = form.elements["name"].value.trim();
    const mobile = form.elements["mobile"].value.trim();
    const email = form.elements["email"].value.trim();
    const service = form.elements["service"].value;
    const experience = form.elements["experience"].value;
    const city = form.elements["city"].value.trim();
    const address = form.elements["address"].value.trim();
    const skills = form.elements["skills"].value.trim();

    try {
        await addDoc(collection(db, "professionalApplications"), {
            name,
            mobile,
            email,
            service,
            experience,
            city,
            address,
            skills,
            status: "Pending",
            createdAt: serverTimestamp()
        });

        try {
            if (!window.emailjs) {
                throw new Error("EmailJS SDK not loaded.");
            }

            await window.emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    name,
                    mobile,
                    email,
                    service,
                    experience,
                    city,
                    address,
                    skills
                },
                { publicKey: PUBLIC_KEY }
            );

            alert("Registration successful! 🎉 Email notification sent.");

        } catch (emailError) {
            console.error("EmailJS error:", emailError);

            alert("Registration saved successfully! 🎉\nEmail notification failed.");
        }

        form.reset();

    } catch (error) {
        console.error("Professional registration error:", error);

        alert("Registration failed!\n" + error.message);

    } finally {
        button.disabled = false;
    }
});
