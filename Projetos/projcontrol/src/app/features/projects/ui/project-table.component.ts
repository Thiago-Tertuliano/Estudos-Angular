import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  PROJECT_PRIORITY_LABELS,
  PROJECT_STATUS_LABELS,
  Project,
} from '../data-access/project.model';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-project-table',
  standalone: true,
  imports: [DatePipe, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <p>Carregando...</p>
    } @else if (!projects().length) {
      <app-empty-state
        title="Nenhum projeto"
        message="Adicione seu primeiro projeto usando o formulário acima."
      />
    } @else {
      <table>
        <thead>
          <tr>
            <th>Projeto</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Prazo</th>
            <th>Responsável</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          @for (project of projects(); track project.id) {
            <tr [class.overdue]="isOverdue(project)">
              <td>
                <strong>{{ project.name }}</strong>
                <span class="desc">{{ project.description }}</span>
              </td>
              <td>
                <span class="badge" [class]="project.status">
                  {{ statusLabels[project.status] }}
                </span>
              </td>
              <td>
                <span class="priority" [class]="project.priority">
                  {{ priorityLabels[project.priority] }}
                </span>
              </td>
              <td>{{ project.deadline | date: 'dd/MM/yyyy' }}</td>
              <td>{{ project.responsible }}</td>
              <td>
                <button type="button" class="danger" (click)="delete.emit(project.id)">
                  Excluir
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styles: `
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
      vertical-align: top;
    }
    th {
      color: var(--color-muted);
      font-size: 0.75rem;
      text-transform: uppercase;
    }
    .desc {
      display: block;
      font-size: 0.8125rem;
      color: var(--color-muted);
      margin-top: 0.25rem;
    }
    .badge {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      border-radius: 999px;
      font-size: 0.75rem;
      background: rgba(139, 156, 179, 0.2);
    }
    .badge.in_progress {
      background: rgba(21, 101, 192, 0.2);
      color: #64b5f6;
    }
    .badge.completed {
      background: rgba(34, 197, 94, 0.2);
      color: var(--color-success);
    }
    .badge.on_hold {
      background: rgba(245, 158, 11, 0.2);
      color: var(--color-warning);
    }
    .priority.high {
      color: var(--color-danger);
    }
    .priority.medium {
      color: var(--color-warning);
    }
    .overdue td:nth-child(4) {
      color: var(--color-danger);
    }
    .danger {
      background: transparent;
      border: 1px solid var(--color-danger);
      color: var(--color-danger);
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius);
      font-size: 0.75rem;
    }
  `,
})
export class ProjectTableComponent {
  readonly projects = input.required<Project[]>();
  readonly loading = input(false);
  readonly delete = output<string>();

  readonly statusLabels = PROJECT_STATUS_LABELS;
  readonly priorityLabels = PROJECT_PRIORITY_LABELS;

  isOverdue(project: Project): boolean {
    if (project.status === 'completed') {
      return false;
    }
    const today = new Date().toISOString().slice(0, 10);
    return project.deadline < today;
  }
}
