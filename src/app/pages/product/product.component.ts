import { Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from '../home/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductCardComponent, NgFor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  productService: ProductService = inject(ProductService);
  products: Product[] = [];

  ngOnInit(): void {
    this.productService.getProducts().then((products) => {
      this.products = products;
    });
  }
}
