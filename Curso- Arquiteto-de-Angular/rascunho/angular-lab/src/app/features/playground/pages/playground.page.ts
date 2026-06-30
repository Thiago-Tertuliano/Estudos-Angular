import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@features/auth/data-access/auth.service';
import { CatalogStore } from '../data-access/catalog.store';
import { CounterComponent } from '../ui/counter.component';
import { CatalogPage } from './catalog.page';

@Component({
  selector: 'app-playground-page',
  standalone: true,
  imports: [CounterComponent, CatalogPage, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <h1>Playground - Curso Completo</h1>
      <button type="button" (click)="logout()">Sair</button>
    </header>

    <section class="kpis">
      <p>Total em estoque: {{ store.totalValue() | currency: 'BRL' }}</p>
      <p>Mais barato: {{ store.cheapest()?.name ?? '—' }}</p>
    </section>

    <section>
      <h2>Counter</h2>
      @defer (on viewport) {
        <app-counter />
      } @placeholder {
        <p>Carregando counter...</p>
      }
    </section>

    <section>
      <app-catalog-page />
    </section>
  `,
})
export class PlaygroundPage {
  private readonly auth = inject(AuthService);
  protected readonly store = inject(CatalogStore);

  logout(): void {
    this.auth.logout();
  }
}
