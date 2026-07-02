import { signal, inject, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APP_CONFIG } from "@core/tokens/app-config.token";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

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
  private readonly router = inject(Router);
  private readonly config = inject(APP_CONFIG);

  private readonly tokenSignal = signal<string | null>(null);
  private readonly userSignal = signal<User | null>(null);

  readonly isAuthenticated = computed(() => !!this.tokenSignal());
  readonly currentUser = this.userSignal.asReadonly();

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.config.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(({ token, user }) => {
          this.tokenSignal.set(token);
          this.userSignal.set(user);
        })
      );
  }

  logout(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
}
