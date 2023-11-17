import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
// first create an instance of our ProductData class.
const PRODUCT_DATA = new ProductData();
// then get the element we want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of our ProductList class and send it the correct information.
const PRODUCT_LIST = new ProductListing(category, PRODUCT_DATA, listElement);
// finally call the init method to show our products
PRODUCT_LIST.init();