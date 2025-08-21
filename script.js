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

        
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("cartItemName");
        nameDiv.textContent = item.name;

        
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

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.classList.add("cartBtn");
        plusBtn.addEventListener("click", () => {
            item.quantity += 1;
            renderCart();
        });

        const qtySpan = document.createElement("span");
        qtySpan.textContent = item.quantity;
        qtySpan.classList.add("cartQtyNumber");

        const quantityDiv = document.createElement("div");
        quantityDiv.classList.add("cartQuantity");
        quantityDiv.appendChild(minusBtn);
        quantityDiv.appendChild(qtySpan);
        quantityDiv.appendChild(plusBtn);

        
        const priceSpan = document.createElement("span");
        priceSpan.classList.add("cartItemPrice");
        priceSpan.textContent = `${(item.price * item.quantity).toFixed(2)} €`;

        
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("cartItemRow");
        rowDiv.appendChild(quantityDiv);
        rowDiv.appendChild(priceSpan);

        
        cartItem.appendChild(nameDiv);
        cartItem.appendChild(rowDiv);

        cartItemsDiv.appendChild(cartItem);
    });

    // Gesamtsumme berechnen und anzeigen
    const cartTotalValue = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

    const cartTotal = document.getElementById("cartTotal");
    if (cartTotal) {
        cartTotal.textContent = `Gesamtsumme: ${cartTotalValue.toFixed(2)} €`;
    }
}
//bis hier

document.getElementById('cartOrderButton').addEventListener('click', function() {
    const orderMessage = document.getElementById('orderMessage');
    // Prüfen, ob der Warenkorb leer ist
    const isEmpty = Object.keys(cart).length === 0;
    orderMessage.classList.remove('orderSuccess', 'orderError');
    if (isEmpty) {
        orderMessage.textContent = "Keine Artikel im Warenkorb!";
        orderMessage.classList.add('orderError');
        orderMessage.style.display = "block";
        setTimeout(() => {
            orderMessage.style.display = "none";
        }, 3000);
    } else {
        // Warenkorb leeren
        cart = {};
        renderCart();
        orderMessage.textContent = "Testbestellung erfolgreich!";
        orderMessage.classList.add('orderSuccess');
        orderMessage.style.display = "block";
        setTimeout(() => {
            orderMessage.style.display = "none";
        }, 3000);
    }
});

window.toggleBasket = function toggleBasket() {
    const cartSidebar = document.querySelector('.cartSidebar');
    const cartSidebarBackground = document.querySelector('.cartSidebarBackground');
    const respoBasketBtn = document.getElementById('respoBasketBtn');
    const closeCartBtn = document.getElementById('closeCartBtn'); // Das X

    console.log("respoBasketBtn", respoBasketBtn)

    if (cartSidebar && cartSidebarBackground && respoBasketBtn && closeCartBtn) {
        cartSidebar.style.display = 'flex';
        cartSidebarBackground.style.display = 'flex';
        respoBasketBtn.style.display = 'none';
        closeCartBtn.style.display = 'block'; // X anzeigen
    }
    console.log("123");
};

window.closeBasket = function closeBasket() {
    const cartSidebar = document.querySelector('.cartSidebar');
    const cartSidebarBackground = document.querySelector('.cartSidebarBackground');
    const respoBasketBtn = document.getElementById('respoBasketBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');

    if (cartSidebar && cartSidebarBackground && respoBasketBtn && closeCartBtn) {
        cartSidebar.style.display = 'none';
        cartSidebarBackground.style.display = 'none';
        respoBasketBtn.style.display = 'block';
        closeCartBtn.style.display = 'none'; // X wieder ausblenden
    }
};

document.getElementById('closeCartBtn').onclick = window.closeBasket;

renderDishes("starters", "Vorspeisen");
renderDishes("main", "Hauptgerichte");
renderDishes("desserts", "Desserts");
renderDishes("drinks", "Getränke");

