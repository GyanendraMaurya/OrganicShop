import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../product.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

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
  cart$: Observable<ShoppingCart>;
  subsciption: Subscription

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {
    // this.categories$ = categoryService.getAll();

  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart()
    this.populateProducts()
  }

  private populateProducts() {
    this.productService.getAll().pipe(switchMap(products => {
      this.products = products
      return this.route.queryParamMap
    }))
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();

      })
  }
  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => this.category == p.payload.val().category) :
      this.products
  }

}
