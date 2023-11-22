import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const PRODUCT_DATA = new ProductData();
const PRODUCT_LIST = new ProductListing(
  getParam("category"),
  PRODUCT_DATA,
  document.querySelector(".product-list")
);

PRODUCT_LIST.init();

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
});
