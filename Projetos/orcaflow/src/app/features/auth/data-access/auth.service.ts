import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { APP_CONFIG } from '../../../core/tokens/app-config.token';

export interface User { id: number; email: string; name: string; role: 'admin' | 'user'; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly config = inject(APP_CONFIG);

  private readonly _token = signal<string | null>(localStorage.getItem('orcaflow_token'));
  private readonly _user = signal<User | null>(this.loadUser());

  readonly token = this._token.asReadonly();
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token() && !!this._user());

  private loadUser(): User | null {
    const raw = localStorage.getItem('orcaflow_user');
    return raw ? JSON.parse(raw) : null;
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: User }>(`${this.config.apiUrl}/auth/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem('orcaflow_token', res.token);
        localStorage.setItem('orcaflow_user', JSON.stringify(res.user));
        this._token.set(res.token);
        this._user.set(res.user);
      }),
    );
  }

  logout() {
    localStorage.removeItem('orcaflow_token');
    localStorage.removeItem('orcaflow_user');
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }
}
