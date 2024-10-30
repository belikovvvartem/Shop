// Зберігання товарів в localStorage
const productList = JSON.parse(localStorage.getItem('products')) || [];

// Додавання товару
document.getElementById('productForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const imageFile = document.getElementById('productImage').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        const product = {
            name,
            price,
            description,
            image: event.target.result
        };

        productList.push(product);
        localStorage.setItem('products', JSON.stringify(productList));
        displayProducts();
    };
    reader.readAsDataURL(imageFile);

    this.reset();
});

// Відображення товарів на сторінці продавця
function displayProducts() {
    const productListContainer = document.getElementById('productList');
    productListContainer.innerHTML = '';

    productList.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <p> ${product.name}</p>
            <p> ${product.price} грн</p>
            <p> ${product.description}</p>
            <button onclick="deleteProduct(${index})">Видалити</button>
        `;
        productListContainer.appendChild(productItem);
    });
}

function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productList));
    displayProducts();
}

// Відображення товарів на головній сторінці
function displayProductsOnMainPage() {
    const productDisplay = document.getElementById('productDisplay');
    productDisplay.innerHTML = '';

    productList.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <p>${product.name}</p>
            <p>${product.price} грн</p>
            <button onclick="orderProduct(${index})">Замовити</button>
        `;
        productDisplay.appendChild(productItem);
    });
}

// Відкриття форми для замовлення
function orderProduct(index) {
    const orderForm = document.getElementById('orderForm');
    orderForm.classList.remove('hidden');
    document.getElementById('orderProductForm').onsubmit = function(event) {
        event.preventDefault();
        const customerName = document.getElementById('customerName').value;
        const customerEmail = document.getElementById('customerEmail').value;

        alert(`Замовлення товару ${productList[index].name} отримано від ${customerName} (${customerEmail})`);
        orderForm.classList.add('hidden');
    };
}

// Ініціалізація
if (document.getElementById('productList')) {
    displayProducts();
} else if (document.getElementById('productDisplay')) {
    displayProductsOnMainPage();
}
