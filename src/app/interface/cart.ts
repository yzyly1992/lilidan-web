import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "./product";

export interface ICart {
    products$: Observable<Product[]>;
    count$: Observable<number>;
    amount$: Observable<number>;
    addProduct(product: Product): void;
    removeProduct(product: Product): void;
}
