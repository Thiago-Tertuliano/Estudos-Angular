import { HttpInterceptorFn, HttpRequest, HttpResponse, HttpHandlerFn } from '@angular/common/http';
import { delay, Observable, of, throwError } from 'rxjs';
import { MockDatabase } from './mock-data';

function handleRoute(req: HttpRequest<unknown>): Observable<HttpResponse<unknown>> {
  const { method, url } = req;
  const body = req.body as Record<string, unknown>;

  const match = (pattern: string): RegExpMatchArray | null =>
    url.match(new RegExp(`^/api/${pattern}$`));

  const getId = (pattern: string): number | null => {
    const m = url.match(new RegExp(`^/api/${pattern}/(\\d+)$`));
    return m ? Number(m[1]) : null;
  };

  // Auth
  if (method === 'POST' && match('auth/login')) {
    const { email, password } = body as { email: string; password: string };
    const user = MockDatabase.findUser(email, password);
    if (user) return of(new HttpResponse({ status: 200, body: { token: `mock-jwt-${user.id}`, user } }));
    return of(new HttpResponse({ status: 401, body: { message: 'Credenciais inválidas' } }));
  }

  // Products
  if (method === 'GET' && match('products')) {
    return of(new HttpResponse({ status: 200, body: MockDatabase.getProducts() }));
  }
  if (method === 'GET' && url.match(/^\/api\/products\/\d+$/)) {
    const p = MockDatabase.getProduct(getId('products')!);
    return p ? of(new HttpResponse({ status: 200, body: p })) : throwError(() => ({ status: 404 }));
  }
  if (method === 'POST' && match('products')) {
    return of(new HttpResponse({ status: 201, body: MockDatabase.addProduct(body) }));
  }
  if (method === 'PUT' && url.match(/^\/api\/products\/\d+$/)) {
    const updated = MockDatabase.updateProduct(getId('products')!, body);
    return updated ? of(new HttpResponse({ status: 200, body: updated })) : throwError(() => ({ status: 404 }));
  }
  if (method === 'DELETE' && url.match(/^\/api\/products\/\d+$/)) {
    MockDatabase.deleteProduct(getId('products')!);
    return of(new HttpResponse({ status: 204 }));
  }

  // Clients
  if (method === 'GET' && match('clients')) {
    return of(new HttpResponse({ status: 200, body: MockDatabase.getClients() }));
  }
  if (method === 'GET' && url.match(/^\/api\/clients\/\d+$/)) {
    const c = MockDatabase.getClient(getId('clients')!);
    return c ? of(new HttpResponse({ status: 200, body: c })) : throwError(() => ({ status: 404 }));
  }
  if (method === 'POST' && match('clients')) {
    return of(new HttpResponse({ status: 201, body: MockDatabase.addClient(body) }));
  }
  if (method === 'PUT' && url.match(/^\/api\/clients\/\d+$/)) {
    const updated = MockDatabase.updateClient(getId('clients')!, body);
    return updated ? of(new HttpResponse({ status: 200, body: updated })) : throwError(() => ({ status: 404 }));
  }

  // Proposals
  if (method === 'GET' && match('proposals')) {
    return of(new HttpResponse({ status: 200, body: MockDatabase.getProposals() }));
  }
  if (method === 'GET' && url.match(/^\/api\/proposals\/\d+$/)) {
    const p = MockDatabase.getProposal(getId('proposals')!);
    return p ? of(new HttpResponse({ status: 200, body: p })) : throwError(() => ({ status: 404 }));
  }
  if (method === 'POST' && match('proposals')) {
    return of(new HttpResponse({ status: 201, body: MockDatabase.addProposal(body) }));
  }
  if (method === 'PUT' && url.match(/^\/api\/proposals\/\d+$/)) {
    const updated = MockDatabase.updateProposal(getId('proposals')!, body);
    return updated ? of(new HttpResponse({ status: 200, body: updated })) : throwError(() => ({ status: 404 }));
  }

  return of(new HttpResponse({ status: 404, body: { message: 'Mock route not found' } }));
}

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/')) return next(req);
  return handleRoute(req).pipe(delay(300));
};
