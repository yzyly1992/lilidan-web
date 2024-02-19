import { Injectable } from "@angular/core";
import { ICart } from "../interface/cart";
import { Product } from "../interface/product";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class CartService implements ICart{
    private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    private _count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _amount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    products$: Observable<Product[]> = this._products.asObservable();
    count$: Observable<number> = this._count.asObservable();
    amount$: Observable<number> = this._amount.asObservable();

    addProduct(product: Product): void {
        if (this._products.value.includes(product)) {
            return this.increaseCount(product);
        }
        product.count++;
        const updatedProducts = [...this._products.value, product];
        this._products.next(updatedProducts);
        this._count.next(updatedProducts.length);
        this._amount.next(this._amount.value + product.discount);
    }

    removeProduct(product: Product): void {
        if (this._products.value.length === 0 || !this._products.value.includes(product)) {
            return;
        }
        const updatedProducts = this._products.value.filter(p => p.id !== product.id);
        this._products.next(updatedProducts);
        this._count.next(updatedProducts.length);
        this._amount.next(this._amount.value - product.discount * product.count);
    }

    clearCart(): void {
        this._products.next([]);
        this._count.next(0);
        this._amount.next(0);
    }

    increaseCount(product: Product): void {
        const updatedProducts = this._products.value.map(p => {
            if (p.id === product.id) {
                p.count++;
                this._amount.next(this._amount.value + p.discount);
            }
            return p;
        });
        this._products.next(updatedProducts);
    }

    decreaseCount(product: Product): void {
        if (product.count === 1) {
            return this.removeProduct(product);
        }
        const updatedProducts = this._products.value.map(p => {
            if (p.id === product.id) {
                p.count--;
                this._amount.next(this._amount.value - p.discount);
            }
            return p;
        });
        this._products.next(updatedProducts);
    }
}
