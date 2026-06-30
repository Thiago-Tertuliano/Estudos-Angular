import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface KPI {
  label: string;
  value: number;
  trend: 'up' | 'down' | 'flat';
}

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="kpi" [class.up]="kpi().trend === 'up'" [class.down]="kpi().trend === 'down'">
      <span class="label">{{ kpi().label }}</span>
      <strong class="value">{{ kpi().value | number: '1.2-2' }}</strong>
    </article>
  `,
  styles: `
    .up .value { color: #27ae60; }
    .down .value { color: #c0392b; }
  `,
})
export class KpiCardComponent {
  readonly kpi = input.required<KPI>();
}

// Pai deve passar NOVO objeto quando KPI mudar:
// this.kpi.set({ ...this.kpi(), value: newValue });
