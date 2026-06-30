import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';
import { Product } from '@features/playground/data-access/product.model';

const products: Product[] = [
  { id: '1', name: 'Pc Gamer', price: 1000 },
  { id: '2', name: 'Mouse', price: 100 },
  { id: '3', name: 'Teclado', price: 100 },
];

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  const { url, method, body } = req;
  const latency = 400;

  if (url === '/api/products' && method === 'GET') {
    return of(new HttpResponse({ status: 200, body: [...products] })).pipe(delay(latency));
  }

  if (url.startsWith('/api/products/search') && method === 'GET') {
    const term = req.params.get('q')?.toLowerCase() ?? '';
    const results = products.filter((product) => product.name.toLowerCase().includes(term));
    return of(new HttpResponse({ status: 200, body: results })).pipe(delay(latency));
  }

  if (url === '/api/products' && method === 'POST') {
    const payload = body as Omit<Product, 'id'>;
    const created: Product = { ...payload, id: crypto.randomUUID() };
    products.unshift(created);
    return of(new HttpResponse({ status: 201, body: created })).pipe(delay(latency));
  }

  return throwError(
    () => new HttpErrorResponse({ status: 404, error: { message: 'Route not found' } }),
  );
};
