import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'playground',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('@features/auth/pages/login.page').then((m) => m.LoginPage),
    title: 'Login - Angular Lab',
  },
  {
    path: 'playground',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@features/playground/pages/playground.page').then((m) => m.PlaygroundPage),
    title: 'Playground - Angular Lab',
  },
];
