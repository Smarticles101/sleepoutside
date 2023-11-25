import { getLocalStorage, setLocalStorage } from "./utils.mjs";
const baseURL = import.meta.env.VITE_SERVER_URL;

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  return items.map((product) => ({
    id: product.Id,
    name: product.Name,
    price: product.FinalPrice,
    quantity: 1,
  }));
}

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class checkOrderSummary {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.zipCodeInput = document.getElementById("zip-code");
    this.addEventListeners();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    console.log("accessing so-cart");

    this.calculateItemSummary();
    this.calculateShipping();
    this.calculateTax();

    document.querySelector("#checkout-form .checkout-button").addEventListener("click", (e) => {
      e.preventDefault();
      const formElement = document.forms[0];
      const isValid = formElement.checkValidity();
      formElement.reportValidity();
  
      if (isValid) {
        let form = formDataToJSON(formElement);
  
        form = {
          orderDate: Date.now(),
          fname: form["first-name"],
          lname: form["last-name"],
          cardNumber: form["cc-number"],
          expiration: form["exp-date"],
          zip: form["zip-code"],
          street: form["street-address"],
          city: form["city"],
          state: form["state"],
          code: form["security-code"],
          items: packageItems(this.list),
          orderTotal: this.orderTotal,
          shipping: this.shipping,
          tax: this.tax,
        };
  
        this.checkout(form);
      }
    });
  }

  addEventListeners() {
    this.zipCodeInput.addEventListener("input", (event) => {
      const zipCode = event.target.value;
      // You can add any logic here to handle the zip code input
      // For example, if you want to calculate order total when zip code is entered:
      if (zipCode.length > 0) {
        this.calculateOrderTotal(zipCode);
      }
    });
  }

  calculateItemSummary() {
    this.itemTotal = this.list.reduce(
      (total, item) => total + item.FinalPrice,
      0
    );
    console.log("total has been calculated");
    this.displayOrderTotals();
  }

  calculateOrderTotal(zipCode) {
    // Assuming zipCode is needed for future expansion
    this.calculateShipping();
    this.calculateTax();
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
    this.displayOrderTotals();
  }

  calculateShipping() {
    this.shipping = 10 + Math.max(0, this.list.length - 1) * 2;
    this.displayOrderTotals();
  }

  calculateTax() {
    this.tax = this.itemTotal * 0.06; // 6% tax
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const outputElement = document.querySelector(this.outputSelector);
    if (outputElement) {
      outputElement.innerHTML = `
          <p>Subtotal: $${this.itemTotal.toFixed(2)}</p>
          <p>Shipping: $${this.shipping.toFixed(2)}</p>
          <p>Tax: $${this.tax.toFixed(2)}</p>
          <p>Order Total: $${this.orderTotal.toFixed(2)}</p>
        `;
    }
  }

  async checkout(form) {
    try {
      // Build the data object from the calculated fields, the items in the cart, and the information entered into the form
      console.log(form);
      // Call the checkout method in our ExternalServices module and send it our data object.
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      };
      const response = await fetch(baseURL + "checkout", options);
      const data = await response.json();
      if (!response.ok) {
        throw { name: "servicesError", message: data };
      }
      // Handle successful checkout here, if needed
    } catch (err) {
      // Error handling
      if (err.name === "servicesError") {
        // Handle the custom error
        console.error("Checkout error:", err.message);
        // Display an error message to the user, etc.
      } else {
        // Handle other types of errors
        console.error("An unexpected error occurred:", err);
      }
    }
  }
  
}
