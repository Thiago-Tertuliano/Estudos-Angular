import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardStore } from '../data-access/dashboard.store';
import { SummaryCardsComponent } from '../ui/summary-cards.component';
import { ProjectFacade } from '@features/projects/data-access/project.facade';
import { PROJECT_STATUS_LABELS } from '@features/projects/data-access/project.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [SummaryCardsComponent, RouterLink, DatePipe],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage implements OnInit {
  private readonly store = inject(DashboardStore);
  private readonly facade = inject(ProjectFacade);

  readonly total = this.store.total;
  readonly inProgress = this.store.inProgress;
  readonly completed = this.store.completed;
  readonly overdue = this.store.overdue;
  readonly loading = this.facade.loading;
  readonly recent = () => this.facade.items().slice(0, 5);

  readonly statusLabels = PROJECT_STATUS_LABELS;

  ngOnInit(): void {
    this.store.load();
  }

  isOverdue(deadline: string, status: string): boolean {
    if (status === 'completed') {
      return false;
    }
    const today = new Date().toISOString().slice(0, 10);
    return deadline < today;
  }
}
