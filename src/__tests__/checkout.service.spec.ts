import { Product } from "../models/product.model";
import { CheckoutService } from "../services/checkout.service";
import { PricingRulesService } from "../services/pricing-rules.service";
import { Prices } from "../constants/price.constant";
import { ProductItem } from "../interfaces/product.interface";
import { ProductSKU } from "../constants/product.sku";
import { ProductName } from "../constants/product.name";
import { ThreeForTwoDealRule } from "../rules/ThreeForTwoDealRule";
import { BulkDiscountRule } from "../rules/BulkDiscountRule";

describe("CheckoutService", () => {
  let checkoutService: CheckoutService;
  let product: Product;
  let threeForTwoDeal: ThreeForTwoDealRule;
  let bulkDiscountDeal: BulkDiscountRule;
  let pricingRulesService: PricingRulesService;

  beforeEach(() => {
    product = new Product();
    threeForTwoDeal = new ThreeForTwoDealRule();
    bulkDiscountDeal = new BulkDiscountRule();
    pricingRulesService = new PricingRulesService([
      threeForTwoDeal,
      bulkDiscountDeal,
    ]);
    checkoutService = new CheckoutService(pricingRulesService);
  });

  it("should calculate the total price without any products", () => {
    const totalPrice = checkoutService.total();

    expect(totalPrice).toBe(0);
  });

  it("should calculate the total price with one product without special pricing", () => {
    let productsArray: ProductItem[];
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));

    const totalPrice = checkoutService.total();

    expect(totalPrice.toFixed(2)).toBe("549.99");
  });

  it("should calculate the total price with multiple products without special pricing", () => {
    let productsArray: ProductItem[];

    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.MBP,
      name: ProductName.MacBookPro,
      price: Prices.MBP,
    });
    product.addProduct({
      sku: ProductSKU.VGA,
      name: ProductName.VGAAdapter,
      price: Prices.VGA,
    });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));

    const totalPrice = checkoutService.total();

    expect(totalPrice.toFixed(2)).toBe("1979.98");
  });

  it("should apply 3 for 2 deal on Apple TVs", () => {
    let productsArray: ProductItem[];

    product.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
      specialOffer: true,
    });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));

    const totalPrice = checkoutService.total();

    expect(totalPrice.toFixed(1)).toBe("219.0");
  });

  it("should apply bulk discount for Super Ipads", () => {
    let productsArray: ProductItem[];

    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.MBP,
      name: ProductName.MacBookPro,
      price: Prices.MBP,
    });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));

    const totalPrice = checkoutService.total();

    expect(totalPrice.toFixed(2)).toBe("3899.94");
  });

  it("should bundle in a free VGA adapter with every MacBook Pro sold", () => {
    let productsArray: ProductItem[];

    product.addProduct({
      sku: ProductSKU.MBP,
      name: ProductName.MacBookPro,
      price: Prices.MBP,
    });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));

    const totalPrice = checkoutService.total();

    expect(totalPrice.toFixed(2)).toBe("1399.99");
  });

  it("should apply 3 for 2 deal on Apple TVs and bulk discount for Super Ipads", () => {
    let productsArray: ProductItem[];

    product.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.MBP,
      name: ProductName.MacBookPro,
      price: Prices.MBP,
    });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));
    const totalPrice = checkoutService.total();
    expect(totalPrice.toFixed(2)).toBe("4118.94");
  });

  it("should calculate the total price without any products", () => {
    const totalPrice = checkoutService.total();

    expect(totalPrice).toBe(0);
  });

  it("should calculate the total price with one product without special pricing", () => {
    let productsArray: ProductItem[];

    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));
    const totalPrice = checkoutService.total();

    expect(totalPrice.toFixed(2)).toBe("549.99");
  });

  it("should calculate the total price with all products", () => {
    let productsArray: ProductItem[];

    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.MBP,
      name: ProductName.MacBookPro,
      price: Prices.MBP,
    });
    product.addProduct({
      sku: ProductSKU.VGA,
      name: ProductName.VGAAdapter,
      price: Prices.VGA,
    });
    product.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
      specialOffer: true,
    });
    product.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
      specialOffer: true,
    });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));
    const totalPrice = checkoutService.total();

    expect(totalPrice.toFixed(2)).toBe("3958.45");
  });

  it("should not add a product that is not in the catalogue to the total price", () => {
    let productsArray: ProductItem[];

    product.addProduct({ sku: "xyz", name: "Unknown Product", price: 99.99 });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));
    const totalPrice = checkoutService.total();

    expect(totalPrice).toBe(0);
  });

  it("should not add a product with an invalid SKU to the total price", () => {
    let productsArray: ProductItem[];

    product.addProduct({ sku: "", name: "Invalid Product", price: 99.99 });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));
    const totalPrice = checkoutService.total();

    expect(totalPrice).toBe(0);
  });

  it("should not add a product with a empty name to the total price", () => {
    let productsArray: ProductItem[];

    product.addProduct({ sku: "abc", name: "", price: 99.99 });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));
    const totalPrice = checkoutService.total();

    expect(totalPrice).toBe(0);
  });

  it("should not add a product that is not in the catalogue to the total price", () => {
    let productsArray: ProductItem[];

    product.addProduct({ sku: "xyz", name: "Unknown Product", price: 99.99 });

    productsArray = product.getProducts();
    productsArray.forEach((product) => checkoutService.scan(product));
    const totalPrice = checkoutService.total();

    expect(totalPrice).toBe(0);
  });
});
