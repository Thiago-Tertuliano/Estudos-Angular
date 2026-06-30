import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="email" type="email" placeholder="Email" />
      @if (form.controls.email.touched && form.controls.email.hasError('required')) {
        <span class="error">Email obrigatório</span>
      }
      <input formControlName="password" type="password" placeholder="Senha" />
      @if (form.controls.password.touched && form.controls.password.hasError('minlength')) {
        <span class="error">Senha deve ter pelo menos 3 caracteres</span>
      }
      <button type="submit" [disabled]="form.invalid">Entrar</button>
    </form>
  `,
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    if (!this.auth.login(email, password)) {
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/playground';
    this.router.navigateByUrl(returnUrl);
  }
}
