import {myDishes} from "./scripts/db.js";

const dishesContainer = document.getElementById("myDishes");
const cartItemsDiv = document.getElementById("cartItems"); 
let cart = {}; 



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
        createpricePar.classList.add("dishPrice");
        dishDiv.append(createpricePar);

        let createDishesDiv = document.createElement("div");
        createDishesDiv.classList.add("singleDish");
        let createToOrderDiv = document.createElement("div");
        let createToOrder = document.createElement("button");
        createToOrder.append("+");

        
        createToOrder.addEventListener("click", () => addToCart(dish));

        createToOrderDiv.append(createToOrder);
        createDishesDiv.append(createToOrderDiv);
        createDishesDiv.append(dishDiv);
        dishesContainer.append(createDishesDiv);

    
    })
}

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
        cartItem.classList.add("cartItem");

        // Name
        const nameSpan = document.createElement("span");
        nameSpan.textContent = item.name;

        // Minus-Button
        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-";
        minusBtn.classList.add("cartBtn");
        minusBtn.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                delete cart[item.name];
            }
            renderCart();
        });

        // Plus-Button
        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.classList.add("cartBtn");
        plusBtn.addEventListener("click", () => {
            item.quantity += 1;
            renderCart();
        });

        // Anzahl mittig
        const qtySpan = document.createElement("span");
        qtySpan.textContent = item.quantity;
        qtySpan.classList.add("cartQtyNumber");

        // Buttons und Anzahl nebeneinander
        const quantityDiv = document.createElement("div");
        quantityDiv.classList.add("cartQuantity");
        quantityDiv.appendChild(minusBtn);
        quantityDiv.appendChild(qtySpan);
        quantityDiv.appendChild(plusBtn);

        // Preis
        const priceSpan = document.createElement("span");
        priceSpan.classList.add("priceSpan");
        priceSpan.textContent = `${(item.price * item.quantity).toFixed(2)} €`;

        // Zusammenbauen
        cartItem.appendChild(nameSpan);
        cartItem.appendChild(quantityDiv);
        cartItem.appendChild(priceSpan);

        cartItemsDiv.appendChild(cartItem);
    });

    // Gesamtsumme berechnen und anzeigen
    const cartTotalValue = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

    let cartTotal = document.getElementById("cartTotal");
    if (!cartTotal) {
        cartTotal = document.createElement("div");
        cartTotal.id = "cartTotal";
        cartTotal.style.marginTop = "16px";
        cartTotal.style.fontWeight = "bold";
        cartTotal.style.fontSize = "18px";
        cartTotal.style.textAlign = "right";
        cartItemsDiv.appendChild(cartTotal);
    }
    cartTotal.textContent = `Gesamtsumme: ${cartTotalValue.toFixed(2)} €`;
}
//bis hier



renderDishes("starters", "Vorspeisen");
renderDishes("main", "Hauptgerichte");
renderDishes("desserts", "Desserts");
renderDishes("drinks", "Getränke");

