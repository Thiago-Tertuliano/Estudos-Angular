import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@features/auth/data-access/auth.service';
import { APP_CONFIG } from '@core/tokens/app-config.token';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  private readonly auth = inject(AuthService);
  private readonly config = inject(APP_CONFIG);

  readonly appName = this.config.appName;
  readonly user = this.auth.currentUser;

  logout(): void {
    this.auth.logout();
  }
}
