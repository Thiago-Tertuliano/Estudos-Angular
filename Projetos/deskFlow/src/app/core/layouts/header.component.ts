import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@features/auth/data-access/auth.service';
import { APP_CONFIG } from '@core/tokens/app-config.token';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly auth = inject(AuthService);
  private readonly config = inject(APP_CONFIG);

  readonly appName = this.config.appName;
  readonly user = this.auth.currentUser;

  logout(): void {
    this.auth.logout();
  }
}
