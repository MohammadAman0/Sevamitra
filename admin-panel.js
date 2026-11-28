
import {
    auth,
    db
} from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
    collection,
    getDocs,
    getDoc,
    doc,
    writeBatch
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";


const adminStatus =
    document.getElementById("adminStatus");

const logoutButton =
    document.getElementById("logoutButton");

const bookingsButton =
    document.getElementById("bookingsButton");

const professionalsButton =
    document.getElementById("professionalsButton");

const feedbackButton =
    document.getElementById("feedbackButton");

const dashboardContent =
    document.getElementById("dashboardContent");

let adminVerified = false;

const protectedButtons = [
    bookingsButton,
    professionalsButton,
    feedbackButton
];

protectedButtons.forEach(button => {
    button.disabled = true;
});


// ADMIN LOGIN VERIFICATION

onAuthStateChanged(auth, async (user) => {

    adminVerified = false;

    protectedButtons.forEach(button => {
        button.disabled = true;
    });

    dashboardContent.replaceChildren();

    if (!user) {

        window.location.href = "admin.html";
        return;

    }

    try {

        const adminDoc = await getDoc(
            doc(db, "admins", user.uid)
        );

        if (!adminDoc.exists()) {

            await signOut(auth);
            window.location.href = "admin.html";
            return;

        }

        adminVerified = true;

        adminStatus.innerText =
            "Logged in as: " + user.email;

        protectedButtons.forEach(button => {
            button.disabled = false;
        });

        const heading = document.createElement("h3");

        heading.textContent =
            "Welcome to SevaMitra Admin Panel";

        dashboardContent.appendChild(heading);

    } catch (error) {

        console.error(error);

        adminStatus.textContent =
            "Unable to verify admin access.";

    }

});


// LOGOUT

logoutButton.addEventListener("click", async () => {

    try {

        await signOut(auth);

        alert("Logged out successfully.");

        window.location.href = "admin.html";

    } catch (error) {

        console.error(error);

        alert("Logout failed!");

    }

});


// CUSTOMER BOOKINGS

bookingsButton.addEventListener("click", () => {

    if (!adminVerified) return;

    window.location.href = "bookings-admin.html";

});


// PROFESSIONAL APPLICATIONS

professionalsButton.addEventListener("click", () => {

    if (!adminVerified) return;

    window.location.href = "professionals-admin.html";

});


// CUSTOMER FEEDBACK

feedbackButton.addEventListener("click", loadFeedback);


async function loadFeedback() {

    if (!adminVerified) return;

    dashboardContent.textContent =
        "Loading customer feedback...";

    try {

        const snapshot = await getDocs(
            collection(db, "feedback")
        );

        if (!adminVerified) return;

        dashboardContent.replaceChildren();

        const heading = document.createElement("h2");

        heading.textContent = "Customer Feedback";

        dashboardContent.appendChild(heading);

        if (snapshot.empty) {

            const empty = document.createElement("p");

            empty.textContent = "No feedback received yet.";

            dashboardContent.appendChild(empty);

            return;

        }

        snapshot.forEach(item => {

            const data = item.data();

            const card = document.createElement("div");

            card.className = "admin-feedback-card";

            const name = document.createElement("h3");

            name.textContent = data.name;

            const stars = document.createElement("div");

            stars.className = "admin-review-stars";

            const rating = Math.max(
                0,
                Math.min(
                    5,
                    Math.floor(Number(data.rating) || 0)
                )
            );

            stars.textContent =
                "★".repeat(rating) +
                "☆".repeat(5 - rating);

            const mobile = document.createElement("p");

            mobile.textContent =
                "Mobile: " + data.mobile;

            const service = document.createElement("p");

            service.textContent =
                "Service: " + data.service;

            const feedback = document.createElement("p");

            feedback.textContent =
                "Feedback: " + data.feedback;

            const status = document.createElement("p");

            status.className = "admin-review-status";

            status.textContent =
                "Status: " + data.status;

            const actions = document.createElement("div");

            actions.className = "admin-feedback-actions";


            // APPROVE BUTTON

            const approve = document.createElement("button");

            approve.textContent = "Approve";

            approve.className = "approve-review";

            approve.disabled =
                data.status === "Approved" ||
                data.publishConsent !== true;

            approve.addEventListener("click", () => {

                updateReview(
                    item.id,
                    data,
                    "Approved",
                    actions
                );

            });


            // REJECT BUTTON

            const reject = document.createElement("button");

            reject.textContent = "Reject";

            reject.className = "reject-review";

            reject.disabled =
                data.status === "Rejected";

            reject.addEventListener("click", () => {

                updateReview(
                    item.id,
                    data,
                    "Rejected",
                    actions
                );

            });


            // REMOVE PUBLIC REVIEW

            const remove = document.createElement("button");

            remove.textContent = "Remove Review";

            remove.className = "remove-review";

            remove.disabled =
                data.status !== "Approved";

            remove.addEventListener("click", () => {

                updateReview(
                    item.id,
                    data,
                    "Pending",
                    actions
                );

            });


            actions.append(
                approve,
                reject,
                remove
            );

            card.append(
                name,
                stars,
                mobile,
                service,
                feedback,
                status,
                actions
            );

            dashboardContent.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        dashboardContent.textContent =
            "Unable to load feedback.";

    }

}


// APPROVE, REJECT AND REMOVE REVIEW

async function updateReview(id, data, status, actions) {

    if (!adminVerified) return;

    if (
        status === "Approved" &&
        data.publishConsent !== true
    ) {

        alert("Customer publication consent is missing.");
        return;

    }

    if (!confirm("Confirm this review action?")) {

        return;

    }

    const buttons = actions.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    try {

        const batch = writeBatch(db);

        const feedbackRef = doc(db, "feedback", id);

        const publicRef = doc(db, "publicReviews", id);

        if (status === "Approved") {

            batch.set(publicRef, {

                name: data.name,

                service: data.service,

                rating: data.rating,

                feedback: data.feedback,

                status: "Approved"

            });

        } else {

            batch.delete(publicRef);

        }

        batch.update(feedbackRef, {

            status: status

        });

        await batch.commit();

        if (status === "Approved") {

            alert("Review published successfully!");

        } else if (status === "Rejected") {

            alert("Review rejected successfully!");

        } else {

            alert("Review removed from homepage.");

        }

        await loadFeedback();

    } catch (error) {

        console.error(error);

        alert("Action failed: " + error.message);

        await loadFeedback();

    }

}
