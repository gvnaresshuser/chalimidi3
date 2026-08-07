/*
==========================================
PRODUCTS PAGE
==========================================
*/

const productGrid = document.getElementById("productGrid");

/*
==========================================
Application State
==========================================
*/

let selectedCategory = "All";

let searchKeyword = "";

/*
==========================================
Quantity Dropdown
==========================================
*/

function createQuantityDropdown(productId) {
  return `
        <select
            class="quantity-select"
            data-id="${productId}">

            ${QUANTITY_OPTIONS.map(
              (option) => `
                <option value="${option.value}">
                    ${option.label}
                </option>
            `,
            ).join("")}

        </select>
    `;
}

/*
==========================================
Single Product Card
==========================================
*/

function createProductCard(product) {
  return `

        <div class="product-card">

            <img
                src="${product.image}"
                alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <p class="price">

                    ₹${product.pricePerKg} / Kg

                </p>

                ${createQuantityDropdown(product.id)}

                <button
    class="add-btn"
    data-id="${product.id}">

    <i class="fa-solid fa-cart-shopping"></i>&nbsp;

    Add To Order

</button>

            </div>

        </div>

    `;
}

/*
==========================================
Render Products
==========================================
*/

function renderProducts(products) {
  if (products.length === 0) {
    productGrid.innerHTML = `

            <div class="no-products">

                <h2>😔 No Products Found</h2>

                <p>

                    Try searching with another keyword.

                </p>

            </div>

        `;

    return;
  }

  productGrid.innerHTML = products.map(createProductCard).join("");

  attachEvents();
}

/*
==========================================
Attach Button Events
==========================================
*/

function attachEvents() {
  document.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      addToCart(id);
    });
  });
}

/*
==========================================
Initial Render
==========================================
*/

renderProducts(PRODUCTS);
updateProductCount(PRODUCTS.length);
/*
==========================================
Live Search
==========================================
*/

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input", () => {
  searchKeyword = searchBox.value

    .toLowerCase()

    .trim();

  applyFilters();
});
/*
==========================================
Apply Filters
==========================================
*/

function applyFilters() {
  let filteredProducts = PRODUCTS;

  // Category Filter

  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory,
    );
  }

  // Search Filter

  if (searchKeyword !== "") {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchKeyword) ||
        product.description.toLowerCase().includes(searchKeyword),
    );
  }

  renderProducts(filteredProducts);

  updateProductCount(filteredProducts.length);
}

/*
==========================================
Category Filter
==========================================
*/

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    selectedCategory = button.dataset.category;

    applyFilters();
  });
});

/*
==========================================
Update Product Count
==========================================
*/

function updateProductCount(count) {
  const productCount = document.getElementById("productCount");

  if (count === 1) {
    productCount.textContent = "Showing 1 Product";
  } else {
    productCount.textContent = `Showing ${count} Products`;
  }
}

const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutModal = document.getElementById("checkoutModal");

const closeModal = document.getElementById("closeModal");

checkoutBtn.addEventListener("click", () => {
  checkoutModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
});
//---------------------------------------------
const closeCartBtn = document.getElementById("closeCartBtn");

closeCartBtn.addEventListener("click", () => {
  document.getElementById("cartPanel").classList.add("hidden");
});

document.getElementById("ordersBtn").addEventListener("click", (e) => {
  e.preventDefault();

  document.getElementById("cartPanel").classList.remove("hidden");
});
//----------------------------------------------------------
const cartSummary = document.getElementById("cartPanel");
console.log("cartToggleBtn-cartSummary", cartSummary);
let scrollTimer;

window.addEventListener("scroll", () => {
  console.log("scrolling");
  cartSummary.classList.add("hidden");

});
