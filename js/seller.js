document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');
    const sellerProductsDiv = document.getElementById('sellerProducts');

    // Завантажити вже додані товари продавця з локального зберігання або сервера
    let products = JSON.parse(localStorage.getItem('sellerProducts')) || [];

    // Функція для рендерингу товарів на сторінці продавця
    function renderProducts() {
        sellerProductsDiv.innerHTML = ''; // Очищуємо попередній контент
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Ціна: ${product.price} грн</p>
                <button onclick="deleteProduct(${index})">Видалити</button>
            `;
            sellerProductsDiv.appendChild(productCard);
        });
    }

    // Додавання товару
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const image = document.getElementById('productImage').value;

        const newProduct = { name, price, image };

        products.push(newProduct);
        localStorage.setItem('sellerProducts', JSON.stringify(products));

        // Оновити список товарів
        renderProducts();
        addProductForm.reset();
    });

    // Видалення товару
    window.deleteProduct = (index) => {
        products.splice(index, 1); // Видаляємо товар по індексу
        localStorage.setItem('sellerProducts', JSON.stringify(products));
        renderProducts(); // Оновлюємо рендер
    };

    // Спочатку рендеримо всі товари
    renderProducts();
});
