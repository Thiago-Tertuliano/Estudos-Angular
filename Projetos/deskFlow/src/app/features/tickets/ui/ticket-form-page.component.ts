import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketFormValue } from '../data-access/ticket.model';
import { TicketService } from '../data-access/ticket.service';
import { TicketFormComponent } from './ticket-form.component';

@Component({
  selector: 'app-ticket-form-page',
  standalone: true,
  imports: [TicketFormComponent, RouterLink],
  templateUrl: './ticket-form.page.html',
})
export class TicketFormPage implements OnInit {
  private readonly tickets = inject(TicketService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly initialValue = signal<TicketFormValue | null>(null);
  readonly isEdit = computed(() => !!this.ticketId());

  private readonly ticketId = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ticketId.set(id);
      this.loadTicket(id);
    }
  }

  onSubmit(value: TicketFormValue): void {
    this.loading.set(true);
    this.error.set(null);

    const id = this.ticketId();
    const request$ = id
      ? this.tickets.update(id, value)
      : this.tickets.create(value);

    request$.subscribe({
      next: () => this.router.navigate(['/tickets']),
      error: (err: { message: string }) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  private loadTicket(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.tickets.getById(id).subscribe({
      next: (ticket) => {
        this.initialValue.set({
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          priority: ticket.priority,
          requesterName: ticket.requesterName,
        });
        this.loading.set(false);
      },
      error: (err: { message: string }) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }
}
