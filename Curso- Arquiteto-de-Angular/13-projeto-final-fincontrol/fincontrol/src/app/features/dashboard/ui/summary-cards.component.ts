import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { KpiCardComponent, KPI } from '@shared/ui/kpi-card/kpi-card.component';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [KpiCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid">
      @for (kpi of kpis(); track kpi.label) {
        <app-kpi-card [kpi]="kpi" />
      }
    </div>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
  `,
})
export class SummaryCardsComponent {
  readonly income = input.required<number>();
  readonly expenses = input.required<number>();
  readonly balance = input.required<number>();
  readonly count = input.required<number>();

  readonly kpis = computed((): KPI[] => [
    { label: 'Receitas', value: this.income(), variant: 'income' },
    { label: 'Despesas', value: this.expenses(), variant: 'expense' },
    { label: 'Saldo', value: this.balance(), variant: 'default' },
    { label: 'Transações', value: this.count(), variant: 'default', format: 'number' },
  ]);
}
