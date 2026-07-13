import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { tap } from "rxjs";
import { Router } from "@angular/router";
import { APP_CONFIG } from "../../../core/tokens/app-config.token";
import { roleUser } from "./user.model";

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    role: roleUser;
}

interface LoginResponse {
    token: string;
    user: User;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly config = inject(APP_CONFIG);

    private readonly tokenSignal = signal<string | null>(
        localStorage.getItem(TOKEN_KEY),
    );
    private readonly userSignal = signal<User | null>(this.loadStoredUser());

    readonly isAuthenticated = computed(() => !! this.tokenSignal());
    readonly currentUser = this.userSignal.asReadonly();

    login(email: string, password: string) {
        return this.http
            .post<LoginResponse>(`${this.config.apiUrl}/auth/login`, { email, password })
            .pipe(
                tap(({ token, user }) => {
                    localStorage.setItem(TOKEN_KEY, token);
                    localStorage.setItem(USER_KEY, JSON.stringify(user));
                    this.tokenSignal.set(token);
                    this.userSignal.set(user);
                }),
            );
        }

        logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        this.tokenSignal.set(null);
        this.userSignal.set(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
    return this.tokenSignal();
  }

  private loadStoredUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }
}