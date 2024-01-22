import { ProductName } from "../constants/product.name";
import { ProductSKU } from "../constants/product.sku";

export interface ProductItem {
  sku: string;
  name: string;
  price: number;
}
