import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { Project } from './project.model';
import { APP_CONFIG } from '@core/tokens/app-config.token';

@Injectable({ providedIn: 'root' })
export class ProjectFacade {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  readonly items = signal<Project[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<Project[]>(`${this.config.apiUrl}/projects`)
      .pipe(
        tap((data) => this.items.set(data)),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        error: (err: { message: string }) => this.error.set(err.message),
      });
  }

  create(payload: Omit<Project, 'id'>): void {
    this.loading.set(true);
    this.http
      .post<Project>(`${this.config.apiUrl}/projects`, payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (created) => this.items.update((list) => [created, ...list]),
        error: (err: { message: string }) => this.error.set(err.message),
      });
  }

  delete(id: string): void {
    this.http.delete(`${this.config.apiUrl}/projects/${id}`).subscribe({
      next: () => this.items.update((list) => list.filter((p) => p.id !== id)),
      error: (err: { message: string }) => this.error.set(err.message),
    });
  }
}
