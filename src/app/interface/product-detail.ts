import { Product } from "./product";

export interface ProductDetail extends Product{
    description: string;
    gallery_1: string;
    gallery_2: string;
    gallery_3: string;
    gallery_4: string;
}
