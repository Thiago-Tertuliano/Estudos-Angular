import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { clientsResolver } from './resolvers/clients.resolver';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    resolve: { clientsResolver },
    loadComponent: () => import('./pages/client-list.page').then(m => m.ClientListPage),
  },
];
