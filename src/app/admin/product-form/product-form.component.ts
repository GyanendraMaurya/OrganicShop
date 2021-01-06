import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../../categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  productForm: FormGroup;
  product = new Product()
  aaa = 'fruits'
  id;
  testForm: FormGroup;
  productForCard
  constructor(categoryService: CategoriesService, private fb: FormBuilder, private productService: ProductService,
    private router: Router, private route: ActivatedRoute) {
    // categoryService.getCategories();
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(p => {
        this.productForCard = p;
        this.product = <Product>p.payload.val()
      });
    }
  }
  ngOnInit(): void {
    this.intializeProductForm();
    this.testForms()
  }

  intializeProductForm() {
    const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.productForm = this.fb.group({
      "title": ['', Validators.required],
      "category": ['', [Validators.required]],
      "price": ['', [Validators.required, Validators.min(0)]],
      "imageUrl": ['', [Validators.required, Validators.pattern(urlReg)]],
    })
  }
  save() {

    if (this.id) {
      this.productService.update(this.id, this.productForm.value)
    } else {
      this.productService.create(this.productForm.value);
    }
    // console.log(this.productForm.valid)
    this.router.navigate(['/admin/products'])

  }

  delete() {
    if (!confirm("Are you sure want to delete the product!")) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  testForms() {
    this.testForm = this.fb.group({
      firstname: [''],
      skills: this.fb.group({
        skill1: [''],
        skill2: ['']
      })
    })
    this.testForm.patchValue({
      skills: {
        skill1: 'mango'
      }
    })
    console.log(this.testForm.get('skills').get('skill1').value)
    // this.testForm.get('skills').get('skill1').value
  }



}
