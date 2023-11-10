import { renderListWithTemplate } from "./utils.mjs";

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    let list = await this.dataSource.getData();
    list = this.filterProducts(list); // Filter the list before rendering
    this.renderList(list);
  }

  filterProducts(list) {
    // Example: filter by specific Ids
    const requiredIds = ["880RR", "985RF", /* other Ids of the products you want */];
    return list.filter(product => requiredIds.includes(product.Id));
  }

  renderList(productList) {
    renderListWithTemplate(productCardTemplate, this.listElement, productList);
  }
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}
