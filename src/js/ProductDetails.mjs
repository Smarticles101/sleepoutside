import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    this.dataSource.findProductById(this.productId).then((product) => {
      this.product = product;
      this.renderProductDetails();

      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    });
  }

  addToCart() {
    let cart = getLocalStorage("so-cart");
    if (cart === null || !Array.isArray(cart)) {
      cart = [];
    }

    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
      // Calculate the discount amount
  const discountAmount = Math.round(this.product.SuggestedRetailPrice - this.product.FinalPrice);
  const isDiscounted = discountAmount > 0;

  let product = `
    <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Image}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price">
      $${this.product.FinalPrice}
      ${isDiscounted ? `<span class="discount">Now $${discountAmount} off</span>` : ""}
    </p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div>`;

    document.getElementsByClassName("product-detail")[0].innerHTML = product;
  }
}

