import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sinacor-shell',
  standalone: true,
  imports: [MatIconModule, RouterOutlet],
  template: `
    <header class="sinacor-toolbar">
      <div class="toolbar-left">
        <button type="button" class="btn-menu" aria-label="Abrir menu">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="sinacor-logo" aria-hidden="true">[B]³</span>
        <span class="sinacor-brand">Sinacor Renda Fixa</span>
      </div>

      <div class="toolbar-user">
        <mat-icon class="user-icon">account_circle</mat-icon>
        <span class="user-label">EMPRESA [UAT 3099]</span>
      </div>
    </header>

    <main class="sinacor-content">
      <router-outlet />
    </main>

    <footer class="sinacor-footer">
      <span>Copyright © 2026 SINACOR RENDA FIXA</span>
      <span>Versão 22.3.1.1475 / Angular: 21.x</span>
    </footer>
  `,
  styles: `
    .sinacor-toolbar {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      min-height: 40px;
      background: #0a4b8f;
      color: #fff;
    }

    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .btn-menu {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border: none;
      background: transparent;
      color: #fff;
      cursor: pointer;
      padding: 0;
    }

    .btn-menu:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    .btn-menu mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .sinacor-logo {
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.02em;
      flex-shrink: 0;
    }

    .sinacor-brand {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }

    .toolbar-user {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
      background: #1a6bb5;
      padding: 0 14px;
      min-height: 40px;
    }

    .user-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .user-label {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.03em;
      white-space: nowrap;
    }

    .sinacor-content {
      min-height: calc(100vh - 96px);
      background: #f5f5f5;
    }

    .sinacor-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      background: #fff;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #757575;
    }
  `,
})
export class SinacorShellComponent {}
