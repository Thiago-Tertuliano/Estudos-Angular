export type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'on_hold';
export type ProjectPriority = 'low' | 'medium' | 'high';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  deadline: string;
  responsible: string;
}

export interface ProjectFilters {
  search: string;
  status: 'all' | ProjectStatus;
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: 'Planejamento',
  in_progress: 'Em andamento',
  completed: 'Concluído',
  on_hold: 'Em pausa',
};

export const PROJECT_PRIORITY_LABELS: Record<ProjectPriority, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};
