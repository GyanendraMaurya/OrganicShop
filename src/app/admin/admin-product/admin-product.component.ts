import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnDestroy {
  displayedColumns: string[] = ['title', 'price', 'link'];
  subscription: Subscription;
  products: any[];
  filteredProducts: any[] = [];
  dataSource: any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // dataSource = new MatTableDataSource<any>(this.filteredProducts);

  @ViewChild(MatSort) sort: MatSort;
  // ngAfterViewInit() {
  //   setTimeout(() => {

  //     this.dataSource.sort = this.sort;
  //   })
  // }
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(product => {
      this.filteredProducts = this.products = product;
      this.dataSource = new MatTableDataSource<any>(this.filteredProducts);


    });
  }


  filter(query: string) {
    console.log(query)
    this.filteredProducts = query ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
