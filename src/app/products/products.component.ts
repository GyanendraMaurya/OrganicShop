import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any = [];
  filteredProducts = [];
  categories$;
  category;

  constructor(productService: ProductService, route: ActivatedRoute) {
    // this.categories$ = categoryService.getAll();
    productService.getAll().pipe(switchMap(products => {
      this.products = products
      return route.queryParamMap
    }))
      .subscribe(params => {
        this.category = params.get('category')
        this.filteredProducts = (this.category) ?
          this.products.filter(p => this.category == p.payload.val().category) :
          this.products
      })
  }

}
