import { Routes } from "@angular/router";
import { ShellComponent } from "@core/layout/shell.component";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login.page').then((m) => m.LoginPage),
    title: 'Login - Restaurant Front',
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home.page').then((m) => m.HomePage),
        title: 'Home - Restaurant Front',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/pages/about.page').then((m) => m.AboutPage),
        title: 'About - Restaurant Front',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
