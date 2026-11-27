
import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    where,
    limit
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";


// CUSTOMER FEEDBACK FORM

const form = document.getElementById("feedbackForm");

if (form) {

    const stars = document.querySelectorAll(
        "#ratingStars button"
    );

    const ratingInput =
        document.getElementById("selectedRating");

    const ratingText =
        document.getElementById("ratingText");

    const message =
        document.getElementById("feedbackMessage");

    const submitButton =
        form.querySelector(".submit-btn");

    const ratingLabels = [
        "Select your rating",
        "Poor",
        "Fair",
        "Good",
        "Very Good",
        "Excellent"
    ];

    function updateRating(rating) {

        ratingInput.value = rating;

        ratingText.textContent = ratingLabels[rating];

        stars.forEach(star => {

            const value = Number(star.dataset.rating);

            star.classList.toggle(
                "active",
                value <= rating
            );

            star.setAttribute(
                "aria-pressed",
                String(value === rating)
            );

        });

    }

    stars.forEach(star => {

        star.addEventListener("click", () => {

            updateRating(Number(star.dataset.rating));

        });

    });

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = form.elements["name"].value.trim();

        const mobile = form.elements["mobile"].value.trim();

        const service = form.elements["service"].value;

        const rating = Number(ratingInput.value);

        const feedback =
            form.elements["feedback"].value.trim();

        const publishConsent =
            form.elements["publishConsent"].checked;

        if (
            !name ||
            !/^[6-9][0-9]{9}$/.test(mobile) ||
            !service ||
            !feedback ||
            !publishConsent ||
            !Number.isInteger(rating) ||
            rating < 1 ||
            rating > 5
        ) {

            message.style.color = "red";

            message.textContent =
                "Please complete all fields and select a rating.";

            return;

        }

        submitButton.disabled = true;

        submitButton.textContent = "Submitting...";

        message.textContent = "";

        try {

            await addDoc(collection(db, "feedback"), {

                name: name,

                mobile: mobile,

                service: service,

                rating: rating,

                feedback: feedback,

                publishConsent: true,

                status: "Pending",

                createdAt: serverTimestamp()

            });

            message.style.color = "green";

            message.textContent =
                "Thank you! Your feedback has been submitted successfully.";

            form.reset();

            updateRating(0);

        } catch (error) {

            console.error(error);

            message.style.color = "red";

            message.textContent =
                "Unable to submit feedback. Please try again.";

        } finally {

            submitButton.disabled = false;

            submitButton.textContent = "Submit Feedback";

        }

    });

    submitButton.disabled = false;

}


// DISPLAY APPROVED REVIEWS ON HOMEPAGE

const reviewContainer =
    document.getElementById("customerReviews");

if (reviewContainer) {

    async function loadReviews() {

        try {

            const reviewsQuery = query(

                collection(db, "publicReviews"),

                where("status", "==", "Approved"),

                limit(12)

            );

            const snapshot = await getDocs(reviewsQuery);

            if (snapshot.empty) {

                reviewContainer.textContent = "";

                const empty = document.createElement("p");

                empty.className = "empty-review";

                empty.textContent =
                    "Be the first to share your experience with SevaMitra.";

                reviewContainer.appendChild(empty);

                return;

            }

            reviewContainer.replaceChildren();

            snapshot.forEach(documentSnapshot => {

                const review = documentSnapshot.data();

                const card = document.createElement("div");

                card.className = "review-card";

                const name = document.createElement("h3");

                name.textContent = review.name;

                const rating = document.createElement("div");

                rating.className = "review-rating";

                const score = Math.max(
                    0,
                    Math.min(
                        5,
                        Math.floor(Number(review.rating) || 0)
                    )
                );

                rating.textContent =
                    "★".repeat(score) +
                    "☆".repeat(5 - score);

                const service = document.createElement("p");

                service.className = "review-service";

                service.textContent = review.service;

                const feedback = document.createElement("p");

                feedback.className = "review-description";

                feedback.textContent = review.feedback;

                card.append(
                    name,
                    rating,
                    service,
                    feedback
                );

                reviewContainer.appendChild(card);

            });

        } catch (error) {

            console.error("Review loading error:", error);

            reviewContainer.textContent = "";

            const notice = document.createElement("p");

            notice.className = "empty-review";

            notice.textContent =
                "Reviews are currently unavailable.";

            reviewContainer.appendChild(notice);

        }

    }

    loadReviews();

}
