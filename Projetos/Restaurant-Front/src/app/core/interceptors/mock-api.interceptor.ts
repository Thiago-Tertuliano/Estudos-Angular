import { HttpResponse, HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { DEMO_USER, MOCK_TABLES } from "./mock-data";
import { of, delay, throwError  } from "rxjs";


export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  const latency = 400;

  if (req.url === '/api/auth/login' && req.method === 'POST') {
    const { email, password } = req.body as { email: string; password: string };
    if (email && password.length >= 3) {
      return of(new HttpResponse({ status: 200, body: { token: 'mock-jwt-token', user: DEMO_USER } })).pipe(delay(latency));
    }
    return throwError(() => new HttpErrorResponse({ status: 401, error: { message: 'Credenciais inválidas' } }));
  }

  if (req.url === '/api/tables' && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: MOCK_TABLES })).pipe(delay(latency));
  }

  return next(req);
}
