// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8C7SPhWbWcV8OzUL6ITE9bxNBINf59XE",
    authDomain: "first-project-1b329.firebaseapp.com",
    projectId: "first-project-1b329",
    storageBucket: "first-project-1b329.appspot.com",
    messagingSenderId: "316947894802",
    appId: "1:316947894802:web:ce4bf3621df98ab0b1fecb",
    measurementId: "G-9825VE18B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Ініціалізація аутентифікації

// Експортуйте auth, щоб його можна було використовувати в app.js
export { auth };

const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('error-message');


// Ініціалізація Firebase
