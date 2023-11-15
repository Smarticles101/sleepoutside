import { getLocalStorage, setLocalStorage } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");


  const buttons = document.querySelectorAll(".removeBtn");
  // console.log(buttons);

  buttons.forEach(btn => {
    btn.addEventListener("click",() => {
      // console.log(btn.dataset["id"]); 
      removeFromCart(btn.dataset["id"]);
    })
  })
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
  <span class="removeBtn" data-id="${item.unique}">X</span>
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}



  // document.addEventListener("click", removeFromCart(button("data-id")));


function removeFromCart(itemId){
    const cartItems = getLocalStorage("so-cart");
    const filtered = cartItems.filter(item => item.unique != itemId);

    setLocalStorage("so-cart", filtered);
    renderCartContents();

    return filtered
  }


renderCartContents();
// remove();
