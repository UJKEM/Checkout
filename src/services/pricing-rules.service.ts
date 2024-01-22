import { PricingRules } from "../interfaces/pricing-rules.interface";
import { Prices } from "../constants/price.constant";
import { ProductItem } from "../interfaces/product.interface";
import { ProductSKU } from "../constants/product.sku";

export class PricingRulesService implements PricingRules {
  applySpecialPricing(products: ProductItem[]): number {
    // Implement the 3 for 2 deal on Apple TVs and the bulk discount for Super iPads

    const appleTvs = products.filter(
      (product) => product.sku === ProductSKU.ATV
    );
    const superIpads = products.filter(
      (product) => product.sku === ProductSKU.IPD
    );

    // Apply 3 for 2 deal on Apple TVs
    const appleTvsPrice =
      (Math.floor(appleTvs.length / 3) * 2 + (appleTvs.length % 3)) *
      Prices.ATV;

    // Apply bulk discount for Super iPads
    const superIpadsPrice =
      superIpads.length > 4
        ? superIpads.length * Prices.SIPD
        : superIpads.length * Prices.IPD;

    // Return the total price after applying the special pricing
    let price = 0;

    //Array to exclude appleTv and Ipad because their prices are calculated separately using special pricing
    const skipSKUs = [ProductSKU.IPD, ProductSKU.ATV];
    products.forEach((product) => {
      if (!skipSKUs.includes(product.sku as ProductSKU)) {
        price += product.price;
      }
    });
    return price + (superIpadsPrice ?? 0) + (appleTvsPrice ?? 0);
  }
}
