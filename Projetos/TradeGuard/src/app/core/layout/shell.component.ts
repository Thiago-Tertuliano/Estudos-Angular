import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AuthService } from "../../features/auth/data-access/auth.service";
import { APP_CONFIG } from "../tokens/app-config.token";

@Component({
    selector: 'app-shell',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    template: `
      <div class="shell">
        <aside class="sidebar">
          <div class="brand">{{ appName }}</div>
          <nav class="nav">
            <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">Dashboard</a>
          </nav>
          <div class="sidebar-footer">
            @if (user(); as u) {
              <span class="user-info">{{ u.name }} ({{ u.role }})</span>
            }
            <button class="btn-logout" (click)="logout()">Sair</button>
          </div>
        </aside>
        <main class="content">
          <router-outlet/>
        </main>
      </div>
    `,
    styles: [`
        .shell { display: flex; min-height: 100vh; }
        .sidebar { width: 240px; background: #1a1a2e; color: #eee; display: flex; flex-direction: column; padding: 1.5rem 0; flex-shrink: 0; }
        .brand { font-size: 1.5rem; font-weight: 700; padding: 0 1.5rem 2rem; letter-spacing: -0.02em; color: #e94560; }
        .nav { flex: 1; display: flex; flex-direction: column; gap: 0.25rem; padding: 0 0.75rem; }
        .nav-item { display: block; padding: 0.625rem 0.75rem; border-radius: 8px; color: #ccc; text-decoration: none; font-weight: 500; transition: 0.2s; }
        .nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .nav-item.active { background: #e94560; color: #fff; }
        .sidebar-footer { padding: 1rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.8rem; }
        .user-info { display: block; margin-bottom: 0.5rem; color: #aaa; }
        .btn-logout { background: none; border: 1px solid #e94560; color: #e94560; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; width: 100%; }
        .btn-logout:hover { background: #e94560; color: #fff; }
        .content { flex: 1; padding: 2rem; background: #f5f5f5; overflow-y: auto; }
        @media (max-width: 768px) { .sidebar { width: 60px; } .brand, .user-info, .nav-item { display: none; } }
        `]
})
export class ShellComponent {
    private readonly auth = inject(AuthService);
    readonly appName = inject(APP_CONFIG).appName;
    readonly user = this.auth.currentUser;

    logout() { this.auth.logout(); }
}