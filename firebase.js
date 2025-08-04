// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWJYjQpz0YOUETW6CUqQ7P8tqQlj6eDjM",
  authDomain: "aypnetwork.firebaseapp.com",
  projectId: "aypnetwork",
  storageBucket: "aypnetwork.firebasestorage.app",
  messagingSenderId: "595690817822",
  appId: "1:595690817822:web:dd53953fa39a7aacbc610f",
  measurementId: "G-QYRJ1TMJW8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
