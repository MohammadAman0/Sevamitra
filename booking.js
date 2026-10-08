import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";


const form = document.querySelector(".booking-form");


// Check whether booking came from ₹49 offer
const urlParams = new URLSearchParams(window.location.search);

const offer = urlParams.get("offer");

const offerType = offer === "49" ? "49" : "normal";


// Show ₹49 message only for offer booking
const offerBox = document.getElementById("offerBox");

if (offerType !== "49" && offerBox) {
    offerBox.style.display = "none";
}


form.addEventListener("submit", async (event) => {

    event.preventDefault();


    const name =
        form.elements["name"].value.trim();

    const mobile =
        form.elements["mobile"].value.trim();

    const service =
        form.elements["service"].value;

    const description =
        form.elements["description"].value.trim();

    const address =
        form.elements["address"].value.trim();

    const preferredTime =
        form.elements["preferred_time"].value;

    const duration =
        form.elements["duration"].value;

    const budget =
        form.elements["budget"].value;


    // Basic mobile validation
    if (!/^[0-9]{10}$/.test(mobile)) {

        alert("Please enter a valid 10-digit mobile number.");

        return;
    }


    // Prevent multiple submissions
    const submitButton =
        form.querySelector("button[type='submit']");

    const originalButtonText =
        submitButton.innerHTML;


    submitButton.disabled = true;

    submitButton.innerHTML =
        "Submitting...";


    try {

        const docRef = await addDoc(
            collection(db, "bookings"),
            {

                name: name,

                mobile: mobile,

                service: service,

                description: description,

                address: address,

                preferredTime: preferredTime,

                duration: duration,

                budget: budget,

                offerType: offerType,

                status: "New",

                createdAt: serverTimestamp()

            }
        );


        console.log(
            "Booking successful. ID:",
            docRef.id
        );


        alert(
            "Booking Successful! 🎉\n\n" +
            "Our SevaMitra team will contact you soon."
        );


        form.reset();


    } catch (error) {

        console.error(
            "Booking Error:",
            error
        );


        alert(
            "Booking failed!\n\n" +
            error.code +
            "\n" +
            error.message
        );


    } finally {

        submitButton.disabled = false;

        submitButton.innerHTML =
            originalButtonText;

    }

});
