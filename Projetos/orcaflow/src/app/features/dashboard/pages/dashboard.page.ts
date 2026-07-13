import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardStore } from '../data-access/dashboard.store';
import { SummaryCardsComponent } from '../ui/summary-cards.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, SummaryCardsComponent, CardComponent],
  template: `
    <div class="dashboard">
      <div class="page-header">
        <h1>Dashboard</h1>
      </div>

      @if (store.loading()) {
        <div class="loading">Carregando...</div>
      } @else {
        <app-summary-cards [kpis]="kpiData" />

        <div class="dashboard-grid" style="margin-top: 2rem;">
          <app-card headerTitle="Propostas Recentes" [padding]="true" style="grid-column: 1 / -1;">
            <div class="proposal-summary">
              <div class="stat"><span class="stat-label">Total</span><span class="stat-value">{{ store.totalProposals() }}</span></div>
              <div class="stat"><span class="stat-label">Aprovadas</span><span class="stat-value" style="color:#2e7d32">{{ store.approvedProposals() }}</span></div>
              <div class="stat"><span class="stat-label">Rascunho</span><span class="stat-value" style="color:#e94560">{{ store.draftProposals() }}</span></div>
              <div class="stat"><span class="stat-label">Taxa Conversão</span><span class="stat-value">{{ store.conversionRate() }}%</span></div>
            </div>
            <a routerLink="/proposals" class="link">Ver todas as propostas →</a>
          </app-card>
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard { max-width: 1000px; margin: 0 auto; }
    .page-header { margin-bottom: 1.5rem; }
    .page-header h1 { margin: 0; font-size: 1.5rem; color: #1a1a2e; }
    .loading { text-align: center; padding: 3rem; color: #888; }
    .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .proposal-summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1rem; }
    .stat { text-align: center; }
    .stat-label { display: block; font-size: 0.75rem; text-transform: uppercase; color: #888; letter-spacing: 0.05em; }
    .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: #1a1a2e; margin-top: 0.25rem; }
    .link { color: #1a73e8; text-decoration: none; font-size: 0.875rem; display: inline-block; margin-top: 0.5rem; }
  `],
})
export class DashboardPage implements OnInit {
  readonly store = inject(DashboardStore);

  readonly kpiData = [
    { label: 'Clientes', value: this.store.totalClients(), variant: 'primary' },
    { label: 'Produtos Ativos', value: this.store.totalProducts(), variant: 'info' },
    { label: 'Propostas', value: this.store.totalProposals(), variant: '' },
    { label: 'Valor Total (aprovadas)', value: this.store.totalValue(), variant: 'success' },
  ];

  ngOnInit() {
    this.store.loadAll();
  }
}
