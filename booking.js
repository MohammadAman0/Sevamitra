```javascript
import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";  
  
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
        const docRef = await addDoc(collection(db, "bookings"), {  
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
  
        console.log("Booking successful. ID:", docRef.id);  
  
        alert("Booking Successful! 🎉");  
  
        form.reset();  
  
    } catch (error) {  
  
        console.error("Booking Error:", error);  
  
        alert(  
            "Booking failed!\n\n" +  
            error.code + "\n" +  
            error.message  
        );  
    }  
});
```
