import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../data-access/auth.service';
import { LoginFormComponent } from '../ui/login-form.component';
import { APP_CONFIG } from '../../../core/tokens/app-config.token';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, LoginFormComponent],
  template: `
    <div class="login-page">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>{{ appName }}</mat-card-title>
          <mat-card-subtitle>Orçamentos e Propostas</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          @if (sessionExpired()) {
            <div class="session-banner">Sessão expirada. Faça login novamente.</div>
          }
          <app-login-form [loading]="loading()" [error]="error()" (submitForm)="onLogin($event)" />
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); }
    .login-card { width: 400px; max-width: 90vw; }
    .login-card mat-card-title { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; }
    .session-banner { background: #fff3cd; color: #856404; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; font-size: 0.875rem; text-align: center; }
  `],
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly appName = inject(APP_CONFIG).appName;

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly sessionExpired = signal(false);

  constructor() {
    this.sessionExpired.set(this.route.snapshot.queryParams['sessionExpired'] === 'true');
  }

  onLogin(data: { email: string; password: string }) {
    this.loading.set(true);
    this.error.set(null);
    this.auth.login(data.email, data.password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message || 'Erro ao fazer login');
      },
      complete: () => this.loading.set(false),
    });
  }
}
