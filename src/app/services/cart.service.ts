import { Injectable } from "@angular/core";
import { ICart } from "../interface/cart";
import { Product } from "../interface/product";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class Cart implements ICart{
    private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    private _count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _amount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    products$: Observable<Product[]> = this._products.asObservable();
    count$: Observable<number> = this._count.asObservable();
    amount$: Observable<number> = this._amount.asObservable();

    addProduct(product: Product): void {
        const updatedProducts = [...this._products.value, product];
        this._products.next(updatedProducts);
        this._count.next(updatedProducts.length);
        this._amount.next(this._amount.value + product.discount);
    }

    removeProduct(product: Product): void {
        // remove only one product from the list
        for (let i = 0; i < this._products.value.length; i++) {
            if (this._products.value[i].id === product.id) {
                const updatedProducts = this._products.value.splice(i, 1);
                this._products.next(updatedProducts);
                this._count.next(updatedProducts.length);
                this._amount.next(this._amount.value - product.discount);
                return;
            }
        }
    }
}
