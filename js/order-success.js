// ========================================
// PRO ROZE ORDER SUCCESS JAVASCRIPT
// ========================================


// ========================================
// GET LAST ORDER
// ========================================

const order =
    JSON.parse(
        localStorage.getItem("lastOrder")
    );


// ========================================
// CHECK ORDER
// ========================================

if (!order) {

    alert(
        "No recent order found."
    );

    window.location.href =
        "products.html";
}


// ========================================
// DISPLAY ORDER DETAILS
// ========================================

if (order) {


    // ========================================
    // ORDER ID
    // ========================================

    document.getElementById(
        "orderId"
    ).textContent =
        order.orderId;


    // ========================================
    // CUSTOMER DETAILS
    // ========================================

    document.getElementById(
        "customerName"
    ).textContent =
        order.customer.name;


    document.getElementById(
        "customerEmail"
    ).textContent =
        order.customer.email;


    document.getElementById(
        "customerPhone"
    ).textContent =
        order.customer.phone;


    document.getElementById(
        "customerAddress"
    ).textContent =

        order.customer.address +
        ", " +
        order.customer.city +
        " - " +
        order.customer.pincode;


    // ========================================
    // ORDER PRODUCTS
    // ========================================

    const orderItems =
        document.getElementById(
            "orderItems"
        );


    orderItems.innerHTML = "";


    order.items.forEach(
        function (item) {

            const itemTotal =
                item.price *
                item.quantity;


            const orderItem =
                document.createElement(
                    "div"
                );


            orderItem.className =
                "order-item";


            orderItem.innerHTML = `

                <div class="order-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price}
                        ×
                        ${item.quantity}
                    </p>

                </div>


                <div class="order-item-price">

                    ₹${itemTotal}

                </div>

            `;


            orderItems.appendChild(
                orderItem
            );

        }
    );


    // ========================================
    // TOTAL AMOUNT
    // ========================================

    document.getElementById(
        "totalAmount"
    ).textContent =
        "₹" +
        order.totalAmount;

}