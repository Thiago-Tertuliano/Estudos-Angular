import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/pages/login.page').then(m => m.LoginPage),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard.page').then(m => m.DashboardPage),
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes').then(m => m.PRODUCT_ROUTES),
      },
      {
        path: 'clients',
        loadChildren: () => import('./features/clients/clients.routes').then(m => m.CLIENT_ROUTES),
      },
      {
        path: 'proposals',
        loadChildren: () => import('./features/proposals/proposals.routes').then(m => m.PROPOSAL_ROUTES),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./shared/pages/not-found.page').then(m => m.NotFoundPage),
  },
];
