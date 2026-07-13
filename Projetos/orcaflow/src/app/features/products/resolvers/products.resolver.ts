import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../data-access/product.service';

export const productsResolver: ResolveFn<void> = () => {
  inject(ProductService).loadAll();
};
