import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { catchError, EMPTY, Observable, of, Subscription } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit { // After Async - Not needed: OnDestroy
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  // Before Async:
  // products: Product[] = [];
  
  // After Async
  // products$: Observable<Product[]> | undefined;
  // Not needed - sub!: Subscription;

  products$: Observable<Product[]> = this.productService.products$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY; // Return an empty observable when error happens ORRR you can return an Observable of the Product[] using the "of" creation function of rxjs
    })
  );

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Before Async: 
    // this.sub = this.productService.getProducts()
    //   .subscribe({
    //     next: products => this.products = products,
    //     error: err => this.errorMessage = err
    //   });

    // After Async - Automatically does subscribing and unsubscribing; No need to this.sub.unsubscribe when using Async
    // this.products$ = this.productService.getProducts()
    //   .pipe(
    //     catchError(err => {
    //       this.errorMessage = err;
    //       return EMPTY; // Return an empty observable when error happens ORRR you can return an Observable of the Product[] using the "of" creation function of rxjs
    //     })
    //   );
  }

  // After Async - Not needed anymore
  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
