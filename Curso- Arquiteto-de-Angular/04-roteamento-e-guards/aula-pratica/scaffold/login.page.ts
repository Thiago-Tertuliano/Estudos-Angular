import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// TODO: AuthService, Router

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <!-- TODO: form reativo email + password + submit -->
  `,
})
export class LoginPage {
  // TODO: form + submit chama auth.login e router.navigate
}
