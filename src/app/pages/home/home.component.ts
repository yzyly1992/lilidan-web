import { Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { Product } from '../../interface/product';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  contactShow: boolean = false;
  productService: ProductService = inject(ProductService);

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  } 

  toggleContact(): void {
    this.contactShow = !this.contactShow;
  }
}
