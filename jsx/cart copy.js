/*
==========================================
CHALIMIDI SWEETS
Shopping Cart
Version 1.0
==========================================
*/

let cart = [];

/*
==========================================
Find Product
==========================================
*/

function findProduct(productId) {
  return PRODUCTS.find((product) => product.id === productId);
}

/*
==========================================
Selected Quantity
==========================================
*/

function getSelectedQuantity(productId) {
  const select = document.querySelector(
    `.quantity-select[data-id="${productId}"]`,
  );

  return {
    value: Number(select.value),

    label: select.options[select.selectedIndex].text,
  };
}

/*
==========================================
Calculate Total
==========================================
*/

function calculateItemTotal(pricePerKg, quantity) {
  return pricePerKg * quantity;
}

/*
==========================================
Save Cart
==========================================
*/

function saveCart() {
  localStorage.setItem("chalimidiCart", JSON.stringify(cart));
}

/*
==========================================
Load Cart
==========================================
*/

function loadCart() {
  const storedCart = localStorage.getItem("chalimidiCart");

  if (!storedCart) return;

  cart = JSON.parse(storedCart);

  renderCart();
}
/*
==========================================
Add Item To Cart
==========================================
*/

function addToCart(productId) {
  const product = findProduct(productId);

  const quantity = getSelectedQuantity(productId);

  const existingItem = cart.find(
    (item) => item.id === productId && item.quantity === quantity.value,
  );

  if (existingItem) {
    //showToast(`${product.name} (${quantity.label}) already added`);
showToast(`${product.name} (${quantity.label}) already added`, "error");
    return;
  }

  cart.push({
    id: product.id,

    name: product.name,

    image: product.image,

    quantity: quantity.value,

    quantityLabel: quantity.label,

    pricePerKg: product.pricePerKg,

    total: calculateItemTotal(product.pricePerKg, quantity.value),
  });

  renderCart();

  saveCart();

  //showToast(`${product.name} added successfully`);
  showToast(`${product.name} added successfully`, "success");
}

/*
==========================================
Remove Item
==========================================
*/

function removeFromCart(productId, quantity) {
  cart = cart.filter((item) => {
    return !(item.id === productId && item.quantity === quantity);
  });

  renderCart();

  saveCart();
}

/*
==========================================
Remove Item
==========================================
*/

function removeFromCart(productId, quantity) {
  cart = cart.filter((item) => {
    return !(item.id === productId && item.quantity === quantity);
  });

  renderCart();

  saveCart();
}

/*
==========================================
Clear Cart
==========================================
*/

/* function clearCart() {
  if (!confirm("Clear all items from the cart?")) {
    return;
  }

  cart = [];

  renderCart();

  saveCart();

  showToast("Cart cleared.");
} */
function clearCart() {
  document.getElementById("confirmModal").classList.remove("hidden");
  const confirmModal = document.getElementById("confirmModal");

  const confirmClearBtn = document.getElementById("confirmClearBtn");

  const cancelClearBtn = document.getElementById("cancelClearBtn");

  confirmClearBtn.addEventListener("click", () => {
    cart = [];

    renderCart();

    saveCart();

    showToast("Cart cleared.");

    confirmModal.classList.add("hidden");
  });

  cancelClearBtn.addEventListener("click", () => {
    confirmModal.classList.add("hidden");
  });
}


/*
==========================================
Render Cart
==========================================
*/

function renderCart() {
  const cartPanel = document.getElementById("cartPanel");

  const cartBadge = document.getElementById("cartBadge");

  const cartToggleBtn = document.getElementById("cartToggleBtn");

  const cartItems = document.getElementById("cartItems");

  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  cartItems.innerHTML = "";

  let grandTotal = 0;

  cart.forEach((item) => {
    grandTotal += item.total;
    cartItems.innerHTML += `
            <div class="cart-item">
                <strong>
                    ${item.name}
                </strong>
                <small>
                    ${item.quantityLabel}
                </small>
                <br>
                ₹${item.total}
                 <br>
                <button
    class="remove-btn"
    onclick="removeFromCart(
        ${item.id},
        ${item.quantity}
    )">
    🗑 Remove
</button>
            </div>
        `;
  });

  cartTotal.textContent = grandTotal;
  cartCount.textContent = cart.length;
  cartBadge.textContent = cart.length;
  const cartBadgeNav = document.getElementById("cartBadgeNav");

  if (cartBadgeNav) {
    cartBadgeNav.textContent = cart.length;
  }
  if (cart.length === 0) {
    cartPanel.classList.add("hidden");

    cartToggleBtn.style.display = "block";
  } else {
    cartPanel.classList.remove("hidden");

    cartToggleBtn.style.display = "none";
  }
}


loadCart();

/*
==========================================
Clear Cart Button
==========================================
*/

const clearCartBtn = document.getElementById("clearCartBtn");

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", clearCart);
  console.log("Clear Cart button initialized.");
}

const cartToggleBtn = document.getElementById("cartToggleBtn");

cartToggleBtn.addEventListener("click", () => {
  document.getElementById("cartPanel").classList.remove("hidden");

  cartToggleBtn.style.display = "none";
});