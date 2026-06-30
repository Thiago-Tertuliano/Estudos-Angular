import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Titulo } from '../../models/titulo.model';

@Component({
  selector: 'app-titulo-edit-presenter',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="edit-form" [formGroup]="form" (ngSubmit)="submit()">
      <h3>Editar título</h3>

      <mat-form-field appearance="outline">
        <mat-label>Nome Cliente</mat-label>
        <input matInput formControlName="nomeCliente" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Conta</mat-label>
        <input matInput formControlName="conta" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>CPF</mat-label>
        <input matInput formControlName="cpf" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Data da Compra</mat-label>
        <input matInput type="date" formControlName="dataCompra" />
      </mat-form-field>

      <div class="actions">
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Salvar</button>
        <button mat-stroked-button type="button" (click)="cancelled.emit()">Cancelar</button>
      </div>
    </form>
  `,
  styles: `
    .edit-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;
    }
    h3 {
      grid-column: 1 / -1;
      margin: 0;
    }
    .actions {
      grid-column: 1 / -1;
      display: flex;
      gap: 0.75rem;
    }
  `,
})
export class TituloEditPresenterComponent {
  readonly titulo = input.required<Titulo>();
  readonly saved = output<Titulo>();
  readonly cancelled = output<void>();

  readonly form = new FormGroup({
    nomeCliente: new FormControl('', { nonNullable: true, validators: Validators.required }),
    conta: new FormControl('', { nonNullable: true, validators: Validators.required }),
    cpf: new FormControl('', { nonNullable: true, validators: Validators.required }),
    dataCompra: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  constructor() {
    effect(() => {
      const current = this.titulo();
      this.form.patchValue({
        nomeCliente: current.nomeCliente,
        conta: current.conta,
        cpf: current.cpf,
        dataCompra: current.dataCompra,
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.saved.emit({ ...this.titulo(), ...this.form.getRawValue() });
  }
}
