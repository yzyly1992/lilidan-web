import { Injectable } from "@angular/core";
import { ICart } from "../interface/cart";
import { Product } from "../interface/product";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class CartService implements ICart{
    private _products: BehaviorSubject<Set<Product>> = new BehaviorSubject<Set<Product>>(new Set<Product>());
    private _amount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _count_list: BehaviorSubject<Map<Product, number>> = new BehaviorSubject<Map<Product, number>>(new Map<Product, number>());

    products$: Observable<Set<Product>> = this._products.asObservable();
    amount$: Observable<number> = this._amount.asObservable();
    count_list$: Observable<Map<Product, number>> = this._count_list.asObservable();

    addProduct(product: Product): void {
        if (this._products.value.has(product)) {
            this._count_list.value.set(product, (this._count_list.value.get(product) || 0) + 1);
            this._amount.next(this._amount.value + product.discount);
            return;
        }
        this._count_list.value.set(product, 1);
        const updatedProducts = this._products.value.add(product);
        this._products.next(updatedProducts);
        this._amount.next(this._amount.value + product.discount);
    }

    removeProduct(product: Product): void {
        if (!this._products.value.has(product)) {
            return;
        }
        this._amount.next(this._amount.value - (product.discount * (this._count_list.value?.get(product) || 0)));
        this._products.value.delete(product);
        this._products.next(this._products.value);
        this._count_list.value.delete(product);
        this._count_list.next(this._count_list.value);
    }

    clearCart(): void {
        this._products.next(new Set<Product>());
        this._count_list.next(new Map<Product, number>());
        this._amount.next(0);
    }

    increaseCount(product: Product): void {
        this.addProduct(product);
    }

    decreaseCount(product: Product): void {
        if (this._count_list.value.get(product) === 1){
            return this.removeProduct(product);
        }
        this._count_list.value.set(product, (this._count_list.value.get(product) || 0) - 1);
        this._count_list.next(this._count_list.value);
        this._amount.next(this._amount.value - product.discount);
    }
}
