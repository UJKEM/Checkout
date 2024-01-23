import { Prices } from "../constants/price.constant";
import { ProductSKU } from "../constants/product.sku";
import { PricingRules } from "../interfaces/pricing-rules.interface";
import { ProductItem } from "../interfaces/product.interface";

// ThreeForTwoDealRule class
export class ThreeForTwoDealRule implements PricingRules {
  applySpecialPricing(products: ProductItem[]): number {
    const appleTvs = products.filter(
      (product) => product.sku === ProductSKU.ATV
    );
    return (
      (Math.floor(appleTvs.length / 3) * 2 + (appleTvs.length % 3)) * Prices.ATV
    );
  }
}
