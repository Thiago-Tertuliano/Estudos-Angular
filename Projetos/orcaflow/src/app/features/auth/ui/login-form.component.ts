import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="login-form">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>E-mail</mat-label>
        <input matInput formControlName="email" type="email" placeholder="admin@orcaflow.app" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Senha</mat-label>
        <input matInput formControlName="password" type="password" placeholder="123" />
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || loading()" class="full-width">
        {{ loading() ? 'Entrando...' : 'Entrar' }}
      </button>
      @if (error(); as err) {
        <div class="error-msg">{{ err }}</div>
      }
    </form>
  `,
  styles: [`
    .login-form { display: flex; flex-direction: column; gap: 1rem; }
    .full-width { width: 100%; }
    .error-msg { color: #e94560; font-size: 0.875rem; text-align: center; padding: 0.5rem; background: #ffe0e0; border-radius: 6px; }
  `],
})
export class LoginFormComponent {
  private readonly fb = new FormBuilder();
  readonly form: FormGroup = this.fb.nonNullable.group({
    email: ['admin@orcaflow.app', [Validators.required, Validators.email]],
    password: ['123', [Validators.required, Validators.minLength(3)]],
  });

  readonly loading = input.required<boolean>();
  readonly error = input<string | null>();
  readonly submitForm = output<{ email: string; password: string }>();

  onSubmit() {
    if (this.form.valid) this.submitForm.emit(this.form.getRawValue());
  }
}
