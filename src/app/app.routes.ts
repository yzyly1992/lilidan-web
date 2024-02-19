import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartComponent } from './pages/cart/cart.component';

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
    }
];


