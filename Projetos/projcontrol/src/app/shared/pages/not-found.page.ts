import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <a routerLink="/dashboard">Voltar ao dashboard</a>
    </div>
  `,
  styles: `
    .not-found {
      text-align: center;
      padding: 4rem 1rem;
      h1 {
        font-size: 4rem;
        margin: 0;
        color: var(--color-muted);
      }
    }
  `,
})
export class NotFoundPage {}
