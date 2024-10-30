// Імпорти для Firebase
import { auth } from './firebase.js'; // Використовуйте auth з firebase.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    // Реєстрація
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            // Реєстрація через Firebase Authentication
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('Registration successful');
                    window.location.href = "seller-panel.html"; // Перехід на сторінку з привітанням
                })
                .catch((error) => {
                    errorMessage.textContent = error.message;
                    console.error('Error during registration:', error);
                });
        });
    }

    // Вхід
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Вхід через Firebase Authentication
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('Login successful');
                    window.location.href = "seller-panel.html"; // Перехід на сторінку з привітанням
                })
                .catch((error) => {
                    errorMessage.textContent = error.message;
                    console.error('Error during login:', error);
                });
        });
    }
});

