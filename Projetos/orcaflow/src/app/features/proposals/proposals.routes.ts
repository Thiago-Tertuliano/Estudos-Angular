import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { canDeactivateGuard } from '../../core/guards/can-deactivate.guard';

export const PROPOSAL_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/proposal-list.page').then(m => m.ProposalListPage),
  },
  {
    path: 'new',
    canActivate: [authGuard],
    canDeactivate: [canDeactivateGuard],
    loadComponent: () => import('./pages/proposal-form.page').then(m => m.ProposalFormPage),
  },
  {
    path: ':id/edit',
    canActivate: [authGuard],
    canDeactivate: [canDeactivateGuard],
    loadComponent: () => import('./pages/proposal-form.page').then(m => m.ProposalFormPage),
  },
];
