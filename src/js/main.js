import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const PRODUCT_DATA = new ProductData("tents");
const PRODUCT_LIST = new ProductListing(
  "tents",
  PRODUCT_DATA,
  document.getElementsByClassName("product-list")[0]
);
PRODUCT_LIST.init();
