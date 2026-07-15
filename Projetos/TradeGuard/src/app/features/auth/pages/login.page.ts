import { Component } from "@angular/core";
import { LoginFormComponent } from "../ui/login-form.component";

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [LoginFormComponent],
    template: `
        <div class="login-page">
            <div class="card">
                <h1>TradeGuard</h1>
                <p class="subtitle">Sistema de Compliance para Ordens de Investimento</p>

                @if (sessionExpired) {
                    <p class="banner">Sessão expirada. Faça o Login novamente.</p>
                }

                <app-login-form
                    [loading]="loading()"
                    [error]="error()"
                    (submitForm)="onSubmit($evente)"
                />

                <p class="hint">Demo: qualquer e-mail válido + senha com 5+ caracteres.</p>
            </div>
        </div>
    `,
    styles: `
        .login-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: var(--color-bg);
        }

        .card {
            width: 100%;
            max-width: 24rem;
            padding: 2rem;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius);

            h1 {
                margin: 0 0 0.5rem;
                font-size: 1.75rem;
            }
        }

        .subtitle {
            margin: 0 0 1.5rem;
            color: var(--color-muted);
        }

        .banner {
            margin: 0 0 1rem;
            padding: 0.75rem;
            border-radius: var(--radius);
            background: color-mix(in srgb, var(--color-danger) 12%, transparent);
            color: var(--color-danger);
            font-size: 0.875rem;
        }

        .hint {
            margin: 1rem 0 0;
            font-size: 0.875rem;
            color: var(--color-muted);
        }
    `,
})
export class LoginPage {

}