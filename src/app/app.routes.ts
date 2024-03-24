import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { RefundComponent } from './pages/refund/refund.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Lili & Dan'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Lili & Dan - Product Details'
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Lili & Dan - Cart'
    },
    {
        path: 'product',
        component: ProductComponent,
        title: 'Lili & Dan - Product'
    },
    {
        path: 'privacy',
        component: PrivacyComponent,
        title: 'Lili & Dan - Privacy'
    },
    {
        path: 'terms',
        component: TermsComponent,
        title: 'Lili & Dan - Terms of Service'
    },
    {
        path: 'shipping',
        component: ShippingComponent,
        title: 'Lili & Dan - Shipping Policy'
    },
    {
        path: 'refund',
        component: RefundComponent,
        title: 'Lili & Dan - Refund Policy'
    }
];


