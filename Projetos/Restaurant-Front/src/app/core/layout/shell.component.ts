import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { Component } from "@angular/core";

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="shell">
      <header class="header">
        <strong>Restaurant Front</strong>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/about" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">About</a>
          <a routerLink="/orders" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Orders</a>
        </nav>
      </header>

      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './shell.component.scss',
})
export class ShellComponent {}
