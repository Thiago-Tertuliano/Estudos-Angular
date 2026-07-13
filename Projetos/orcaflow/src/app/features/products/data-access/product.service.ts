import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { APP_CONFIG } from '../../../core/tokens/app-config.token';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  readonly items = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Product[]>(`${this.config.apiUrl}/products`).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (data) => this.items.set(data),
      error: (err) => this.error.set(err.message),
    });
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.config.apiUrl}/products/${id}`);
  }

  create(data: Partial<Product>) {
    this.loading.set(true);
    return this.http.post<Product>(`${this.config.apiUrl}/products`, data).pipe(finalize(() => this.loading.set(false)));
  }

  update(id: number, data: Partial<Product>) {
    this.loading.set(true);
    return this.http.put<Product>(`${this.config.apiUrl}/products/${id}`, data).pipe(finalize(() => this.loading.set(false)));
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.config.apiUrl}/products/${id}`);
  }
}
