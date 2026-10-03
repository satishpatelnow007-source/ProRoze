// ========================================
// PRO ROZE CHECKOUT JAVASCRIPT
// ========================================


// ========================================
// GET CART
// ========================================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// ========================================
// DISPLAY CHECKOUT ITEMS
// ========================================

function displayCheckoutItems() {

    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );

    const checkoutSubtotal =
        document.getElementById(
            "checkoutSubtotal"
        );

    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );


    checkoutItems.innerHTML = "";


    // ========================================
    // EMPTY CART
    // ========================================

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p class="empty-checkout">
                Your cart is empty.
            </p>
        `;


        checkoutSubtotal.textContent =
            "₹0";

        checkoutTotal.textContent =
            "₹0";


        updateCartCount();

        return;
    }


    let total = 0;


    // ========================================
    // DISPLAY PRODUCTS
    // ========================================

    cart.forEach(function (item) {

        const itemTotal =
            item.price *
            item.quantity;


        total =
            total + itemTotal;


        const checkoutItem =
            document.createElement(
                "div"
            );


        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <div class="checkout-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price}
                    ×
                    ${item.quantity}
                </p>

            </div>


            <div class="checkout-item-price">

                ₹${itemTotal}

            </div>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    // ========================================
    // UPDATE TOTAL
    // ========================================

    checkoutSubtotal.textContent =
        "₹" + total;


    checkoutTotal.textContent =
        "₹" + total;


    updateCartCount();
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
// CHECKOUT FORM
// ========================================

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );


checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ========================================
        // GET FORM VALUES
        // ========================================

        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();


        const phone =
            document
                .getElementById("phone")
                .value
                .trim();


        const address =
            document
                .getElementById("address")
                .value
                .trim();


        const city =
            document
                .getElementById("city")
                .value
                .trim();


        const pincode =
            document
                .getElementById("pincode")
                .value
                .trim();


        const paymentElement =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        // ========================================
        // VALIDATION
        // ========================================

        if (name === "") {

            alert(
                "Please enter your full name."
            );

            return;
        }


        if (email === "") {

            alert(
                "Please enter your email address."
            );

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(email)
        ) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }


        if (phone === "") {

            alert(
                "Please enter your mobile number."
            );

            return;
        }


        if (
            !/^[0-9]{10}$/.test(phone)
        ) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            return;
        }


        if (address === "") {

            alert(
                "Please enter your delivery address."
            );

            return;
        }


        if (city === "") {

            alert(
                "Please enter your city."
            );

            return;
        }


        if (
            !/^[0-9]{6}$/.test(pincode)
        ) {

            alert(
                "Please enter a valid 6-digit pincode."
            );

            return;
        }


        if (!paymentElement) {

            alert(
                "Please select a payment method."
            );

            return;
        }


        // ========================================
        // CHECK CART
        // ========================================

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a product first."
            );


            window.location.href =
                "products.html";


            return;
        }


        // ========================================
        // PAYMENT METHOD
        // ========================================

        const payment =
            paymentElement.value;


        // ========================================
        // CALCULATE TOTAL
        // ========================================

        let total = 0;


        cart.forEach(function (item) {

            total +=
                item.price *
                item.quantity;

        });


        // ========================================
        // CREATE ORDER
        // ========================================

        const order = {

            orderId:
                "PR" +
                Date.now(),

            customer: {

                name: name,

                email: email,

                phone: phone,

                address: address,

                city: city,

                pincode: pincode

            },

            paymentMethod:
                payment,

            items:
                cart,

            totalAmount:
                total,

            orderDate:
                new Date()
                    .toLocaleString()

        };


        // ========================================
        // SAVE ORDER
        // ========================================

        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );


        // Remove cart after order
        localStorage.removeItem(
            "cart"
        );


        // ========================================
        // SUCCESS MESSAGE
        // ========================================

        alert(
            "🎉 Order placed successfully!\n\n" +

            "Order ID: " +
            order.orderId +

            "\n\n" +

            "Total Amount: ₹" +
            order.totalAmount +

            "\n\n" +

            "Thank you for shopping with ProRoze 🌹"
        );


        // ========================================
        // GO TO HOME
        // ========================================

        window.location.href =
            "index.html";

    }
);


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCheckoutItems();

        updateCartCount();

        updateLoginStatus();

    }
);