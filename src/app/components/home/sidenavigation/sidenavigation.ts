import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/category';
import { CategoryService } from '../services/category.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-sidenavigation',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './sidenavigation.html',
  styleUrl: './sidenavigation.css',
})
export class Sidenavigation {
  faAngleDown = faAngleDown;
  categories: Signal<Category[]> = signal([]);

  constructor(private categoryService: CategoryService) {
        this.categories = toSignal(this.categoryService.getAllCategories(), { initialValue: [] });
 
   }

  ngOnInit() {

 } 
}
