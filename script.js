
import {myDishes} from "./scripts/db.js";

const dishesContainer = document.getElementById("myDishes");

myDishes.forEach((dish, index)=>{
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

    createToOrderDiv.append(createToOrder)
    createDishesDiv.append(createToOrderDiv)
    createDishesDiv.append(dishDiv);
    dishesContainer.append(createDishesDiv);

   
})
