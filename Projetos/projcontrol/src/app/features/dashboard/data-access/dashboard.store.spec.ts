import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { DashboardStore } from './dashboard.store';
import { ProjectFacade } from '@features/projects/data-access/project.facade';

describe('DashboardStore', () => {
  it('deve calcular KPIs de projetos', () => {
    const items = signal([
      {
        id: '1',
        name: 'A',
        description: 'Desc',
        status: 'in_progress' as const,
        priority: 'high' as const,
        deadline: '2026-12-01',
        responsible: 'Ana',
      },
      {
        id: '2',
        name: 'B',
        description: 'Desc',
        status: 'completed' as const,
        priority: 'low' as const,
        deadline: '2026-12-01',
        responsible: 'Bob',
      },
      {
        id: '3',
        name: 'C',
        description: 'Desc',
        status: 'planning' as const,
        priority: 'medium' as const,
        deadline: '2020-01-01',
        responsible: 'Carlos',
      },
    ]);

    TestBed.configureTestingModule({
      providers: [DashboardStore, { provide: ProjectFacade, useValue: { items } }],
    });

    const store = TestBed.inject(DashboardStore);
    expect(store.total()).toBe(3);
    expect(store.inProgress()).toBe(1);
    expect(store.completed()).toBe(1);
    expect(store.overdue()).toBe(1);
  });
});
