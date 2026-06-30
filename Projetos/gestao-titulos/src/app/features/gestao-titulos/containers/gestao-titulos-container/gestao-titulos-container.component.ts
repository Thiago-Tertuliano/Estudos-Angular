import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TituloFiltroDto } from '../../models/dtos/titulo-filtro.dto';
import { Titulo } from '../../models/titulo.model';
import { TituloEditPresenterComponent } from '../../presenters/titulo-edit-presenter/titulo-edit-presenter.component';
import { TitulosFiltersPresenterComponent } from '../../presenters/titulos-filters-presenter/titulos-filters-presenter.component';
import { TitulosTablePresenterComponent } from '../../presenters/titulos-table-presenter/titulos-table-presenter.component';
import { TituloService } from '../../services/titulo.service';
import { exportTitulosToCsv } from '../../shared/utils/csv-export.util';
import { TituloStateService } from '../../state/titulo-state.service';

@Component({
  selector: 'app-gestao-titulos-container',
  standalone: true,
  providers: [TituloService],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    TitulosFiltersPresenterComponent,
    TitulosTablePresenterComponent,
    TituloEditPresenterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-toolbar color="primary">
      <span>Sinacor Eleva Cloud — Gestão de Títulos</span>
    </mat-toolbar>

    <main class="content">
      <mat-card>
        <mat-card-content>
          <app-titulos-filters-presenter
            (filterSubmit)="handleFilter($event)"
            (exportCsv)="handleExport()"
          />

          @if (state.loading()) {
            <div class="loading">
              <mat-spinner diameter="40" />
              <span>Carregando...</span>
            </div>
          }

          @if (state.errorMessage(); as message) {
            <p class="error">{{ message }}</p>
          }

          @if (!state.loading()) {
            <app-titulos-table-presenter
              [titulos]="state.data()"
              (editTitulo)="editingTitulo.set($event)"
            />
          }

          @if (editingTitulo(); as titulo) {
            <app-titulo-edit-presenter
              [titulo]="titulo"
              (saved)="handleSave($event)"
              (cancelled)="editingTitulo.set(null)"
            />
          }
        </mat-card-content>
      </mat-card>
    </main>
  `,
  styles: `
    .content {
      padding: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .loading {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1rem 0;
    }
    .error {
      color: #c62828;
      margin: 1rem 0;
    }
  `,
})
export class GestaoTitulosContainerComponent implements OnInit {
  private readonly tituloService = inject(TituloService);
  protected readonly state = inject(TituloStateService);

  readonly editingTitulo = signal<Titulo | null>(null);

  ngOnInit(): void {
    void this.tituloService.loadTitulos();
  }

  handleFilter(filtros: TituloFiltroDto): void {
    void this.tituloService.loadTitulos(filtros);
  }

  handleExport(): void {
    exportTitulosToCsv(this.state.data());
  }

  handleSave(titulo: Titulo): void {
    this.tituloService.updateTitulo(titulo);
    this.editingTitulo.set(null);
  }
}
