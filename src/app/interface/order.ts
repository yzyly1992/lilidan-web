import { Product } from "./product";

export interface Order {
    id: number;
    items: Product[];
    total: number;
    amount: number;
    date: string;
    status: string;
    customer: string;
    address: string;
    email: string;
}
