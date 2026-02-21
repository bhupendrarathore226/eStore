import { Injectable, signal, computed, effect } from '@angular/core';
import { ToastService } from './toast.service';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const STORAGE_KEY = 'estore_cart';

@Injectable({ providedIn: 'root' })
export class CartStore {
  /** raw list of items */
  cartItems = signal<CartItem[]>(this.loadCart());

  // computed selectors
  totalItems = computed(() =>
    this.cartItems().reduce((sum, i) => sum + i.quantity, 0)
  );

  subtotal = computed(() =>
    this.cartItems().reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  tax = computed(() => this.subtotal() * 0.13);

  grandTotal = computed(() => this.subtotal() + this.tax());

  constructor(private toast: ToastService) {
    // persist whenever cart changes
    effect(() => {
      const items = this.cartItems();
      this.saveCart(items);
    });
  }

  private saveCart(items: CartItem[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }

  private loadCart(): CartItem[] {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      if (json) {
        return JSON.parse(json);
      }
    } catch {
      // ignore parse errors
    }
    return [];
  }

  // public api
  addToCart(product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  }) {
    const items = [...this.cartItems()];
    const idx = items.findIndex((i) => i.productId === product.id);
    if (idx > -1) {
      const existing = items[idx];
      items[idx] = { ...existing, quantity: existing.quantity + 1 };
    } else {
      items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      });
    }
    this.cartItems.set(items);
    // show toast
    this.toast.show(`${product.name} added to cart`);
  }

  removeFromCart(productId: number) {
    this.cartItems.set(
      this.cartItems().filter((i) => i.productId !== productId)
    );
  }

  increaseQuantity(productId: number) {
    const items = this.cartItems().map((i) =>
      i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
    );
    this.cartItems.set(items);
  }

  decreaseQuantity(productId: number) {
    const items = this.cartItems()
      .map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter((i) => i.quantity > 0);
    this.cartItems.set(items);
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
