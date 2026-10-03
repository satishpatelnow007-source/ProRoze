// ========================================
// PRO ROZE PRODUCT DETAILS JAVASCRIPT
// ========================================


// GET ELEMENTS

const productImage =
    document.getElementById("productImage");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productDescription =
    document.getElementById("productDescription");

const productPrice =
    document.getElementById("productPrice");

const quantity =
    document.getElementById("quantity");

const increaseBtn =
    document.getElementById("increaseBtn");

const decreaseBtn =
    document.getElementById("decreaseBtn");

const addToCartBtn =
    document.getElementById("addToCartBtn");


// ========================================
// GET SELECTED PRODUCT
// ========================================

const selectedProduct =
    JSON.parse(
        localStorage.getItem("selectedProduct")
    );


// ========================================
// SHOW PRODUCT
// ========================================

if (selectedProduct) {

    productImage.src =
        selectedProduct.image;

    productImage.alt =
        selectedProduct.name;

    productName.textContent =
        selectedProduct.name;

    productCategory.textContent =
        selectedProduct.category;

    productDescription.textContent =
        selectedProduct.description;

    productPrice.textContent =
        selectedProduct.price;

}


// ========================================
// QUANTITY
// ========================================

let productQuantity = 1;


increaseBtn.addEventListener(
    "click",
    function () {

        productQuantity++;

        quantity.textContent =
            productQuantity;

    }
);


decreaseBtn.addEventListener(
    "click",
    function () {

        if (productQuantity > 1) {

            productQuantity--;

            quantity.textContent =
                productQuantity;

        }

    }
);


// ========================================
// ADD TO CART
// ========================================

addToCartBtn.addEventListener(
    "click",
    function () {

        if (!selectedProduct) {

            alert(
                "Product information not found."
            );

            return;

        }


        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        const existingProduct =
            cart.find(function (item) {

                return (
                    item.name ===
                    selectedProduct.name
                );

            });


        if (existingProduct) {

            existingProduct.quantity +=
                productQuantity;

        } else {

            cart.push({

                name:
                    selectedProduct.name,

                price:
                    selectedProduct.price,

                quantity:
                    productQuantity

            });

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        alert(
            selectedProduct.name +
            " added to cart 🛒"
        );

    }
);



// ========================================
// ADD TO WISHLIST
// ========================================

const wishlistBtn =
    document.getElementById(
        "wishlistBtn"
    );


wishlistBtn.addEventListener(
    "click",
    function () {

        if (!selectedProduct) {

            alert(
                "Product information not found."
            );

            return;

        }


        let wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];


        const alreadyExists =
            wishlist.some(
                function (item) {

                    return (
                        item.name ===
                        selectedProduct.name
                    );

                }
            );


        if (alreadyExists) {

            alert(
                "❤️ This product is already in your wishlist."
            );

            return;

        }


        wishlist.push(
            selectedProduct
        );


        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );


        alert(
            selectedProduct.name +
            " added to your wishlist ❤️"
        );

    }
);