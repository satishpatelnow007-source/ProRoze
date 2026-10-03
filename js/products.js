// ========================================
// PRO ROZE PRODUCTS JAVASCRIPT
// ========================================


// ========================================
// GET PRODUCTS
// ========================================

const products =
    document.querySelectorAll(".shop-product");

const searchInput =
    document.getElementById("searchInput");

const noProducts =
    document.getElementById("noProducts");


// ========================================
// FILTER PRODUCTS
// ========================================

function filterProducts(category) {

    let visibleProducts = 0;

    products.forEach(function (product) {

        const productCategory =
            product.getAttribute("data-category");

        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    if (visibleProducts === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }
}


// ========================================
// SEARCH PRODUCTS
// ========================================

function searchProducts() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();

    let visibleProducts = 0;


    products.forEach(function (product) {

        const productName =
            product
                .getAttribute("data-name")
                .toLowerCase();


        const productText =
            product.innerText
                .toLowerCase();


        if (
            productName.includes(searchValue) ||
            productText.includes(searchValue)
        ) {

            product.style.display = "block";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    if (visibleProducts === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }
}


// ========================================
// SEARCH WITH ENTER KEY
// ========================================

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchProducts();

        }

    }
);


// ========================================
// ADD TO CART
// ========================================

function addToCart(
    productName,
    productPrice
) {

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


    // Update cart count immediately
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


    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    let totalQuantity = 0;


    cart.forEach(function (item) {

        totalQuantity += item.quantity;

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
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        updateLoginStatus();

    }
);


// ========================================
// VIEW PRODUCT DETAILS
// ========================================

function viewProduct(
    name,
    price,
    category,
    image,
    description
) {

    const product = {

        name: name,

        price: price,

        category: category,

        image: image,

        description: description

    };


    localStorage.setItem(
        "selectedProduct",
        JSON.stringify(product)
    );


    window.location.href =
        "product-details.html";
}