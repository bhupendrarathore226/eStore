import { Component } from '@angular/core';
import { Productservice } from './productservice';
import { ProductListItems } from'./product.type';// Adjust the path as needed
import { CommonModule } from '@angular/common';
import { Ratings } from "../ratings/ratings";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings],
  templateUrl: './products.html',
  styleUrl: './products.css',
  providers: [ Productservice]
})
export class Products {
  products$!: Observable<ProductListItems[]>;
  constructor(private productService: Productservice) {
  }
  ngOnInit() {
    this.products$ = this.productService.getProductsList();
  }
}