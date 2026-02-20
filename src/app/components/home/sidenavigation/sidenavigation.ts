import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/category';
import { CategoryService } from '../services/category.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenavigation',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './sidenavigation.html',
  styleUrl: './sidenavigation.css',
})
export class Sidenavigation {
faAngleDown = faAngleDown;
categories: Observable<Category[]> = new Observable();

constructor(private categoryService: CategoryService) {}

ngOnInit() {
  this.categories = this.categoryService.getAllCategories();
         console.log('Using sample data instead.'+this.categories);
}

getCategories(categoryId?: number): Observable<Category[]> {
  return this.categories.pipe(
    map((categories: any[]) =>
      categories.filter(category => category.categoryId === categoryId)
    )
  );
}
}
