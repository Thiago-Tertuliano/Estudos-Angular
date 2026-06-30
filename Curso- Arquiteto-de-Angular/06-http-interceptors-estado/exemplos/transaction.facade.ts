import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

/**
 * Facade: única porta de entrada da feature para dados remotos.
 * Componentes smart consomem signals, não HttpClient diretamente.
 */
@Injectable({ providedIn: 'root' })
export class TransactionFacade {
  private readonly http = inject(HttpClient);

  readonly items = signal<Transaction[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<Transaction[]>('/api/transactions')
      .pipe(
        tap((data) => this.items.set(data)),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        error: (err: { message: string }) => this.error.set(err.message),
      });
  }

  delete(id: string): void {
    this.http.delete(`/api/transactions/${id}`).subscribe({
      next: () => this.items.update((list) => list.filter((t) => t.id !== id)),
      error: (err: { message: string }) => this.error.set(err.message),
    });
  }
}
