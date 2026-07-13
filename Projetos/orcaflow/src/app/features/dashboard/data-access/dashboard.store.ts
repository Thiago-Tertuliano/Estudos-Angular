import { Injectable, inject, computed } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ClientService } from '../../clients/data-access/client.service';
import { ProductService } from '../../products/data-access/product.service';
import { ProposalService } from '../../proposals/data-access/proposal.service';

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  private readonly clientService = inject(ClientService);
  private readonly productService = inject(ProductService);
  private readonly proposalService = inject(ProposalService);

  readonly totalClients = computed(() => this.clientService.items().length);
  readonly totalProducts = computed(() => this.productService.items().filter(p => p.active).length);
  readonly totalProposals = computed(() => this.proposalService.items().length);
  readonly approvedProposals = computed(() => this.proposalService.items().filter(p => p.status === 'approved').length);
  readonly draftProposals = computed(() => this.proposalService.items().filter(p => p.status === 'draft').length);

  readonly totalValue = computed(() => {
    return this.proposalService.items()
      .filter(p => p.status === 'approved' || p.status === 'sent')
      .reduce((sum, p) => {
        const itemsTotal = p.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
        return sum + itemsTotal - (p.discount || 0);
      }, 0);
  });

  readonly conversionRate = computed(() => {
    if (this.totalProposals() === 0) return 0;
    return Math.round((this.approvedProposals() / this.totalProposals()) * 100);
  });

  readonly loading = computed(() =>
    this.clientService.loading() || this.productService.loading() || this.proposalService.loading(),
  );

  loadAll() {
    forkJoin({
      clients: this.clientService.loadAll,
      products: this.productService.loadAll,
      proposals: this.proposalService.loadAll,
    }).subscribe();
  }
}
