import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../data-access/client.service';
import { ClientTableComponent } from '../ui/client-table.component';
import { ClientFormComponent } from '../ui/client-form.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-client-list-page',
  standalone: true,
  imports: [ClientTableComponent, ClientFormComponent, CardComponent],
  template: `
    <div class="page">
      <div class="page-header"><h1>Clientes</h1></div>

      <app-card headerTitle="Novo Cliente" [padding]="true">
        <app-client-form (saved)="onCreate($event)" />
      </app-card>

      <app-card headerTitle="Clientes Cadastrados" [padding]="false" style="margin-top:1.5rem">
        @if (service.loading()) {
          <div class="loading">Carregando...</div>
        } @else {
          <app-client-table [clients]="service.items()" />
        }
      </app-card>
    </div>
  `,
  styles: [`
    .page { max-width: 900px; margin: 0 auto; }
    .page-header { margin-bottom: 1.5rem; }
    .page-header h1 { margin: 0; font-size: 1.5rem; color: #1a1a2e; }
    .loading { text-align: center; padding: 2rem; color: #888; }
  `],
})
export class ClientListPage {
  readonly service = inject(ClientService);
  private readonly snackBar = inject(MatSnackBar);

  constructor() { this.service.loadAll(); }

  onCreate(data: any) {
    this.service.create(data).subscribe({
      next: (client) => {
        this.service.items.update(list => [...list, client]);
        this.snackBar.open('Cliente criado com sucesso!', 'Fechar', { duration: 3000 });
      },
      error: () => this.snackBar.open('Erro ao criar cliente', 'Fechar', { duration: 3000 }),
    });
  }
}
