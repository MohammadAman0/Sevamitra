
import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const SERVICE_ID = "service_haimgap";
const TEMPLATE_ID = "template_whqu6ea";
const PUBLIC_KEY = "rhrllDN-A9Sp_Qys_";

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;

    const name = form.elements["name"].value.trim();
    const mobile = form.elements["mobile"].value.trim();
    const service = form.elements["service"].value;
    const description = form.elements["description"].value.trim();
    const address = form.elements["address"].value.trim();
    const preferredTime = form.elements["preferred_time"].value;
    const duration = form.elements["duration"].value;
    const budget = form.elements["budget"].value;

    try {
        // Step 1: Save booking to Firebase
        const docRef = await addDoc(collection(db, "bookings"), {
            name,
            mobile,
            service,
            description,
            address,
            preferredTime,
            duration,
            budget,
            status: "New",
            createdAt: serverTimestamp()
        });

        console.log("Booking saved. ID:", docRef.id);

    } catch (error) {
        console.error("Firebase booking error:", error);

        alert("Booking failed!\n" + error.message);
        button.disabled = false;
        return;
    }

    // Step 2: Send notification through EmailJS
    try {
        if (!window.emailjs) {
            throw new Error(
                "EmailJS SDK not loaded. Check booking.html script."
            );
        }

        await window.emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
                name,
                mobile,
                service,
                description,
                address,
                preferred_time: preferredTime,
                duration,
                budget
            },
            { publicKey: PUBLIC_KEY }
        );

        alert("Booking successful! 🎉 Email notification sent.");

    } catch (error) {
        console.error("EmailJS notification error:", error);

        alert(
            "Booking saved successfully! 🎉\n" +
            "Email notification failed. Please check the browser console."
        );
    } finally {
        form.reset();
        button.disabled = false;
    }
});
