import { myDishes } from "./scripts/db.js";
import {
  createDishElement,
  createCartItem
} from "./scripts/templates.js";

const dishesContainer = document.getElementById("myDishes");
const cartItemsDiv = document.getElementById("cartItems");
let cart = {};

function renderDishes(category, headline) {
  addCategoryHeadline(category, headline);
  getDishesByCategory(category).forEach((dish, index) => {
    dishesContainer.append(createDishElement(dish, index, addToCart));
  });
}

function addCategoryHeadline(category, headline) {
  const heading = document.createElement("h2");
  heading.id = category;
  heading.textContent = headline;
  dishesContainer.append(heading);
}

function getDishesByCategory(category) {
  return myDishes.filter(dish => dish.category === category);
}

function addToCart(dish) {
  cart[dish.name] = cart[dish.name]
    ? { ...cart[dish.name], quantity: cart[dish.name].quantity + 1 }
    : { ...dish, quantity: 1 };
  renderCart();
}

function renderCart() {
  cartItemsDiv.innerHTML = "";
  Object.values(cart).forEach(item =>
    cartItemsDiv.append(createCartItem(item, changeQuantity))
  );
  updateCartTotal();
}

function changeQuantity(item, delta) {
  if (item.quantity + delta > 0) {
    item.quantity += delta;
  } else {
    delete cart[item.name];
  }
  renderCart();
}

function updateCartTotal() {
  const cartTotalValue = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotal = document.getElementById("cartTotal");
  if (cartTotal) cartTotal.textContent = `Gesamtsumme: ${cartTotalValue.toFixed(2)} €`;
}

function handleOrder() {
  const orderMessage = document.getElementById("orderMessage");
  const isEmpty = Object.keys(cart).length === 0;
  orderMessage.classList.remove("orderSuccess", "orderError");
  if (isEmpty) {
    showOrderMessage(orderMessage, "Keine Artikel im Warenkorb!", "orderError");
  } else {
    cart = {};
    renderCart();
    showOrderMessage(orderMessage, "Testbestellung erfolgreich!", "orderSuccess");
  }
}

function showOrderMessage(element, message, type) {
  element.textContent = message;
  element.classList.add(type);
  element.style.display = "block";
  setTimeout(() => (element.style.display = "none"), 3000);
}

document.getElementById("cartOrderButton").addEventListener("click", handleOrder);

window.toggleBasket = function () {
  toggleCartDisplay(true);
};

window.closeBasket = function () {
  toggleCartDisplay(false);
};

function toggleCartDisplay(show) {
  const cartSidebar = document.querySelector(".cartSidebar");
  const cartSidebarBackground = document.querySelector(".cartSidebarBackground");
  const respoBasketBtn = document.getElementById("respoBasketBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const myDishes = document.getElementById("myDishes");

  if (cartSidebar && cartSidebarBackground && respoBasketBtn && closeCartBtn && myDishes) {
    cartSidebar.style.display = show ? "flex" : "none";
    cartSidebarBackground.style.display = show ? "flex" : "none";
    respoBasketBtn.style.display = show ? "none" : "block";
    closeCartBtn.style.display = show ? "block" : "none";
    myDishes.style.paddingRight = show ? "0" : "10px";
  }

  // <= 600px no scroll for content
  if (window.innerWidth <= 600) {
    document.body.style.overflow = show ? "hidden" : "auto";
    const mainContent = document.querySelector('.mainContent');
    if (mainContent) {
      mainContent.style.overflow = show ? "hidden" : "auto";
    }
  } else {
    document.body.style.overflow = "auto";
    const mainContent = document.querySelector('.mainContent');
    if (mainContent) {
      mainContent.style.overflow = "auto";
    }
  }
}

document.getElementById("closeCartBtn").onclick = window.closeBasket;

renderDishes("starters", "Vorspeisen");
renderDishes("main", "Hauptgerichte");
renderDishes("desserts", "Desserts");
renderDishes("drinks", "Getränke");