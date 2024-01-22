import { PricingRulesService } from "../services/pricing-rules.service";
import { Product } from "../models/product.model";
import { Prices } from "../constants/price.constant";
import { ProductItem } from "../interfaces/product.interface";
import { ProductSKU } from "../constants/product.sku";
import { ProductName } from "../constants/product.name";

describe("PricingRulesService", () => {
  let pricingRulesService: PricingRulesService;
  let products: Product;
  beforeEach(() => {
    products = new Product();
    pricingRulesService = new PricingRulesService();
  });

  it("should calculate the total price without any products and any special pricing", () => {
    const products: ProductItem[] = [];

    const totalPrice = pricingRulesService.applySpecialPricing(products);

    expect(totalPrice).toBe(0);
  });

  it("should apply 3 for 2 deal on Apple TVs", () => {
    let productsArray: ProductItem[];
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
    });

    productsArray = products.getProducts();

    const totalPrice = pricingRulesService.applySpecialPricing(productsArray);

    expect(totalPrice.toFixed(2)).toBe("768.99");
  });

  it("should not apply special pricing for other products", () => {
    let productsArray: ProductItem[];
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
      sku: ProductSKU.VGA,
      name: ProductName.VGAAdapter,
      price: Prices.VGA,
    });

    productsArray = products.getProducts();

    const totalPrice = pricingRulesService.applySpecialPricing(productsArray);

    expect(totalPrice.toFixed(2)).toBe("1979.98");
  });

  it("should apply 3 for 2 deal on Apple TVs with multiple sets of 3", () => {
    let productsArray: ProductItem[];
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
    });

    productsArray = products.getProducts();

    const totalPrice = pricingRulesService.applySpecialPricing(productsArray);

    expect(totalPrice.toFixed(2)).toBe("987.99");
  });

  it("should apply 3 for 2 deal on Apple TVs with only one Apple TV", () => {
    let productsArray: ProductItem[];
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.IPD,
      name: ProductName.Ipad,
      price: Prices.IPD,
    });

    productsArray = products.getProducts();

    const totalPrice = pricingRulesService.applySpecialPricing(productsArray);

    expect(totalPrice.toFixed(2)).toBe("659.49");
  });

  it("should apply 3 for 2 deal on Apple TVs and bulk discount for Super iPads with additional products", () => {
    let productsArray: ProductItem[];

    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
    products.addProduct({
      sku: ProductSKU.ATV,
      name: ProductName.AppleTv,
      price: Prices.ATV,
    });
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
      sku: ProductSKU.VGA,
      name: ProductName.VGAAdapter,
      price: Prices.VGA,
    });
    products.addProduct({
      sku: ProductSKU.VGA,
      name: ProductName.VGAAdapter,
      price: Prices.VGA,
    });

    productsArray = products.getProducts();

    const totalPrice = pricingRulesService.applySpecialPricing(productsArray);

    expect(totalPrice.toFixed(2)).toBe("4178.94");
  });

  it("should not apply bulk discount for Super iPads", () => {
    let productsArray: ProductItem[];

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

    productsArray = products.getProducts();

    const totalPrice = pricingRulesService.applySpecialPricing(productsArray);

    expect(totalPrice.toFixed(2)).toBe("3599.95");
  });

  it("should not apply bulk discount for Super iPads with no Super iPads", () => {
    let productsArray: ProductItem[];

    products.addProduct({
      sku: ProductSKU.MBP,
      name: ProductName.MacBookPro,
      price: Prices.MBP,
    });

    productsArray = products.getProducts();

    const totalPrice = pricingRulesService.applySpecialPricing(productsArray);

    expect(totalPrice.toFixed(2)).toBe("1399.99");
  });

  it("should apply bulk discount for Super iPads with only one Super iPad", () => {
    let productsArray: ProductItem[];

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

    productsArray = products.getProducts();

    const totalPrice = pricingRulesService.applySpecialPricing(productsArray);
    expect(totalPrice.toFixed(2)).toBe("1949.98");
  });
});
