import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../interface/product';
import { CartService } from '../../services/cart.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  products: Product[] = [];
  count: number = 0;
  amount: number = 0;
  cartService: CartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.products$.subscribe((products: Product[]) => {
      this.products = products;
    });
    this.cartService.count$.subscribe((count: number) => {
      this.count = count;
    });
    this.cartService.amount$.subscribe((amount: number) => {
      this.amount = amount;
    });
  }

  removeProduct(product: Product): void {
    this.cartService.removeProduct(product);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  increaseCount(product: Product): void {
    this.cartService.increaseCount(product);
  }

  decreaseCount(product: Product): void {
    this.cartService.decreaseCount(product);
  }

  trackByFn(index: number, product: Product): number {
    return product.id;
  }

  checkout(): void {
    console.log('Checkout');
  }
}
