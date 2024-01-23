import { Prices } from "../constants/price.constant";
import { ProductSKU } from "../constants/product.sku";
import { PricingRules } from "../interfaces/pricing-rules.interface";
import { ProductItem } from "../interfaces/product.interface";

export class BulkDiscountRule implements PricingRules {
  applySpecialPricing(products: ProductItem[]): number {
    const superIpads = products.filter(
      (product) =>
        product.sku === ProductSKU.IPD && (product.specialOffer = true)
    );
    return superIpads.length > 4
      ? superIpads.length * Prices.SIPD
      : superIpads.length * Prices.IPD;
  }
}
