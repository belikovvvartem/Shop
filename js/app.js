import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDocs, collection, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase конфігурація
const firebaseConfig = {
    apiKey: "AIzaSyD8C7SPhWbWcV8OzUL6ITE9bxNBINf59XE",
    authDomain: "first-project-1b329.firebaseapp.com",
    projectId: "first-project-1b329",
    storageBucket: "first-project-1b329.appspot.com",
    messagingSenderId: "316947894802",
    appId: "1:316947894802:web:ce4bf3621df98ab0b1fecb",
    measurementId: "G-6K6YFNZ27V"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// Функція для завантаження зображення в Firebase Storage
function uploadImage(file, callback) {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Завантажено ${progress}%`);
    }, 
    (error) => {
        console.error('Помилка при завантаженні зображення:', error);
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            callback(downloadURL);
        });
    });
}

// Функція для додавання товару в базу даних Firestore
async function addProductToFirestore(name, price, imageURL) {
    const productId = Date.now().toString();
    await setDoc(doc(db, "products", productId), {
        name: name,
        price: price,
        imageURL: imageURL,
        id: productId
    });
}

// Функція для відображення товару на сторінці
function displayProduct(name, price, imageURL, id) {
    const productList = document.getElementById('product-list');
    const productCard = document.createElement('div');
    productCard.innerHTML = `
        <img src="${imageURL}" alt="Product Image">
        <h3>${name}</h3>
        <p>Ціна: ${price} грн</p>
        <button class="delete-btn" data-id="${id}">Видалити</button>
    `;
    productList.appendChild(productCard);

    // Видалення товару
    productCard.querySelector('.delete-btn').addEventListener('click', async () => {
        await deleteDoc(doc(db, "products", id));
        productCard.remove();
    });
}

// Завантаження всіх товарів при завантаженні сторінки
async function loadProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        displayProduct(product.name, product.price, product.imageURL, product.id);
    });
}

// Додавання товару через форму
const productForm = document.getElementById('product-form');
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productImageFile = document.getElementById('product-image').files[0];

    if (productImageFile) {
        uploadImage(productImageFile, (downloadURL) => {
            addProductToFirestore(productName, productPrice, downloadURL).then(() => {
                displayProduct(productName, productPrice, downloadURL, Date.now().toString());
            });
        });
    }
});

// Завантаження товарів при старті
loadProducts();
