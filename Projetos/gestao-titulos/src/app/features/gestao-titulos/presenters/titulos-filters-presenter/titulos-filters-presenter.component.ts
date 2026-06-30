import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TituloFiltroDto } from '../../models/dtos/titulo-filtro.dto';

@Component({
  selector: 'app-titulos-filters-presenter',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="filters" [formGroup]="form" (ngSubmit)="submit()">
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
        <button mat-flat-button color="primary" type="submit">Pesquisar</button>
        <button mat-stroked-button type="button" (click)="exportCsv.emit()">Exportar CSV</button>
      </div>
    </form>
  `,
  styles: `
    .filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      align-items: start;
      margin-bottom: 1.5rem;
    }
    .actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      padding-top: 0.25rem;
    }
  `,
})
export class TitulosFiltersPresenterComponent {
  readonly filterSubmit = output<TituloFiltroDto>();
  readonly exportCsv = output<void>();

  readonly form = new FormGroup({
    nomeCliente: new FormControl('', { nonNullable: true }),
    conta: new FormControl('', { nonNullable: true }),
    cpf: new FormControl('', { nonNullable: true }),
    dataCompra: new FormControl('', { nonNullable: true }),
  });

  submit(): void {
    this.filterSubmit.emit(this.form.getRawValue());
  }
}
