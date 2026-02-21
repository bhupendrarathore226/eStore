import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  constructor(public cartStore: CartStore) {}

  get cartItems() {
    return this.cartStore.cartItems;
  }
  get totalItems() {
    return this.cartStore.totalItems;
  }
  get subtotal() {
    return this.cartStore.subtotal;
  }
  get tax() {
    return this.cartStore.tax;
  }
  get grandTotal() {
    return this.cartStore.grandTotal;
  }

  trackById(_i: number, item: { productId: number }) {
    return item.productId;
  }
}
