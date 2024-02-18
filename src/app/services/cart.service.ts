import { Injectable } from "@angular/core";
import { ICart } from "../interface/cart";
import { Product } from "../interface/product";

@Injectable({
    providedIn: 'root'
  })
export class Cart implements ICart{
    products: Product[];

    constructor() {
        this.products = [];
    }

    getCount(): number {
        return this.products.length;
    }

    getAmount(): number {
        return this.products.reduce((total, product) => total + product.discount, 0);
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }

    removeProduct(product: Product): void {
        this.products = this.products.filter(p => p.id !== product.id);
    }
}
