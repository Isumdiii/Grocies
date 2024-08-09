document.addEventListener("DOMContentLoaded", () => {
    const orderSummaryTableBody = document.querySelector("#order-summary-table tbody");
    const totalPriceElement = document.getElementById("total-price");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updateOrderSummary = () => {
        orderSummaryTableBody.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>LKR ${item.price.toFixed(2)}</td>
                <td>LKR ${(item.price * item.quantity).toFixed(2)}</td>
            `;
            orderSummaryTableBody.appendChild(row);
            total += item.price * item.quantity;
        });
        totalPriceElement.textContent = `LKR ${total.toFixed(2)}`;
    };

    updateOrderSummary();
});
