import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { Transaction, Category } from './transaction.model';
import { APP_CONFIG } from '@core/tokens/app-config.token';

@Injectable({ providedIn: 'root' })
export class TransactionFacade {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  readonly items = signal<Transaction[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<Transaction[]>(`${this.config.apiUrl}/transactions`)
      .pipe(
        tap((data) => this.items.set(data)),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        error: (err: { message: string }) => this.error.set(err.message),
      });
  }

  loadCategories(): void {
    this.http
      .get<Category[]>(`${this.config.apiUrl}/categories`)
      .subscribe((data) => this.categories.set(data));
  }

  create(payload: Omit<Transaction, 'id'>): void {
    this.loading.set(true);
    this.http
      .post<Transaction>(`${this.config.apiUrl}/transactions`, payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (created) => this.items.update((list) => [created, ...list]),
        error: (err: { message: string }) => this.error.set(err.message),
      });
  }

  delete(id: string): void {
    this.http.delete(`${this.config.apiUrl}/transactions/${id}`).subscribe({
      next: () => this.items.update((list) => list.filter((t) => t.id !== id)),
      error: (err: { message: string }) => this.error.set(err.message),
    });
  }
}
