import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TicketFormValue,
  TicketPriority,
  TicketStatus,
} from '../data-access/ticket.model';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="ticket-form">
      <label>
        Título
        <input formControlName="title" placeholder="Resumo do problema" />
      </label>

      <label>
        Descrição
        <textarea
          formControlName="description"
          rows="4"
          placeholder="Detalhes do ticket"
        ></textarea>
      </label>

      <label>
        Status
        <select formControlName="status">
          <option value="open">Aberto</option>
          <option value="in_progress">Em andamento</option>
          <option value="resolved">Resolvido</option>
          <option value="closed">Fechado</option>
        </select>
      </label>

      <label>
        Prioridade
        <select formControlName="priority">
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
          <option value="critical">Crítica</option>
        </select>
      </label>

      <label>
        Solicitante
        <input formControlName="requesterName" placeholder="Nome do solicitante" />
      </label>

      <button type="submit" [disabled]="form.invalid || submitting()">
        {{ submitting() ? 'Salvando...' : 'Salvar' }}
      </button>
    </form>
  `,
  styles: `
    .ticket-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 32rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      font-size: 0.875rem;
    }

    input,
    select,
    textarea {
      padding: 0.625rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-bg);
      color: var(--color-text);
    }

    button {
      align-self: flex-start;
      padding: 0.75rem 1.25rem;
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: var(--radius);
      font-weight: 600;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  `,
})
export class TicketFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly submitting = input(false);
  readonly initialValue = input<TicketFormValue | null>(null);
  readonly submitForm = output<TicketFormValue>();

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    status: ['open' as TicketStatus, Validators.required],
    priority: ['medium' as TicketPriority, Validators.required],
    requesterName: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const value = this.initialValue();
      if (value) {
        this.form.patchValue(value);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitForm.emit(this.form.getRawValue());
  }
}
