
let cart = [];

const addToCart = (id, name, price) => {
    const ifHave = cart.find(item => item.id === id);

    if (ifHave) {
        ifHave.quantity += 1;
    }

    else {
        cart.push({id, name, price, quantity:1});
    }

    displayCart();
};


const displayCart = () => {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = '';
    let total = 0;


    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement('div');
        div.innerHTML = `
            <div
                class="bg-[#F0FDF4] p-2 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 class="font-semibold">${item.name}</h2>
                  <p class="text-[#1F2937]">
                    ৳<span>${item.price}</span> x <span>${item.quantity}</span>
                  </p>
                </div>

                <i onclick="removeCart(${item.id})" class="fa-solid fa-xmark"></i>
              </div>
        `;
        cartItems.appendChild(div);
    });

    totalPrice.innerText = total.toFixed(2);
};


const removeCart = (id) => {
    const ifHave = cart.find(item => item.id === id);

    if (ifHave) {
        ifHave.quantity = ifHave.quantity - 1;
    }

    if (ifHave.quantity === 0) {
        cart = cart.filter(item => item.id !== id);
    }
    
    displayCart();
};