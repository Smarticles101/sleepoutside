import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const PRODUCT_DATA = new ExternalServices();
const PRODUCT_LIST = new ProductListing(
  getParam("category"),
  PRODUCT_DATA,
  document.querySelector(".product-list")
);

PRODUCT_LIST.init();

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
});
