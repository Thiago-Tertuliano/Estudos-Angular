import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="client-form">
      <div class="form-row">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>E-mail</mat-label>
          <input matInput formControlName="email" type="email" />
        </mat-form-field>
      </div>
      <div class="form-row">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Telefone</mat-label>
          <input matInput formControlName="phone" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>CPF/CNPJ</mat-label>
          <input matInput formControlName="document" />
        </mat-form-field>
      </div>
      <div class="form-actions">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || submitting()">
          {{ submitting() ? 'Salvando...' : 'Salvar' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .client-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .full-width { width: 100%; }
    .form-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
  `],
})
export class ClientFormComponent {
  private readonly fb = new FormBuilder();

  readonly submitting = input(false);
  readonly saved = output<{ name: string; email: string; phone: string; document: string }>();

  readonly form: FormGroup = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    document: [''],
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.saved.emit(this.form.getRawValue());
    this.form.reset({ name: '', email: '', phone: '', document: '' });
  }
}
