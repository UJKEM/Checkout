import { Product } from "./models/product.model";
import { CheckoutService } from "./services/checkout.service";
import { PricingRulesService } from "./services/pricing-rules.service";
import { Prices } from "./constants/price.constant";
import { ProductItem } from "./interfaces/product.interface";
import { ProductName } from "./constants/product.name";
import { ProductSKU } from "./constants/product.sku";
import { ThreeForTwoDealRule } from "./rules/ThreeForTwoDealRule";
import { BulkDiscountRule } from "./rules/BulkDiscountRule";

const products = new Product();
products.addProduct({
  sku: ProductSKU.IPD,
  name: ProductName.Ipad,
  price: Prices.IPD,
});

products.addProduct({
  sku: ProductSKU.IPD,
  name: ProductName.Ipad,
  price: Prices.IPD,
});

products.addProduct({
  sku: ProductSKU.MBP,
  name: ProductName.MacBookPro,
  price: Prices.MBP,
});

products.addProduct({
  sku: ProductSKU.ATV,
  name: ProductName.AppleTv,
  price: Prices.ATV,
});

products.addProduct({
  sku: ProductSKU.VGA,
  name: ProductName.VGAAdapter,
  price: Prices.VGA,
});

const ThreeForTwoDeal = new ThreeForTwoDealRule();

const BulkDiscount = new BulkDiscountRule();

const pricingRulesService = new PricingRulesService([
  ThreeForTwoDeal,
  BulkDiscount,
]);

const checkoutService = new CheckoutService(pricingRulesService);

let productsArray: ProductItem[] = products.getProducts();

productsArray.forEach((product) => {
  checkoutService.scan(product);
});

// Calculate the total price
const totalPrice = checkoutService.total();
console.log("Total Price $" + totalPrice.toFixed(2));
