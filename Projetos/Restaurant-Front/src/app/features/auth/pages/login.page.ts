import { Component, inject, signal } from "@angular/core";
import { LoginFormComponent, LoginFormValue } from "../ui/login-form.component";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { AuthService } from "../data-access/auth.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
  <h1>Restaurant-Front</h1>
  <p>Página de login</p>
    <app-login-form
    [loading]="loading()"
    [error]="error()"
    (submitForm)="onSubmit($event)"
    />
  `,
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  onSubmit(value: LoginFormValue): void {
    this.loading.set(true);
    this.error.set(null);

    this.auth.login(value.email, value.password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Credenciais inválidas');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}

