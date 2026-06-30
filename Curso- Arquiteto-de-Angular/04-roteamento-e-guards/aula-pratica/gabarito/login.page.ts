import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="email" type="email" placeholder="Email" />
      <input formControlName="password" type="password" placeholder="Senha" />
      <button type="submit" [disabled]="form.invalid">Entrar</button>
    </form>
  `,
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  submit(): void {
    const { email, password } = this.form.getRawValue();
    if (this.auth.login(email, password)) {
      this.router.navigate(['/playground']);
    }
  }
}
