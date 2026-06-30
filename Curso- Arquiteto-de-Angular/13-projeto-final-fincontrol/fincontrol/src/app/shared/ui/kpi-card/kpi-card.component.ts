import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

export interface KPI {
  label: string;
  value: number;
  variant: 'default' | 'income' | 'expense';
  format?: 'currency' | 'number';
}

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="kpi" [class]="kpi().variant">
      <span class="label">{{ kpi().label }}</span>
      <strong class="value">
        @if (kpi().format === 'number') {
          {{ kpi().value | number: '1.0-0' }}
        } @else {
          {{ kpi().value | currency: 'BRL' }}
        }
      </strong>
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
    .label { color: var(--color-muted); font-size: 0.875rem; }
    .value { font-size: 1.5rem; }
    .income .value { color: var(--color-income); }
    .expense .value { color: var(--color-expense); }
  `,
})
export class KpiCardComponent {
  readonly kpi = input.required<KPI>();
}
