import { Component, ElementRef, ViewChild, inject } from '@angular/core';
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
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.productService.getProduct(this.id).then((productDetail) => {
      this.productDetail = productDetail;
    });
    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.productDetail.discount,
                currency_code: 'USD',
                breakdown:{
                  item_total:{
                      currency_code: 'USD',
                      value: this.productDetail.discount,
                  }
                }
              },
              items: [{
                  name: this.productDetail.name,
                  quantity: 1,
                  unit_amount: {
                    currency_code: 'USD',
                    value: this.productDetail.discount,
                  }
              }]
            },
          ],
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          if (details.status === 'COMPLETED') {
            console.log(details.id);
            // this.cartService.clearCart();
          }
        });
      },
      onError: (err: any) => {
        console.log(err);
      },
    }).render(this.paymentRef.nativeElement);
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
