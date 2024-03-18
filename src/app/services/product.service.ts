import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import { ProductDetail } from '../interface/product-detail';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  async getProducts(): Promise<Product[]> {
    const range = 'soap!A2:E';
    const uri = 'https://sheets.googleapis.com/v4/spreadsheets/' +
    environment.product_spreadsheet_id + '/values/' + range +
    '?alt=json&key=' + environment.api_key

    return await fetch(uri)
      .then(async response => {
        const data = await response.json();
        return data.values.map((item: any) => ({
          id: Number(item[0]),
          name: item[1],
          price: Number(item[2]),
          discount: Number(item[3]),
          imageUrl: item[4],
        }));
      });
  };


  async getProduct(id: number): Promise<ProductDetail> {
    const index = (id + 2).toString();
    const range: string = 'soap!A' + index + ':J' + index;
    const uri = 'https://sheets.googleapis.com/v4/spreadsheets/' +
    environment.product_spreadsheet_id + '/values/' + range +
    '?alt=json&key=' + environment.api_key

    return await fetch(uri)
      .then(async response => {
        const data = await response.json();
        const item = data.values[0];
        return {
          id: Number(item[0]),
          name: item[1],
          price: Number(item[2]),
          discount: Number(item[3]),
          imageUrl: item[4],
          description: item[5],
          gallery: [item[4], ...item.slice(6)],
        };
      });
  }
}
