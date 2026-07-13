import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { APP_CONFIG } from '../../../core/tokens/app-config.token';
import { Proposal } from './proposal.model';

@Injectable({ providedIn: 'root' })
export class ProposalService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  readonly items = signal<Proposal[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Proposal[]>(`${this.config.apiUrl}/proposals`).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (data) => this.items.set(data),
      error: (err) => this.error.set(err.message),
    });
  }

  getById(id: number) { return this.http.get<Proposal>(`${this.config.apiUrl}/proposals/${id}`); }

  create(data: Partial<Proposal>) {
    this.loading.set(true);
    return this.http.post<Proposal>(`${this.config.apiUrl}/proposals`, data).pipe(finalize(() => this.loading.set(false)));
  }

  update(id: number, data: Partial<Proposal>) {
    this.loading.set(true);
    return this.http.put<Proposal>(`${this.config.apiUrl}/proposals/${id}`, data).pipe(finalize(() => this.loading.set(false)));
  }
}
