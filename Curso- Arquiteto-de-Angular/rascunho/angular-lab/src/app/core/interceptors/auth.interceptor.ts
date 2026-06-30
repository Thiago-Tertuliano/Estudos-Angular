import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token || req.url.includes('/auth/login')) {
    return next(req);
  }
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
