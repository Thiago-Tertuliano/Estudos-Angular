import { Injectable, computed, inject } from '@angular/core';
import { ProjectFacade } from '@features/projects/data-access/project.facade';

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  private readonly facade = inject(ProjectFacade);

  readonly projects = this.facade.items;

  readonly total = computed(() => this.projects().length);

  readonly inProgress = computed(
    () => this.projects().filter((p) => p.status === 'in_progress').length,
  );

  readonly completed = computed(
    () => this.projects().filter((p) => p.status === 'completed').length,
  );

  readonly overdue = computed(() =>
    this.projects().filter((p) => this.isOverdue(p.deadline, p.status)).length,
  );

  load(): void {
    this.facade.loadAll();
  }

  private isOverdue(deadline: string, status: string): boolean {
    if (status === 'completed') {
      return false;
    }
    const today = new Date().toISOString().slice(0, 10);
    return deadline < today;
  }
}
