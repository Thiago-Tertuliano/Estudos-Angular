import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { APP_CONFIG } from '@core/tokens/app-config.token';
import { finalize, tap } from 'rxjs';
import { Ticket, TicketFormValue } from './ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  readonly items = signal<Ticket[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<Ticket[]>(`${this.config.apiUrl}/tickets`)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.items.set(data),
        error: (err: { message: string }) => this.error.set(err.message),
      });
  }

  getById(id: string) {
    return this.http.get<Ticket>(`${this.config.apiUrl}/tickets/${id}`);
  }

  create(payload: TicketFormValue) {
    return this.http
      .post<Ticket>(`${this.config.apiUrl}/tickets`, payload)
      .pipe(
        tap((created) =>
          this.items.update((list) => [created, ...list]),
        ),
      );
  }

  update(id: string, payload: TicketFormValue) {
    return this.http
      .put<Ticket>(`${this.config.apiUrl}/tickets/${id}`, payload)
      .pipe(
        tap((updated) =>
          this.items.update((list) =>
            list.map((ticket) => (ticket.id === id ? updated : ticket)),
          ),
        ),
      );
  }
}
