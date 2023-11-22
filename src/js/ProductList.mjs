import { renderListWithTemplate } from "./utils.mjs";

let productCardTemplate = (product) =>
  `<li class="product-card">
<a href="/product_pages/?product=${product.Id}">
<img
src="${product.Images.PrimaryMedium}"
alt="${product.Name}"
/>
<h3 class="card__brand">${product.Brand.Name}</h3>
<h2 class="card__name">${product.NameWithoutBrand}</h2>
<p class="product-card__price">${product.FinalPrice}</p></a>
</li>`;

//let filterTents = (product) => ["880RR", "985RF", "985PR", "344YJ"].includes(product.Id);

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const PRODUCT_LIST = await this.dataSource.getData(this.category);

    renderListWithTemplate(productCardTemplate, this.listElement, PRODUCT_LIST);

    document.querySelector(".products h2").innerHTML = `Top Products: ${this.category}`;
  }
}
