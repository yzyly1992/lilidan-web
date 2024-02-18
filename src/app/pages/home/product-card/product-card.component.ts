import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../interface/product';
import { DecimalPipe } from '@angular/common';
import { Cart } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})

export class ProductCardComponent {
  @Input() product!: Product;
  cart: Cart = inject(Cart);

  addToCart() {
    this.cart.addProduct(this.product);
  }
}
