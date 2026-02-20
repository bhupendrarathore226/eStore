import { Injectable } from '@angular/core';
import { Category } from '../types/category';
 
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories';
  
 constructor(private http: HttpClient) { }

  getAllCategories():Observable<Category[]> {
   return this.http.get<Category[]>(this.apiUrl)
         .pipe(
           catchError(error => {
             console.error('Error fetching products from API:', error);
      
             return of([]);
           })  
         );   
  }
}


