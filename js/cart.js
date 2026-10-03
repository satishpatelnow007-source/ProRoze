// ========================================
// PRO ROZE CART JAVASCRIPT
// ========================================


// ========================================
// GET CART
// ========================================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// ========================================
// DISPLAY CART
// ========================================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    const cartTotal =
        document.getElementById("cartTotal");

    const finalTotal =
        document.getElementById("finalTotal");


    cartItems.innerHTML = "";


    // ========================================
    // EMPTY CART
    // ========================================

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        cartTotal.textContent = "₹0";

        finalTotal.textContent = "₹0";

        updateCartCount();

        return;
    }


    emptyCart.style.display = "none";


    let total = 0;


    // ========================================
    // DISPLAY CART PRODUCTS
    // ========================================

    cart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.quantity;


        total =
            total + itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">
                🌹
            </div>


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price}
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    class="quantity-btn"
                    onclick="decreaseQuantity(${index})">
                    −
                </button>


                <span class="quantity">
                    ${item.quantity}
                </span>


                <button
                    class="quantity-btn"
                    onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <div class="item-total">

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    // ========================================
    // UPDATE TOTAL
    // ========================================

    cartTotal.textContent =
        "₹" + total;


    finalTotal.textContent =
        "₹" + total;


    // Update navbar cart count
    updateCartCount();
}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(index) {

    cart[index].quantity++;


    saveCart();


    displayCart();
}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(index) {

    if (
        cart[index].quantity > 1
    ) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();


    displayCart();
}


// ========================================
// REMOVE PRODUCT
// ========================================

function removeFromCart(index) {

    const productName =
        cart[index].name;


    const confirmRemove =
        confirm(
            "Do you want to remove " +
            productName +
            " from your cart?"
        );


    if (confirmRemove) {

        cart.splice(index, 1);


        saveCart();


        displayCart();

    }
}


// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

    const cartLink =
        document.querySelector(
            'a[href="cart.html"]'
        );


    if (!cartLink) {

        return;

    }


    let totalQuantity = 0;


    cart.forEach(function (item) {

        totalQuantity +=
            item.quantity;

    });


    cartLink.textContent =
        "Cart 🛒 (" +
        totalQuantity +
        ")";
}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem(
        "isLoggedIn"
    );

    localStorage.removeItem(
        "userName"
    );

    localStorage.removeItem(
        "userEmail"
    );


    alert(
        "You have been logged out successfully."
    );


    window.location.href =
        "index.html";
}


// ========================================
// UPDATE LOGIN STATUS
// ========================================

function updateLoginStatus() {

    const isLoggedIn =
        localStorage.getItem(
            "isLoggedIn"
        );


    const userName =
        localStorage.getItem(
            "userName"
        );


    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    if (!navLinks) {

        return;

    }


    if (
        isLoggedIn === "true" &&
        userName
    ) {

        const loginLink =
            navLinks.querySelector(
                'a[href="login.html"]'
            );


        if (loginLink) {

            loginLink.textContent =
                "👤 " +
                userName;


            loginLink.href =
                "#";


            loginLink.onclick =
                function (event) {

                    event.preventDefault();

                    logout();

                };

        }

    }
}


// ========================================
// CHECKOUT
// ========================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }


    window.location.href =
        "checkout.html";
}


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

        updateLoginStatus();

    }
);