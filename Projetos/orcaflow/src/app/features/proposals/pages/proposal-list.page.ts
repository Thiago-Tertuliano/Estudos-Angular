import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProposalService } from '../data-access/proposal.service';
import { ProposalTableComponent } from '../ui/proposal-table.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-proposal-list-page',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ProposalTableComponent, CardComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>Propostas</h1>
        <a mat-raised-button color="primary" routerLink="/proposals/new">Nova Proposta</a>
      </div>

      <app-card [padding]="false">
        @if (service.loading()) {
          <div class="loading">Carregando...</div>
        } @else {
          <app-proposal-table [proposals]="service.items()" />
        }
      </app-card>
    </div>
  `,
  styles: [`
    .page { max-width: 1000px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .page-header h1 { margin: 0; font-size: 1.5rem; color: #1a1a2e; }
    .loading { text-align: center; padding: 2rem; color: #888; }
  `],
})
export class ProposalListPage {
  readonly service = inject(ProposalService);
  constructor() { this.service.loadAll(); }
}
