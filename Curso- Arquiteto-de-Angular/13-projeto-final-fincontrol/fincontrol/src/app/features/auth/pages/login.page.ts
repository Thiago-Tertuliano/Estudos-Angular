import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../data-access/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly sessionExpired = this.route.snapshot.queryParamMap.get('sessionExpired') === 'true';

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['dev@fincontrol.app', [Validators.required, Validators.email]],
    password: ['123', [Validators.required, Validators.minLength(3)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/dashboard';
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
