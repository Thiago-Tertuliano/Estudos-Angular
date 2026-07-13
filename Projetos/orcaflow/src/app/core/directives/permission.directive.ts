import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from '../../features/auth/data-access/auth.service';

@Directive({
  selector: '[appPermission]',
  standalone: true,
})
export class PermissionDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly vcr = inject(ViewContainerRef);
  private readonly auth = inject(AuthService);

  @Input() set appPermission(requiredRole: string) {
    const user = this.auth.user();
    if (user?.role === requiredRole || user?.role === 'admin') {
      this.vcr.createEmbeddedView(this.templateRef);
    } else {
      this.vcr.clear();
    }
  }
}
