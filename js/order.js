document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    const orderData = {
        name,
        address,
        email
    };

    // Відправка на емайл або інша логіка обробки замовлення
    console.log('Order Data:', orderData);
    
    alert('Замовлення успішно відправлено!');
});
