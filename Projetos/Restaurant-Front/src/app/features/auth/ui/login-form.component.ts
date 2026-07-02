import { Component, inject, input, output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

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
      <input formControlName="email" type="email" placeholder="Email" />
      <input formControlName="password" type="password" placeholder="Senha" />
      <button type="submit" [disabled]="form.invalid">Entrar</button>
    </form>
    @if (error()) {
      <p class="error">{{ error() }}</p>
    }
  `,
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly submitForm = output<LoginFormValue>();


  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.getRawValue());
  }
}
