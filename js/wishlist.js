// ========================================
// PRO ROZE WISHLIST JAVASCRIPT
// ========================================


// GET WISHLIST

let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];


// GET ELEMENTS

const wishlistContainer =
    document.getElementById(
        "wishlistContainer"
    );

const emptyWishlist =
    document.getElementById(
        "emptyWishlist"
    );


// ========================================
// DISPLAY WISHLIST
// ========================================

function displayWishlist() {

    wishlistContainer.innerHTML = "";


    if (wishlist.length === 0) {

        emptyWishlist.style.display =
            "block";

        return;

    }


    emptyWishlist.style.display =
        "none";


    wishlist.forEach(
        function (product, index) {

            const card =
                document.createElement("div");

            card.className =
                "wishlist-card";


            card.innerHTML = `

                <div class="wishlist-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <div class="wishlist-info">

                    <span class="wishlist-category">

                        ${product.category}

                    </span>


                    <h3>
                        ${product.name}
                    </h3>


                    <p class="wishlist-price">

                        ₹${product.price}

                    </p>


                    <div class="wishlist-buttons">

                        <button
                            class="cart-btn"
                            onclick="addWishlistToCart(${index})"
                        >
                            🛒 Add to Cart
                        </button>


                        <button
                            class="remove-wishlist-btn"
                            onclick="removeFromWishlist(${index})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;


            wishlistContainer.appendChild(card);

        }
    );

}


// ========================================
// REMOVE FROM WISHLIST
// ========================================

function removeFromWishlist(index) {

    wishlist.splice(index, 1);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    displayWishlist();

}


// ========================================
// ADD WISHLIST PRODUCT TO CART
// ========================================

function addWishlistToCart(index) {

    const product =
        wishlist[index];


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(
            function (item) {

                return (
                    item.name ===
                    product.name
                );

            }
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        product.name +
        " added to cart 🛒"
    );

}


// ========================================
// LOAD WISHLIST
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayWishlist();

    }
);