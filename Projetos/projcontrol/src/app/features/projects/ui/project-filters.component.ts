import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectFilters } from '../data-access/project.model';

@Component({
  selector: 'app-project-filters',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filters">
      <input
        type="search"
        placeholder="Buscar por nome ou responsável..."
        [ngModel]="filters().search"
        (ngModelChange)="emit({ search: $event, status: filters().status })"
      />
      <select
        [ngModel]="filters().status"
        (ngModelChange)="emit({ search: filters().search, status: $event })"
      >
        <option value="all">Todos os status</option>
        <option value="planning">Planejamento</option>
        <option value="in_progress">Em andamento</option>
        <option value="completed">Concluído</option>
        <option value="on_hold">Em pausa</option>
      </select>
    </div>
  `,
  styles: `
    .filters {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    input,
    select {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-bg);
      color: var(--color-text);
    }
    input {
      flex: 1;
    }
  `,
})
export class ProjectFiltersComponent {
  readonly filters = input.required<ProjectFilters>();
  readonly filtersChange = output<ProjectFilters>();

  emit(value: ProjectFilters): void {
    this.filtersChange.emit({ ...value });
  }
}
