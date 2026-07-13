import { Component, input } from "@angular/core";

@Component({
    selector: 'app-empty-state',
    standalone: true,
    template: `
        <div class="empty">
        <p>{{ message() }}</p>
        </div>
    `,
})
export class EmptyStateComponent {
    readonly message = input('Nenhum item encontrado');
}