import { Observable } from "rxjs";
import { Product } from "./product";

export interface ICart {
    products$: Observable<Set<Product>>;
    amount$: Observable<number>;
    count_list$: Observable<Map<number, number>>;
    addProduct(product: Product): void;
    removeProduct(product: Product): void;
}
