import { renderListWithTemplate } from "./utils.mjs";

let productCardTemplate = (product) =>
  `<li class="product-card">
<a href="/product_pages/index.html?product=${product.Id}">
<img
src="${product.Images.PrimaryMedium}"
alt="${product.Name}"
/>
<h3 class="card__brand">${product.Brand.Name}</h3>
<h2 class="card__name">${product.NameWithoutBrand}</h2>
<p class="product-card__price">${product.FinalPrice}</p></a>
</li>`;

let filterTents = (product) => ["880RR", "985RF", "985PR", "344YJ"].includes(product.Id);

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    // render the list
    this.renderList(list);
    //set the title to the current category
    document.querySelector(".title").innerHTML = this.category.charAt(0).toUpperCase() + this.category.slice(1).toLowerCase();
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

}