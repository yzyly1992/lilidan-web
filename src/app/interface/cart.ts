import { Product } from "./product";

export interface ICart {
    products: Product[];
    getCount(): number;
    getAmount(): number;
    addProduct(product: Product): void;
    removeProduct(product: Product): void;
}
