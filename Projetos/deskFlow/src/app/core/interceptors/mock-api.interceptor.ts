import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';
import { Ticket, TicketFormValue } from '@features/tickets/data-access/ticket.model';
import { DEMO_USER, MockTicketStore } from './mock-data';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  const { url, method, body } = req;
  const latency = 400;

  if (url === '/api/auth/login' && method === 'POST') {
    const { email, password } = body as { email: string; password: string };
    if (email && password.length >= 3) {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            token: 'mock-jwt-token',
            user: { ...DEMO_USER, email },
          },
        }),
      ).pipe(delay(latency));
    }
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          error: { message: 'Credenciais inválidas' },
        }),
    );
  }

  if (url === '/api/tickets' && method === 'GET') {
    return of(
      new HttpResponse({ status: 200, body: MockTicketStore.getAll() }),
    ).pipe(delay(latency));
  }

  if (url === '/api/tickets' && method === 'POST') {
    const payload = body as TicketFormValue;
    const created: Ticket = {
      ...payload,
      id: `tkt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };
    MockTicketStore.add(created);
    return of(new HttpResponse({ status: 201, body: created })).pipe(
      delay(latency),
    );
  }

  const ticketMatch = url.match(/^\/api\/tickets\/([^/]+)$/);

  if (ticketMatch && method === 'GET') {
    const id = ticketMatch[1];
    const ticket = MockTicketStore.getById(id);
    if (!ticket) {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
            error: { message: 'Ticket não encontrado' },
          }),
      );
    }
    return of(new HttpResponse({ status: 200, body: ticket })).pipe(
      delay(latency),
    );
  }

  if (ticketMatch && method === 'PUT') {
    const id = ticketMatch[1];
    const payload = body as TicketFormValue;
    const updated = MockTicketStore.update(id, payload);
    if (!updated) {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
            error: { message: 'Ticket não encontrado' },
          }),
      );
    }
    return of(new HttpResponse({ status: 200, body: updated })).pipe(
      delay(latency),
    );
  }

  return throwError(
    () =>
      new HttpErrorResponse({
        status: 404,
        error: { message: 'Rota mock não encontrada' },
      }),
  );
};
