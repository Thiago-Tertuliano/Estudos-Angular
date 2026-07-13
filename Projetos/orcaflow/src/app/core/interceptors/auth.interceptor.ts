import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/data-access/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.token();
  if (token && !req.url.includes('/auth/login')) {
    const cloned = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    return next(cloned);
  }
  return next(req);
};
