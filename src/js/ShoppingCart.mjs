import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
  <p class="cart-card__quantity">qty: ${item.qty || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor() {}
  init() {
    this.renderCart();
  }

  removeFromCart(itemId){
    const cartItems = getLocalStorage("so-cart");
    const filtered = cartItems.filter(item => item.unique != itemId);
  
    setLocalStorage("so-cart", filtered);
    
    this.renderCart();
  
    return filtered
  }


  renderCart() {
    const cartItems = getLocalStorage("so-cart") || []; // Default to an empty array if null/undefined
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML =
      cartItems.length > 0 ? htmlItems.join("") : "<p>Your cart is empty.</p>";

      if (cartItems.length > 0) {
        const checkoutButton = document.createElement("button");
        checkoutButton.textContent = "Go to Checkout";
        checkoutButton.classList.add("checkout-button");
      
        // Add an event listener to the button
        checkoutButton.addEventListener("click", () => {
          // Redirect to the desired URL
          window.location.href = "/checkout/index.html"; // Replace with your desired URL
        });
      
        document.querySelector(".cart-footer").appendChild(checkoutButton);
      }
      

    const buttons = document.querySelectorAll(".removeBtn");
    // console.log(buttons);
  
    buttons.forEach(btn => {
      btn.addEventListener("click",() => {
        // console.log(btn.dataset["id"]); 
        this.removeFromCart(btn.dataset["id"]);
      })
    

    
    const total = cartItems.reduce((a, prod) => prod.FinalPrice * (prod.qty || 1) + a, 0);
    document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
    document.querySelector(".cart-footer").classList.remove("hide");
  }
    )}
}




