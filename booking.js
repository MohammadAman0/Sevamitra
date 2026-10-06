import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = form.elements["name"].value;
    const mobile = form.elements["mobile"].value;
    const service = form.elements["service"].value;
    const description = form.elements["description"].value;
    const address = form.elements["address"].value;
    const preferredTime = form.elements["preferred_time"].value;
    const duration = form.elements["duration"].value;
    const budget = form.elements["budget"].value;

    try {
        await addDoc(collection(db, "bookings"), {
            name: name,
            mobile: mobile,
            service: service,
            description: description,
            address: address,
            preferredTime: preferredTime,
            duration: duration,
            budget: budget,
            status: "New",
            createdAt: serverTimestamp()
        });

        alert("Booking submitted successfully!");

        form.reset();

    } catch (error) {
        console.error("Booking error:", error);
        alert("Booking submit nahi hui. Please try again.");
    }
});