import { ProductName } from "../constants/product.name";
import { ProductSKU } from "../constants/product.sku";
import { ProductItem } from "../interfaces/product.interface";
import { PricingRulesService } from "./pricing-rules.service";

export class CheckoutService {
  private pricingRulesService: PricingRulesService;
  private scannedProducts: ProductItem[] = [];
  private allowedProductSKUs: ProductSKU[];
  private allowedProductNames: ProductName[];

  constructor(pricingRulesService: PricingRulesService) {
    this.allowedProductSKUs = [...Object.values(ProductSKU)];
    this.allowedProductNames = [...Object.values(ProductName)];
    this.pricingRulesService = pricingRulesService;
  }

  scan(product: ProductItem): void {
    this.allowedProductSKUs.includes(product.sku as ProductSKU) &&
      this.allowedProductNames.includes(product.name as ProductName) &&
      this.scannedProducts.push(product);
  }

  total(): number {
    // Calculate the total price, including the special pricing rules
    return this.pricingRulesService.applySpecialPricing(this.scannedProducts);
  }
}
