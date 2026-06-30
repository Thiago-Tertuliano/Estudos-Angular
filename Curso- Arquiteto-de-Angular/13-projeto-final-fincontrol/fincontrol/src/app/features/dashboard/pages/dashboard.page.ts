import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DashboardStore } from '../data-access/dashboard.store';
import { SummaryCardsComponent } from '../ui/summary-cards.component';
import { TransactionFacade } from '@features/transactions/data-access/transaction.facade';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [SummaryCardsComponent, RouterLink, CurrencyPipe],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage implements OnInit {
  private readonly store = inject(DashboardStore);
  private readonly facade = inject(TransactionFacade);

  readonly income = this.store.income;
  readonly expenses = this.store.expenses;
  readonly balance = this.store.balance;
  readonly count = this.store.transactionCount;
  readonly loading = this.facade.loading;
  readonly recent = () => this.facade.items().slice(0, 5);

  ngOnInit(): void {
    this.store.load();
  }
}
