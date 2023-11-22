import { loadHeaderFooter } from "./utils.mjs";
import checkOrderSummary from "./checkOrderSummary.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
});

const checkout = new checkOrderSummary("so-cart", ".order-summary");
checkout.init();
