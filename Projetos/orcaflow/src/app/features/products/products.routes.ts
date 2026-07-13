import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { productsResolver } from './resolvers/products.resolver';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    resolve: { productsResolver },
    loadComponent: () => import('./pages/product-list.page').then(m => m.ProductListPage),
  },
  {
    path: ':id/edit',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/product-form.page').then(m => m.ProductFormPage),
  },
];
