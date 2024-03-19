import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  toggleValue: boolean = false;
  cartService: CartService = inject(CartService);
  itemCount: number = 0;

  ngOnInit(): void {
    this.cartService.products$.subscribe((products) => {
      this.itemCount = products.size;
    });
  }

  toggleMenu() {
    this.toggleValue = !this.toggleValue;
  }

  closeMenu() {
    this.toggleValue = false;
  }
}
