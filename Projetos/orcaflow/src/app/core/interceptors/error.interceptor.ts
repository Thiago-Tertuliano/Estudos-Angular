import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../../features/auth/data-access/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe({
    catchError: (error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/login')) {
        auth.logout();
        router.navigate(['/login'], { queryParams: { sessionExpired: true } });
      }
      const message = error.status === 0
        ? 'Erro de conexão. Verifique sua rede.'
        : error.error?.message || `Erro ${error.status}`;
      return throwError(() => ({ status: error.status, message }));
    },
  });
};
