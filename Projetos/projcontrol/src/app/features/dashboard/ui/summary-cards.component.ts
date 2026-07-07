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
  readonly total = input.required<number>();
  readonly inProgress = input.required<number>();
  readonly completed = input.required<number>();
  readonly overdue = input.required<number>();

  readonly kpis = computed((): KPI[] => [
    { label: 'Total de projetos', value: this.total(), variant: 'default' },
    { label: 'Em andamento', value: this.inProgress(), variant: 'primary' },
    { label: 'Concluídos', value: this.completed(), variant: 'success' },
    { label: 'Atrasados', value: this.overdue(), variant: 'danger' },
  ]);
}
