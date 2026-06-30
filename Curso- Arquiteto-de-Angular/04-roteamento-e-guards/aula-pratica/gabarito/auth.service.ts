import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly token = signal<string | null>(localStorage.getItem('token'));

  readonly isAuthenticated = computed(() => !!this.token());

  login(email: string, password: string): boolean {
    if (!email || password.length < 3) return false;
    localStorage.setItem('token', 'mock-token');
    this.token.set('mock-token');
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.token();
  }
}
