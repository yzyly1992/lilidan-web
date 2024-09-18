import { Component, Input, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { Product } from '../../../interface/product';
import { DecimalPipe, NgIf } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { RouterLink } from '@angular/router';
import { ToastComponent } from '../../../layout/toast/toast.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe, RouterLink, ToastComponent, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})

export class ProductCardComponent {
  @Input() product!: Product;
  cart: CartService = inject(CartService);
  @ViewChild('toastContainer', { read: ViewContainerRef }) toastContainer!: ViewContainerRef;

  addToCart() {
    this.cart.addProduct(this.product);
    const toastComponentRef = this.toastContainer.createComponent(ToastComponent);
    toastComponentRef.instance.message = `${this.product.name} added to cart successfully!`;
    toastComponentRef.instance.duration = 3000;

    // Automatically remove the component after it's hidden
    setTimeout(() => {
      toastComponentRef.destroy();
    }, 3300); // duration + animation time
  }
}
