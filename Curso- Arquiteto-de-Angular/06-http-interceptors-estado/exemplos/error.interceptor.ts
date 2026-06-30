import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        auth.logout();
        router.navigate(['/login'], { queryParams: { sessionExpired: true } });
      }

      // Normaliza mensagem para UI
      const message =
        error.error?.message ??
        (error.status === 0 ? 'Sem conexão com o servidor' : 'Erro inesperado');

      return throwError(() => ({ status: error.status, message }));
    })
  );
};
