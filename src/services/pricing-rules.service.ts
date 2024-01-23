import { PricingRules } from "../interfaces/pricing-rules.interface";
import { ProductItem } from "../interfaces/product.interface";

export class PricingRulesService implements PricingRules {
  private pricingRules: PricingRules[];

  constructor(pricingRules: PricingRules[]) {
    this.pricingRules = pricingRules;
  }
  applySpecialPricing(products: ProductItem[]): number {
    let totalApplyingSpecialPricing = 0;
    this.pricingRules.forEach(
      (rule) =>
        (totalApplyingSpecialPricing += rule.applySpecialPricing(products))
    );

    //Exclude products not eligible for special offer and calculate total
    products.forEach((product) => {
      if (!product.specialOffer) {
        totalApplyingSpecialPricing += product.price;
      }
    });
    return totalApplyingSpecialPricing;
  }
}
