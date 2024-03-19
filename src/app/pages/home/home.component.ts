import { Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { Product } from '../../interface/product';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { CoverImagesComponent } from './cover-images/cover-images.component';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, NgFor, NgIf, CoverImagesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  homeData: any;
  contactShow: boolean = false;
  productService: ProductService = inject(ProductService);
  homeService: HomeService = inject(HomeService);

  constructor(router: Router) {
    // workaround to wait for dynamically created fragment targets
    setTimeout(() => {
      router.navigate([], {    // navigate to the same / current url
        preserveFragment: true,     // fragment to navigate
        skipLocationChange: true  // prevent history pollution
       });
    }, 500);
  }

  ngOnInit(): void {
    this.homeService.getHome().then((homeData) => {
      this.homeData = homeData;
    });
    this.productService.getHomeProducts().then((products) => {
      this.products = products;
    });
  } 

  toggleContact(): void {
    this.contactShow = !this.contactShow;
  }
}
