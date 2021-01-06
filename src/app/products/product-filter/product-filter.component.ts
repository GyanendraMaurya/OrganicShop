import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category;
  constructor(categoryService: CategoriesService) {
    this.categories$ = categoryService.getAll();
  }
}
