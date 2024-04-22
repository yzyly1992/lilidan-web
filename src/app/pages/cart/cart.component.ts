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
  inCheckout: boolean = false;
  products: Set<Product> = new Set<Product>();
  amount: number = 0;
  shippingFee: number = 15;
  notificateType: string = 'hidden';
  notificateMessage: string = '';
  countList: Map<number, number> = new Map<number, number>();
  cartService: CartService = inject(CartService);
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  ngOnInit(): void {
    this.cartService.products$.subscribe((products: Set<Product>) => {
      this.products = products;
    });
    this.cartService.amount$.subscribe((amount: number) => {
      this.amount = amount;
      if (this.amount > 100) {
        this.shippingFee = 25;
      } else {
        this.shippingFee = 15;
      }
    });
    this.cartService.count_list$.subscribe((countList: Map<number, number>) => {
      this.countList = countList;
    });

    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.amount + this.shippingFee,
                currency_code: 'CAD',
                breakdown:{
                  item_total:{
                    currency_code: 'CAD',
                    value: this.amount,
                  },
                  shipping: {
                    currency_code: 'CAD',
                    value: this.shippingFee,
                  },
                },
              },
              items: Array.from(this.products).map((product: Product) => {
                return {
                  name: product.name,
                  quantity: this.countList.get(product.id),
                  unit_amount: {
                    currency_code: 'CAD',
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
            // console.log(details.id);
            this.cartService.clearCart();
            this.notificateMessage = 'Payment success! Thank you for your purchase! Your order number is ' + details.id + '. We will send you an email with the order details.';
            this.notificateType = 'success';
          }
        });
      },
      onError: (err: any) => {
        // console.log(err);
        this.notificateMessage = 'Payment failed! Please try again later!';
        this.notificateType = 'error';
      },
      onCancel: (data: any) => {
        // console.log(data);
        this.notificateMessage = 'Payment canceled!';
        this.notificateType = 'cancel';
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
    this.inCheckout = !this.inCheckout;
  }

  closeNotificate(): void {
    this.notificateMessage = '';
    this.notificateType = 'hidden';
  }
}
