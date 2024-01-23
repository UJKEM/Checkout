import { PricingRules } from "../interfaces/pricing-rules.interface";
import { ProductItem } from "../interfaces/product.interface";

export class PricingRulesService implements PricingRules {
  private pricingRules: PricingRules[];

  constructor(pricingRules: PricingRules[]) {
    this.pricingRules = pricingRules;
  }
  applySpecialPricing(products: ProductItem[]): number {
    // Implement the 3 for 2 deal on Apple TVs and the bulk discount for Super iPads

    // const appleTvs = products.filter(
    //   (product) => product.sku === ProductSKU.ATV
    // );
    // const superIpads = products.filter(
    //   (product) => product.sku === ProductSKU.IPD
    // );

    // // Apply 3 for 2 deal on Apple TVs
    // const appleTvsPrice =
    //   (Math.floor(appleTvs.length / 3) * 2 + (appleTvs.length % 3)) *
    //   Prices.ATV;

    // // Apply bulk discount for Super iPads
    // const superIpadsPrice =
    //   superIpads.length > 4
    //     ? superIpads.length * Prices.SIPD
    //     : superIpads.length * Prices.IPD;

    let totalApplyingSpecialPricing = 0;
    this.pricingRules.forEach(
      (rule) =>
        (totalApplyingSpecialPricing += rule.applySpecialPricing(products))
    );

    //Array to exclude appleTv and Ipad because their prices are calculated separately using special pricing
    // const skipSKUs = [ProductSKU.IPD, ProductSKU.ATV];
    products.forEach((product) => {
      if (!product.specialOffer) {
        totalApplyingSpecialPricing += product.price;
      }
    });
    return totalApplyingSpecialPricing;
  }
}
