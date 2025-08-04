// js/auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAWJYjQpz0YOUETW6CUqQ7P8tqQlj6eDjM",
  authDomain: "aypnetwork.firebaseapp.com",
  projectId: "aypnetwork",
  storageBucket: "aypnetwork.firebasestorage.app",
  messagingSenderId: "595690817822",
  appId: "1:595690817822:web:dd53953fa39a7aacbc610f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form = document.getElementById("signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Thank you for signing up to AYP. Your details have been submitted.");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("❌ Error: " + error.message);
  }
});
