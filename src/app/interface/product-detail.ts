import { Product } from "./product";

export interface ProductDetail extends Product{
    description: string;
    gallery: string[];
}
