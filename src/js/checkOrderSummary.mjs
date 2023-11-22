import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
      console.log("accessing so-cart")
      this.calculateItemSummary();
      this.calculateShipping();
      this.calculateTax();
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
      this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice, 0);
      console.log("total has been calculated")
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
      this.shipping = 10 + (Math.max(0, this.list.length - 1) * 2);
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
  }
  