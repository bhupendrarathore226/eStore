import { Component, Signal } from '@angular/core';
import { Router } from '@angular/router';
import{FontAwesomeModule}from'@fortawesome/angular-fontawesome';
import{faSearch, faUserCircle,faHeart,faShoppingCart}from'@fortawesome/free-solid-svg-icons';   
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  faSearch=faSearch;
  faUserCircle=faUserCircle;  
  faHeart=faHeart;
  faShoppingCart=faShoppingCart;    

  totalItems: Signal<number>;

  constructor(private cartStore: CartStore, private router: Router) {
    this.totalItems = this.cartStore.totalItems;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
} 
