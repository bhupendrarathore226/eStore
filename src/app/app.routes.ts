import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'cart', component: CartComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/NotFound' }
];
