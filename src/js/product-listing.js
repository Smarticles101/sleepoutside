import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const PRODUCT_DATA = new ProductData("tents");
const PRODUCT_LIST = new ProductListing(
  "tents",
  PRODUCT_DATA,
  document.getElementsByClassName("product-list")[0]
);
PRODUCT_LIST.init();

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
});
