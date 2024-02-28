import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail } from '../../interface/product-detail';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  id: number = 0;
  selectedIndex: number = 0;
  private sub: any;
  productDetail: Partial<ProductDetail> = {};
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.productService.getProduct(this.id).then((productDetail) => {
      this.productDetail = productDetail;
    });
  }

  addToCart() {
    if (this.productDetail.id !== undefined) {
      this.cartService.addProduct(this.productDetail as Product);
    }
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }
}
