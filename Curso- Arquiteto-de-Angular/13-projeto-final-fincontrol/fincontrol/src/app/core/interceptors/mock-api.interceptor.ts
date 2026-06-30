import {
  HttpInterceptorFn,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';
import { DEMO_USER, MockDatabase, MOCK_CATEGORIES } from './mock-data';
import { Transaction } from '@features/transactions/data-access/transaction.model';

/**
 * Interceptor que simula API REST — permite estudar HttpClient sem backend real.
 * Em produção, remova e aponte APP_CONFIG.apiUrl para API real.
 */
export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  const { url, method, body } = req;
  const latency = 400;

  // POST /api/auth/login
  if (url === '/api/auth/login' && method === 'POST') {
    const { email, password } = body as { email: string; password: string };
    if (email && password.length >= 3) {
      return of(
        new HttpResponse({
          status: 200,
          body: { token: 'mock-jwt-token', user: { ...DEMO_USER, email } },
        })
      ).pipe(delay(latency));
    }
    return throwError(
      () => new HttpErrorResponse({ status: 401, error: { message: 'Credenciais inválidas' } })
    );
  }

  // GET /api/transactions
  if (url === '/api/transactions' && method === 'GET') {
    return of(
      new HttpResponse({ status: 200, body: MockDatabase.getTransactions() })
    ).pipe(delay(latency));
  }

  // GET /api/transactions/search?q=
  if (url.startsWith('/api/transactions/search') && method === 'GET') {
    const q = new URL(url, 'http://localhost').searchParams.get('q') ?? '';
    return of(
      new HttpResponse({
        status: 200,
        body: MockDatabase.searchTransactions(q).map((t) => ({
          id: t.id,
          label: t.description,
        })),
      })
    ).pipe(delay(200));
  }

  // POST /api/transactions
  if (url === '/api/transactions' && method === 'POST') {
    const payload = body as Omit<Transaction, 'id'>;
    const created: Transaction = {
      ...payload,
      id: `tx-${Date.now()}`,
    };
    MockDatabase.addTransaction(created);
    return of(new HttpResponse({ status: 201, body: created })).pipe(delay(latency));
  }

  // DELETE /api/transactions/:id
  const deleteMatch = url.match(/^\/api\/transactions\/(.+)$/);
  if (deleteMatch && method === 'DELETE') {
    const id = deleteMatch[1];
    if (!MockDatabase.deleteTransaction(id)) {
      return throwError(
        () => new HttpErrorResponse({ status: 404, error: { message: 'Não encontrado' } })
      );
    }
    return of(new HttpResponse({ status: 204, body: null })).pipe(delay(latency));
  }

  // GET /api/categories
  if (url === '/api/categories' && method === 'GET') {
    return of(new HttpResponse({ status: 200, body: MOCK_CATEGORIES })).pipe(delay(latency));
  }

  return throwError(
    () => new HttpErrorResponse({ status: 404, error: { message: 'Rota mock não encontrada' } })
  );
};
