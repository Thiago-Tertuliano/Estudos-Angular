import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CanComponentDeactivate } from '../../../core/guards/can-deactivate.guard';
import { Proposal, ProposalStatus } from '../data-access/proposal.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ProposalService } from '../data-access/proposal.service';
import { ClientService } from '../../clients/data-access/client.service';
import { ProposalFormComponent } from '../ui/proposal-form.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-proposal-form-page',
  standalone: true,
  imports: [RouterLink, ProposalFormComponent, CardComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>{{ isEdit() ? 'Editar' : 'Nova' }} Proposta</h1>
        <a routerLink="/proposals" class="back-link">Voltar</a>
      </div>
      <app-card headerTitle="Dados da Proposta" [padding]="true">
        <app-proposal-form
          [clients]="clientService.items()"
          [submitting]="submitting()"
          (saved)="onSave($event)"
        />
      </app-card>
    </div>
  `,
  styles: [`
    .page { max-width: 800px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .page-header h1 { margin: 0; font-size: 1.5rem; }
    .back-link { color: #1a1a2e; text-decoration: underline; }
  `],
})
export class ProposalFormPage implements CanComponentDeactivate {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  readonly proposalService = inject(ProposalService);
  readonly clientService = inject(ClientService);

  readonly submitting = signal(false);
  readonly isEdit = signal(false);
  private formSubmitted = false;

  constructor() {
    this.clientService.loadAll();
    this.proposalService.loadAll();
    const id = this.route.snapshot.params['id'];
    this.isEdit.set(!!id);
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.formSubmitted) return true;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Descartar alterações?',
        message: 'Você tem alterações não salvas. Deseja realmente sair?',
        confirmText: 'Descartar',
        cancelText: 'Continuar editando',
        color: 'warn',
      },
    });
    return dialogRef.afterClosed();
  }

  onSave(data: { clientId: number; status: ProposalStatus; discount: number; items: { productId: number; productName: string; quantity: number; unitPrice: number }[] }) {
    this.submitting.set(true);
    const request = this.isEdit()
      ? this.proposalService.update(+this.route.snapshot.params['id'], data)
      : this.proposalService.create(data);

    request.subscribe({
      next: (proposal: Proposal) => {
        this.formSubmitted = true;
        if (!this.isEdit()) {
          this.proposalService.items.update(list => [...list, proposal]);
        }
        this.snackBar.open(`Proposta ${this.isEdit() ? 'atualizada' : 'criada'} com sucesso!`, 'Fechar', { duration: 3000 });
        this.router.navigate(['/proposals']);
      },
      error: () => {
        this.submitting.set(false);
        this.snackBar.open('Erro ao salvar proposta', 'Fechar', { duration: 3000 });
      },
      complete: () => this.submitting.set(false),
    });
  }
}
