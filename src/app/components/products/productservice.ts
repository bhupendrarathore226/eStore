import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ProductListItems } from './product.type';
import { PRODUCTS } from './product.data';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class Productservice {
  private apiUrl = 'http://localhost:3000/api/'; // Backend API endpoint

  constructor(private http: HttpClient) { }
private handleError(error: any) {
  // Log to an external service like Sentry or Azure Monitor
  console.error('API Error:', error);
  return of(PRODUCTS); // Return fallback data
}
  /**
   * Fetch all products from MySQL database via backend API
   * Falls back to local data if API fails
   */
  getProductsList(): Observable<ProductListItems[]> {
    return this.http.get<ProductListItems[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching products from API:', error);
          
          return of(PRODUCTS);
        })  
      );
  }

  /**
   * Fetch a single product by ID from MySQL
   */
  getProductById(id: number): Observable<ProductListItems> {
    return this.http.get<ProductListItems>(`${this.apiUrl}/products/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching product by ID:', error);
          const product = PRODUCTS.find(p => p.id === id);
          return of(product || {} as ProductListItems);
        })
      );
  }

  /**
   * Fetch products by category from MySQL
   */
  getProductsByCategory(category: string): Observable<ProductListItems[]> {
    return this.http.get<ProductListItems[]>(`${this.apiUrl}/category/${category}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching products by category:', error);
          // Fallback to local filtering
          const filtered = PRODUCTS.filter(p => p.category === category);
          return of(filtered);
        })
      );
  }

  /**
   * Create a new product in MySQL
   */
  createProduct(product: Omit<ProductListItems, 'id'>): Observable<ProductListItems> {
    return this.http.post<ProductListItems>(this.apiUrl, product)
      .pipe(
        catchError(error => {
          console.error('Error creating product:', error);
          throw error;
        })
      );
  }

  /**
   * Update an existing product in MySQL
   */
  updateProduct(id: number, product: Partial<ProductListItems>): Observable<ProductListItems> {
    return this.http.put<ProductListItems>(`${this.apiUrl}/${id}`, product)
      .pipe(
        catchError(error => {
          console.error('Error updating product:', error);
          throw error;
        })
      );
  }

  /**
   * Delete a product from MySQL
   */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting product:', error);
          throw error;
        })
      );
  }
}
