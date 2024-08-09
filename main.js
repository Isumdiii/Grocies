document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.querySelector("#cart-table tbody");
    const totalPriceElement = document.getElementById("total-price");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const saveFavoritesButton = document.getElementById("save-favorites-btn");
    const applyFavoritesButton = document.getElementById("apply-favorites-btn");
    const buyNowButton = document.getElementById("buy-now-btn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let favoriteOrders = JSON.parse(localStorage.getItem("favoriteOrders")) || [];

    const updateCart = () => {
        cartTableBody.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>LKR ${item.price.toFixed(2)}</td>
                <td>LKR ${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-from-cart-btn">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        });
        totalPriceElement.textContent = `LKR ${total.toFixed(2)}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const saveAsFavoriteOrder = () => {
        favoriteOrders.push([...cart]); // Save a copy of the current cart
        localStorage.setItem("favoriteOrders", JSON.stringify(favoriteOrders));
        alert("Your favourites have been saved.");
    };

    const applyFavoriteOrder = () => {
        if (favoriteOrders.length > 0) {
            const favoriteOrder = favoriteOrders[favoriteOrders.length - 1]; // Apply the last saved favorite order
            favoriteOrder.forEach(favItem => {
                const existingItem = cart.find(item => item.name === favItem.name);
                if (existingItem) {
                    existingItem.quantity += favItem.quantity;
                } else {
                    cart.push({ ...favItem });
                }
            });
            updateCart();
        }
    };

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productItem = event.target.closest(".product-item");
            const productName = productItem.querySelector("h4").textContent;
            const productPrice = parseFloat(productItem.querySelector("p").textContent.replace('LKR', '').trim());
            const productQuantity = parseInt(productItem.querySelector("input[type='number']").value) || 1;

            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += productQuantity;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: productQuantity });
            }
            updateCart();
        });
    });

    cartTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-from-cart-btn")) {
            const row = event.target.closest("tr");
            const productName = row.children[0].textContent;
            cart = cart.filter(item => item.name !== productName);
            updateCart();
        }
    });

    saveFavoritesButton.addEventListener("click", saveAsFavoriteOrder);

    applyFavoritesButton.addEventListener("click", applyFavoriteOrder);

    buyNowButton.addEventListener("click", () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "./details.html";
    });

    updateCart();
});
