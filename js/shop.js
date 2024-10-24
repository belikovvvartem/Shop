document.addEventListener('DOMContentLoaded', () => {
    const productsDiv = document.getElementById('products');

    // Завантажити товари продавця з локального зберігання або сервера
    const sellerProducts = JSON.parse(localStorage.getItem('sellerProducts')) || [];

    // Приклад товарів (можна видалити, якщо будуть тільки товари продавця)
    const defaultProducts = [
        { id: 1, name: 'Товар 1', price: 100, image: 'https://via.placeholder.com/200' },
        { id: 2, name: 'Товар 2', price: 150, image: 'https://via.placeholder.com/200' }
    ];

    const products = [...defaultProducts, ...sellerProducts];

    // Рендер товарів на головній сторінці
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price} грн</p>
            <button onclick="orderProduct(${product.id})">Замовити</button>
        `;
        productsDiv.appendChild(productCard);
    });
});

function orderProduct(productId) {
    window.location.href = `order.html?product=${productId}`;
}
