import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { APP_CONFIG } from './app-config.token';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  private readonly tokenSignal = signal<string | null>(
    localStorage.getItem('auth_token')
  );
  private readonly userSignal = signal<User | null>(null);

  readonly isAuthenticated = computed(() => !!this.tokenSignal());
  readonly currentUser = this.userSignal.asReadonly();

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.config.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(({ token, user }) => {
          localStorage.setItem('auth_token', token);
          this.tokenSignal.set(token);
          this.userSignal.set(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
}
