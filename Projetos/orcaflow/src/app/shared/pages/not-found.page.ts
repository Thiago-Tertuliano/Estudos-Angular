import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Página não encontrada</p>
      <a routerLink="/dashboard">Voltar ao Dashboard</a>
    </div>
  `,
  styles: [`
    .not-found { text-align: center; padding: 4rem 1rem; }
    .not-found h1 { font-size: 5rem; margin: 0; color: #e94560; font-weight: 800; }
    .not-found p { font-size: 1.25rem; color: #666; margin: 0.5rem 0 2rem; }
    .not-found a { color: #1a1a2e; text-decoration: underline; font-weight: 500; }
  `],
})
export class NotFoundPage {}
