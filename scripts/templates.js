// template.js

export function createDishElement(dish, index, addToCart) {
  const dishDiv = document.createElement("div");
  dishDiv.className = "dishDiv";
  dishDiv.id = `dish-${index}`;

  dishDiv.append(createParagraph(dish.name));
  dishDiv.append(createParagraph(dish.description));
  dishDiv.append(createPriceParagraph(dish.price));

  const singleDishDiv = document.createElement("div");
  singleDishDiv.className = "singleDish";
  singleDishDiv.append(createAddButton(dish, addToCart));
  singleDishDiv.append(dishDiv);

  return singleDishDiv;
}

export function createParagraph(text) {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
}

export function createPriceParagraph(price) {
  const p = createParagraph(`${price.toFixed(2)} €`);
  p.className = "dishPrice";
  return p;
}

export function createAddButton(dish, addToCart) {
  const btnDiv = document.createElement("div");
  const btn = document.createElement("button");
  btn.textContent = "+";
  btn.addEventListener("click", () => addToCart(dish));
  btnDiv.append(btn);
  return btnDiv;
}

export function createCartItem(item, changeQuantity) {
  const cartItem = document.createElement("div");
  cartItem.className = "cartItem";
  cartItem.append(createCartItemName(item.name));
  cartItem.append(createCartItemRow(item, changeQuantity));
  return cartItem;
}

export function createCartItemName(name) {
  const div = document.createElement("div");
  div.className = "cartItemName";
  div.textContent = name;
  return div;
}

export function createCartItemRow(item, changeQuantity) {
  const rowDiv = document.createElement("div");
  rowDiv.className = "cartItemRow";
  rowDiv.append(createCartQuantityControls(item, changeQuantity));
  rowDiv.append(createCartItemPrice(item));
  return rowDiv;
}

export function createCartQuantityControls(item, changeQuantity) {
  const quantityDiv = document.createElement("div");
  quantityDiv.className = "cartQuantity";
  quantityDiv.append(createCartBtn("-", () => changeQuantity(item, -1)));
  quantityDiv.append(createCartQtyNumber(item.quantity));
  quantityDiv.append(createCartBtn("+", () => changeQuantity(item, 1)));
  return quantityDiv;
}

export function createCartBtn(text, handler) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = "cartBtn";
  btn.addEventListener("click", handler);
  return btn;
}

export function createCartQtyNumber(quantity) {
  const span = document.createElement("span");
  span.className = "cartQtyNumber";
  span.textContent = quantity;
  return span;
}

export function createCartItemPrice(item) {
  const span = document.createElement("span");
  span.className = "cartItemPrice";
  span.textContent = `${(item.price * item.quantity).toFixed(2)} €`;
  return span;
}