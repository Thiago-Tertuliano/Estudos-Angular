import { Component, input } from '@angular/core';
import { PercentPipe } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';

interface Kpi { label: string; value: number | string; variant: string; }

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CardComponent],
  template: `
    <div class="kpi-grid">
      @for (kpi of kpis(); track kpi.label) {
        <app-card [padding]="false">
          <div class="kpi" [class]="'kpi--' + kpi.variant">
            <span class="kpi-label">{{ kpi.label }}</span>
            <span class="kpi-value">{{ kpi.value }}</span>
          </div>
        </app-card>
      }
    </div>
  `,
  styles: [`
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }
    .kpi { padding: 1.5rem; text-align: center; }
    .kpi-label { display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin-bottom: 0.5rem; }
    .kpi-value { display: block; font-size: 1.75rem; font-weight: 700; color: #1a1a2e; }
    .kpi--primary .kpi-value { color: #1a73e8; }
    .kpi--success .kpi-value { color: #2e7d32; }
    .kpi--warn .kpi-value { color: #e94560; }
    .kpi--info .kpi-value { color: #00838f; }
  `],
})
export class SummaryCardsComponent {
  readonly kpis = input.required<Kpi[]>();
}
