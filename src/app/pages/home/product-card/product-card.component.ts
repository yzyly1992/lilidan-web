import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../interface/product';
import { DecimalPipe, NgIf } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../../layout/modal/modal.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe, RouterLink, ModalComponent, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})

export class ProductCardComponent {
  @Input() product!: Product;
  cart: CartService = inject(CartService);
  isModalOpen: boolean = false;

  addToCart() {
    this.cart.addProduct(this.product);
    this.openModal();
  }

  openModal() {
    this.isModalOpen = true;
  }

  handleCloseModal() {
    this.isModalOpen = false;
  }
}
