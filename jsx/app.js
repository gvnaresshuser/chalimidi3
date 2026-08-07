//console.log("🍬 Chalimidi Sweets Loaded Successfully");
/*
==========================================
Toast Notification
==========================================
*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const icon = document.querySelector(".menu-toggle i");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

/* function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
} */
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.className = "";

  toast.classList.add("show");

  toast.classList.add(type);

  setTimeout(() => {
    toast.classList.remove("show", "success", "error");
  }, 2000);
}