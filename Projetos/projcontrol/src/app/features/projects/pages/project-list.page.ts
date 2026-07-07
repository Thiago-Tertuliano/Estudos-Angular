import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProjectFacade } from '../data-access/project.facade';
import { ProjectFilters } from '../data-access/project.model';
import { ProjectFiltersComponent } from '../ui/project-filters.component';
import { ProjectTableComponent } from '../ui/project-table.component';
import { ProjectFormComponent, ProjectFormValue } from '../ui/project-form.component';

@Component({
  selector: 'app-project-list-page',
  standalone: true,
  imports: [ProjectFiltersComponent, ProjectTableComponent, ProjectFormComponent],
  templateUrl: './project-list.page.html',
})
export class ProjectListPage implements OnInit {
  private readonly facade = inject(ProjectFacade);

  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly filters = signal<ProjectFilters>({ search: '', status: 'all' });

  readonly filteredProjects = computed(() => {
    const { search, status } = this.filters();
    const term = search.toLowerCase();
    return this.facade.items().filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(term) ||
        p.responsible.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      const matchStatus = status === 'all' || p.status === status;
      return matchSearch && matchStatus;
    });
  });

  ngOnInit(): void {
    this.facade.loadAll();
  }

  onFiltersChange(filters: ProjectFilters): void {
    this.filters.set(filters);
  }

  onSave(value: ProjectFormValue): void {
    this.facade.create(value);
  }

  onDelete(id: string): void {
    this.facade.delete(id);
  }
}
