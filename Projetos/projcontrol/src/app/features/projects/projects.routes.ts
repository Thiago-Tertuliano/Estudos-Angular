import { Routes } from '@angular/router';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/project-list.page').then((m) => m.ProjectListPage),
    title: 'Projetos — ProjControl',
  },
];
