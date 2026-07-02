import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '@core/tokens/app-config.token';
import { Observable } from 'rxjs';
import { CreateOrderPayload, Order } from './order.model';

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.config.apiUrl}/orders`);
  }

  create(payload: CreateOrderPayload): Observable<Order> {
    return this.http.post<Order>(`${this.config.apiUrl}/orders`, payload);
  }
}
