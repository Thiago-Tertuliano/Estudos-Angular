import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';
import {
  LoginFormComponent,
  LoginFormValue,
} from '../ui/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly sessionExpired =
    this.route.snapshot.queryParamMap.get('sessionExpired') === 'true';

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  onSubmit(value: LoginFormValue): void {
    this.loading.set(true);
    this.error.set(null);

    this.auth.login(value.email, value.password).subscribe({
      next: () => {
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') ?? '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err: { message: string }) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
