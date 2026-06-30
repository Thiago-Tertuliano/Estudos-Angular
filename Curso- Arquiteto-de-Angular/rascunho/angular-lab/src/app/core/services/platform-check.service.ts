import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly token = signal<string | null>(this.readToken());

  readonly isAuthenticated = computed(() => !!this.token());

  login(email: string, password: string): boolean {
    if (!email || password.length < 3) {
      return false;
    }
    this.persistToken('mock-token');
    this.token.set('mock-token');
    return true;
  }

  logout(): void {
    this.persistToken(null);
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.token();
  }

  private readToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  }

  private persistToken(token: string | null): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      return;
    }
    localStorage.removeItem(TOKEN_KEY);
  }
}
