import { Component, signal } from '@angular/core';
import { Productservice } from './productservice';
import { ProductListItems } from'./product.type';// Adjust the path as needed
import { CommonModule } from '@angular/common';
import { Ratings } from "../ratings/ratings";
import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings],
  templateUrl: './products.html',
  styleUrl: './products.css',
  providers: [ Productservice]
})
export class Products {
  products!: Signal<ProductListItems[]>;
  addedItem = signal<number | null>(null);

  constructor(
    private productService: Productservice,
    private cartStore: CartStore
  ) {
    this.products = toSignal(this.productService.getProductsList(), { initialValue: [] });
  }

  ngOnInit() {}

  addToCart(item: ProductListItems) {
    this.cartStore.addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
    });
    // simple animation trigger
    this.addedItem.set(item.id);
    setTimeout(() => this.addedItem.set(null), 400);
  }
}