import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@core/tokens/app-config.token';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductApi {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.apiUrl}/products`);
  }

  search(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.apiUrl}/products/search`, {
      params: { q: term },
    });
  }

  create(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.config.apiUrl}/products`, product);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.config.apiUrl}/products/${id}`);
  }

  update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.config.apiUrl}/products/${id}`, product);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.config.apiUrl}/products/${id}`);
  }
}
