// ========================================
// PRO ROZE MAIN APP JAVASCRIPT
// ========================================


// ========================================
// ADD PRODUCT TO CART
// ========================================

function addToCart(productName, productPrice) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(function (item) {

            return item.name === productName;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: productName,

            price: productPrice,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        productName +
        " added to cart 🛒"
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


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    let totalQuantity = 0;


    cart.forEach(function (item) {

        totalQuantity += item.quantity;

    });


    cartLink.textContent =
        "Cart 🛒 (" + totalQuantity + ")";
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


    // ========================================
    // USER IS LOGGED IN
    // ========================================

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
                "👤 " + userName;

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
// RUN WHEN PAGE LOADS
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        updateLoginStatus();

    }
);



// ========================================
// MOBILE HAMBURGER MENU
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        const navLinks =
            document.getElementById(
                "navLinks"
            );


        if (
            !menuToggle ||
            !navLinks
        ) {

            return;

        }


        // ========================================
        // OPEN / CLOSE MENU
        // ========================================

        menuToggle.addEventListener(
            "click",
            function () {

                navLinks.classList.toggle(
                    "active"
                );


                // Change hamburger icon

                if (
                    navLinks.classList.contains(
                        "active"
                    )
                ) {

                    menuToggle.textContent =
                        "✕";

                } else {

                    menuToggle.textContent =
                        "☰";

                }

            }
        );


        // ========================================
        // CLOSE MENU AFTER CLICKING LINK
        // ========================================

        const links =
            navLinks.querySelectorAll("a");


        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.classList.remove(
                            "active"
                        );


                        menuToggle.textContent =
                            "☰";

                    }
                );

            }
        );

    }
);