import { ProductItem } from "./product.interface";

export interface PricingRules {
  applySpecialPricing(products: ProductItem[]): number;
}
