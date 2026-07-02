import { HttpResponse, HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { DEMO_USER, MOCK_ORDERS, MOCK_TABLES } from "./mock-data";
import { of, delay, throwError  } from "rxjs";
import { CreateOrderPayload, Order } from "@features/orders/data-access/order.model";
import { OrderStatus } from "@features/orders/data-access/order.model";


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

  if (req.url === '/api/orders' && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: MOCK_ORDERS })).pipe(delay(latency));
  }
    if (req.url === '/api/orders' && req.method === 'POST') {
      const { tableId, waiterId } = req.body as CreateOrderPayload;
      const newOrder = {
        id: (MOCK_ORDERS.length + 1).toString(),
        tableId,
        waiterId,
        totalPrice: 0,
        status: 'Open' as OrderStatus,
        openedAt: new Date().toISOString(),
        closedAt: null,
      };
      MOCK_ORDERS.push(newOrder as Order);
      return of(new HttpResponse({ status: 201, body: newOrder })).pipe(delay(latency));
    }
  return next(req);
};
