import { Project } from '@features/projects/data-access/project.model';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
}

export const DEMO_USER: User = {
  id: '1',
  email: 'dev@projcontrol.app',
  name: 'Dev ProjControl',
  avatarUrl: '',
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Portal SISCON',
    description: 'Modernização do portal corporativo com Angular 21',
    status: 'in_progress',
    priority: 'high',
    deadline: '2026-08-15',
    responsible: 'Ana Silva',
  },
  {
    id: 'proj-2',
    name: 'Migração Data Warehouse',
    description: 'ETL svc-transform para novos domínios de receitas e cobrança',
    status: 'planning',
    priority: 'high',
    deadline: '2026-09-30',
    responsible: 'Carlos Mendes',
  },
  {
    id: 'proj-3',
    name: 'App Mobile Sinacor',
    description: 'Cadastro de clientes e consulta de posição em campo',
    status: 'completed',
    priority: 'medium',
    deadline: '2026-05-20',
    responsible: 'Mariana Costa',
  },
  {
    id: 'proj-4',
    name: 'Integração ERP',
    description: 'Conector bidirecional com sistema legado de faturamento',
    status: 'on_hold',
    priority: 'low',
    deadline: '2026-07-01',
    responsible: 'Pedro Alves',
  },
  {
    id: 'proj-5',
    name: 'Dashboard Executivo',
    description: 'KPIs de resultado e alocação para diretoria',
    status: 'in_progress',
    priority: 'medium',
    deadline: '2026-06-25',
    responsible: 'Ana Silva',
  },
];

export class MockDatabase {
  private static projects = [...MOCK_PROJECTS];

  static getProjects(): Project[] {
    return [...this.projects];
  }

  static addProject(project: Project): Project {
    this.projects = [project, ...this.projects];
    return project;
  }

  static deleteProject(id: string): boolean {
    const before = this.projects.length;
    this.projects = this.projects.filter((p) => p.id !== id);
    return this.projects.length < before;
  }
}
