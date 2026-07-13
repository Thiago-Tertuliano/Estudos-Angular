import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketFilters } from '../data-access/ticket.model';
import { TicketService } from '../data-access/ticket.service';
import { TicketFiltersComponent } from '../ui/tickets-filters.component';
import { TicketTableComponent } from '../ui/ticket-table.component';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-ticket-list-page',
  standalone: true,
  imports: [RouterLink, TicketFiltersComponent, TicketTableComponent, EmptyStateComponent],
  templateUrl: './ticket-list.page.html',
})
export class TicketListPage implements OnInit {
  private readonly ticketService = inject(TicketService);

  readonly loading = this.ticketService.loading;
  readonly error = this.ticketService.error;
  readonly filters = signal<TicketFilters>({
    search: '',
    status: 'all',
    priority: 'all',
  });

  readonly filteredTickets = computed(() => {
    const { search, status, priority } = this.filters();
    const term = search.toLowerCase();

    return this.ticketService.items().filter((ticket) => {
      const matchSearch =
        ticket.title.toLowerCase().includes(term) ||
        ticket.requesterName.toLowerCase().includes(term);
      const matchStatus = status === 'all' || ticket.status === status;
      const matchPriority = priority === 'all' || ticket.priority === priority;

      return matchSearch && matchStatus && matchPriority;
    });
  });

  ngOnInit(): void {
    this.ticketService.loadAll();
  }

  onFiltersChange(value: TicketFilters): void {
    this.filters.set(value);
  }
}
