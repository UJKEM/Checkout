import { ProductItem } from "../interfaces/product.interface";

export class Product {
  private products: ProductItem[];
  constructor() {
    this.products = [];
  }

  public addProduct(product: ProductItem): void {
    this.products.push(product);
  }

  public getProducts(): ProductItem[] {
    return this.products;
  }
}
