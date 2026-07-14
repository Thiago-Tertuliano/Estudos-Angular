import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../features/auth/data-access/auth.service";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const auth = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/auth/login')) {
            auth.logout();
            router.navigate(['/login'], {
                queryParams: { sessionExpired: true}
            });
        }

        const message = 
            (error.error as { message?: string })?.message ??
            (error.status === 0 ? 'Sem conexão com o servidor' : 'Erro inesperado');
        
        return throwError(() => ({ status: error.status, message }));
      }),
    );
};