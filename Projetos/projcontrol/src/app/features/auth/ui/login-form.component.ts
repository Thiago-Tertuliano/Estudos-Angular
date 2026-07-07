import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        E-mail
        <input
          formControlName="email"
          type="email"
          placeholder="seu@email.com"
          autocomplete="email"
        />
      </label>
      <label>
        Senha
        <input
          formControlName="password"
          type="password"
          placeholder="Senha"
          autocomplete="current-password"
        />
      </label>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <button type="submit" [disabled]="form.invalid || loading()">
        {{ loading() ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      font-size: 0.875rem;
    }

    input {
      padding: 0.625rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-bg);
      color: var(--color-text);
    }

    button {
      margin-top: 0.5rem;
      padding: 0.75rem;
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: var(--radius);
      font-weight: 600;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  `,
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly submitForm = output<LoginFormValue>();

  readonly form = this.fb.nonNullable.group({
    email: ['dev@projcontrol.app', [Validators.required, Validators.email]],
    password: ['123', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.getRawValue());
  }
}
