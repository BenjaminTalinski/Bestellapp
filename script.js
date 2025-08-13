import {myDishes} from "./scripts/db.js";

const dishesContainer = document.getElementById("myDishes");
const cartItemsDiv = document.getElementById("cartItems"); // <--- hinzufügen!
let cart = {}; // <--- hinzufügen!



function renderDishes (category , headline) {
    const heading = document.createElement("h2");
    heading.id = category;
    heading.textContent = headline;
    dishesContainer.append(heading);
    
    const filteredDishes = myDishes.filter((dish) => dish.category === category);
    console.log(filteredDishes)
    
    filteredDishes.forEach((dish, index)=>{
        let dishDiv = document.createElement("div");
        dishDiv.classList.add("dishDiv");
        dishDiv.id = `dish-${index}`;

        let createNamePar = document.createElement("p");
        createNamePar.append(dish.name);
        dishDiv.append(createNamePar);

        let createDescriptionPar = document.createElement("p");
        createDescriptionPar.append(dish.description);
        dishDiv.append(createDescriptionPar);

        let createpricePar = document.createElement("p");
        createpricePar.append(`${dish.price.toFixed(2)} €`);
        dishDiv.append(createpricePar);

        let createDishesDiv = document.createElement("div");
        createDishesDiv.classList.add("singleDish");
        let createToOrderDiv = document.createElement("div");
        let createToOrder = document.createElement("button");
        createToOrder.append("+");

        // Hier wird der Event Listener hinzugefügt:
        createToOrder.addEventListener("click", () => addToCart(dish));

        createToOrderDiv.append(createToOrder);
        createDishesDiv.append(createToOrderDiv);
        createDishesDiv.append(dishDiv);
        dishesContainer.append(createDishesDiv);

    
    })
}
//hier
function addToCart(dish) {
    if (cart[dish.name]) {
        cart[dish.name].quantity += 1;
    } else {
        cart[dish.name] = {
            ...dish,
            quantity: 1
        };
    }
    renderCart();
}

function renderCart() {
    cartItemsDiv.innerHTML = "";
    Object.values(cart).forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>x${item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)} €</span>
        `;
        cartItemsDiv.appendChild(cartItem);
    });
}
//bis hier

renderDishes("starters", "Vorspeisen");
renderDishes("main", "Hauptgerichte");
renderDishes("desserts", "Desserts");
renderDishes("drinks", "Getränke");
