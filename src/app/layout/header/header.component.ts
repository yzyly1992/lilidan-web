import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Cart } from '../../services/cart.service';
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
  cartService: Cart = inject(Cart);
  itemCount: number = 0;

  ngOnInit(): void {
    this.cartService.count$.subscribe((count: number) => {
      this.itemCount = count;
    });
  }

  toggleMenu() {
    this.toggleValue = !this.toggleValue;
  }

  scrollToElement(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }
}
