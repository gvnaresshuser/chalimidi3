console.log("whatsapp.js loaded");
console.log(CONFIG);
console.log(CONFIG.SHOP_NAME);
/*
==========================================
CHALIMIDI SWEETS
WhatsApp Checkout
==========================================
*/

function generateWhatsAppMessage() {
  if (cart.length === 0) {
    showToast("Your cart is empty.");

    return "";
  }

  const customerName = document.getElementById("customerName").value.trim();

  const customerPhone = document.getElementById("customerPhone").value.trim();

  const customerAddress = document
    .getElementById("customerAddress")
    .value.trim();

  /*
    ==========================================
    Current Date & Time
    ==========================================
    */

  const now = new Date();

  const orderDate = now.toLocaleDateString("en-IN", {
    day: "2-digit",

    month: "short",

    year: "numeric",
  });

  const orderTime = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",

    minute: "2-digit",
  });

  let grandTotal = 0;

  let message = `*${CONFIG.SHOP_NAME}*

Hello,

I would like to place the following order.

`;

  cart.forEach((item, index) => {
    grandTotal += item.total;

    message += `${index + 1}. ${item.name}
Quantity : ${item.quantityLabel}
Amount : ${CONFIG.CURRENCY}${item.total.toFixed(2)}
----------------------------
`;
  });

  message += `
Grand Total
${CONFIG.CURRENCY}${grandTotal.toFixed(2)}

━━━━━━━━━━━━━━━━━━━━

Customer Details

Name : ${customerName}
Phone : +91 ${customerPhone}
Address : ${customerAddress}

━━━━━━━━━━━━━━━━━━━━

Order Date : ${orderDate}
Order Time : ${orderTime}

━━━━━━━━━━━━━━━━━━━━

Please confirm the availability.

Thank you.`;

  return encodeURIComponent(message);
}

/*
==========================================
Place WhatsApp Order
==========================================
*/

function placeWhatsAppOrder() {
  const customerName = document.getElementById("customerName").value.trim();

  const customerPhone = document.getElementById("customerPhone").value.trim();

  const customerAddress = document
    .getElementById("customerAddress")
    .value.trim();

  if (!customerName || !customerPhone || !customerAddress) {
    showToast("Please complete all customer details.", "error");

    return;
  }

  const message = generateWhatsAppMessage();

  if (!message) return;

  const url = `https://wa.me/${CONFIG.SHOP_PHONE}?text=${message}`;

  window.open(url, "_blank");
}

/*
==========================================
WhatsApp Button
==========================================
*/

const whatsappBtn = document.getElementById("whatsappBtn");

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", placeWhatsAppOrder);
}
