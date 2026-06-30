import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { APP_CONFIG } from '@core/tokens/app-config.token';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  readonly items = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http
      .get<Product[]>(`${this.config.apiUrl}/products`)
      .pipe(
        tap((data) => this.items.set(data)),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        error: (err: { message: string }) => this.error.set(err.message),
      });
  }

  create(product: Omit<Product, 'id'>): void {
    this.http
      .post<Product>(`${this.config.apiUrl}/products`, product)
      .subscribe({
        next: (created) => this.items.update((list) => [created, ...list]),
        error: (err: { message: string }) => this.error.set(err.message),
      });
  }
}
