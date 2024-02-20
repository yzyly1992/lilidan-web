import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Product } from '../../interface/product';
import { CartService } from '../../services/cart.service';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  products: Product[] = [];
  count: number = 0;
  amount: number = 0;
  cartService: CartService = inject(CartService);
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

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
    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.amount,
                currency_code: 'USD',
                breakdown:{
                  item_total:{
                      currency_code: 'USD',
                      value: this.amount,
                  }
                }
              },
              items: this.products.map((product: Product) => {
                return {
                  name: product.name,
                  quantity: product.count,
                  unit_amount: {
                    currency_code: 'USD',
                    value: product.discount,
                  },
                };
              }),
            },
          ],
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          if (details.status === 'COMPLETED') {
            console.log(details.id);
            this.cartService.clearCart();
          }
        });
      },
      onError: (err: any) => {
        console.log(err);
      },
    }).render(this.paymentRef.nativeElement);
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
