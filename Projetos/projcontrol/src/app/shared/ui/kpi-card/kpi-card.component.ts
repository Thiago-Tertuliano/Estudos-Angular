import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

export interface KPI {
  label: string;
  value: number;
  variant: 'default' | 'success' | 'warning' | 'danger' | 'primary';
}

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="kpi" [class]="kpi().variant">
      <span class="label">{{ kpi().label }}</span>
      <strong class="value">{{ kpi().value | number: '1.0-0' }}</strong>
    </article>
  `,
  styles: `
    .kpi {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .label {
      color: var(--color-muted);
      font-size: 0.875rem;
    }
    .value {
      font-size: 1.5rem;
    }
    .success .value {
      color: var(--color-success);
    }
    .warning .value {
      color: var(--color-warning);
    }
    .danger .value {
      color: var(--color-danger);
    }
    .primary .value {
      color: var(--color-primary);
    }
  `,
})
export class KpiCardComponent {
  readonly kpi = input.required<KPI>();
}
