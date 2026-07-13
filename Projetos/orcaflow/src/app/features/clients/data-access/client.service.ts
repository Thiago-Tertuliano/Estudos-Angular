import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { APP_CONFIG } from '../../../core/tokens/app-config.token';
import { Client } from './client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  readonly items = signal<Client[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll() {
    this.loading.set(true);
    this.http.get<Client[]>(`${this.config.apiUrl}/clients`).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (data) => this.items.set(data),
      error: (err) => this.error.set(err.message),
    });
  }

  getById(id: number) { return this.http.get<Client>(`${this.config.apiUrl}/clients/${id}`); }

  create(data: Partial<Client>) {
    this.loading.set(true);
    return this.http.post<Client>(`${this.config.apiUrl}/clients`, data).pipe(finalize(() => this.loading.set(false)));
  }

  update(id: number, data: Partial<Client>) {
    this.loading.set(true);
    return this.http.put<Client>(`${this.config.apiUrl}/clients/${id}`, data).pipe(finalize(() => this.loading.set(false)));
  }
}
