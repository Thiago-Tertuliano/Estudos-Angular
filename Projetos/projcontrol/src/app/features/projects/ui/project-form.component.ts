import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectPriority, ProjectStatus } from '../data-access/project.model';

export interface ProjectFormValue {
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  deadline: string;
  responsible: string;
}

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="project-form">
      <input formControlName="name" placeholder="Nome do projeto" />
      <input formControlName="description" placeholder="Descrição" />
      <select formControlName="status">
        <option value="planning">Planejamento</option>
        <option value="in_progress">Em andamento</option>
        <option value="completed">Concluído</option>
        <option value="on_hold">Em pausa</option>
      </select>
      <select formControlName="priority">
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>
      <input type="date" formControlName="deadline" />
      <input formControlName="responsible" placeholder="Responsável" />
      <button type="submit" [disabled]="form.invalid || submitting()">Adicionar</button>
    </form>
  `,
  styles: `
    .project-form {
      display: grid;
      grid-template-columns: 1.5fr 2fr 1fr 1fr 1fr 1fr auto;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    input,
    select,
    button {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-bg);
      color: var(--color-text);
    }
    button {
      background: var(--color-primary);
      color: white;
      border: none;
      font-weight: 600;
      &:disabled {
        opacity: 0.5;
      }
    }
    @media (max-width: 1100px) {
      .project-form {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class ProjectFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly submitting = input(false);
  readonly saved = output<ProjectFormValue>();

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    status: ['planning' as const, Validators.required],
    priority: ['medium' as const, Validators.required],
    deadline: [new Date().toISOString().slice(0, 10), Validators.required],
    responsible: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saved.emit(this.form.getRawValue());
    this.form.patchValue({ name: '', description: '', responsible: '' });
  }
}
