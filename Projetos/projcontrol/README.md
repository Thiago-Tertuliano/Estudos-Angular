# ProjControl — Gestão de Projetos e Tarefas

> Projeto para consolidar TODOS os padrões de arquitetura Angular que você já estudou.

## Stack

| Tecnologia | Versão |
|------------|--------|
| Angular | 21+ |
| Standalone Components | Sim |
| Signals + computed | Sim |
| RxJS | Sim |
| Angular Material | Sim |
| Reactive Forms | Sim |
| Vitest | Sim |
| SCSS | Sim |

---

## Sumário

1. [Entidades e Features](#1-entidades-e-features)
2. [Arquitetura](#2-arquitetura)
3. [Setup Inicial](#3-setup-inicial)
4. [Roadmap de Desenvolvimento (8 etapas)](#4-roadmap-de-desenvolvimento)
5. [Tabela de Referência](#5-tabela-de-referência)
6. [Checklist Final](#6-checklist-final)

---

## 1. Entidades e Features

### Entidades

```
┌──────────────────────────────────────────────────┐
│                    Projeto                        │
├──────────────────────────────────────────────────┤
│ id: number                                       │
│ name: string                                     │
│ description: string                              │
│ status: 'pending' | 'in_progress' | 'done' | 'cancelled' │
│ priority: 'low' | 'medium' | 'high'              │
│ createdAt: string (ISO)                          │
│ dueDate: string (ISO)                            │
└──────────────────────────────────────────────────┘
          │ 1
          │
          │ N
          ▼
┌──────────────────────────────────────────────────┐
│                     Task                          │
├──────────────────────────────────────────────────┤
│ id: number                                       │
│ projectId: number                                │
│ title: string                                    │
│ description: string                              │
│ status: 'todo' | 'in_progress' | 'done'          │
│ priority: 'low' | 'medium' | 'high'              │
│ createdAt: string (ISO)                          │
│ assignedTo: string                               │
└──────────────────────────────────────────────────┘
```

### Features por Rota

| Rota | Feature | Página Smart |
|------|---------|-------------|
| `/login` | Auth | `LoginPage` |
| `/dashboard` | Dashboard | `DashboardPage` |
| `/projects` | Listar projetos | `ProjectListPage` |
| `/projects/new` | Criar projeto | `ProjectFormPage` |
| `/projects/:id` | Detalhe do projeto | `ProjectDetailPage` |
| `/projects/:id/edit` | Editar projeto | `ProjectFormPage` (reutiliza) |
| `/projects/:id/tasks` | Tarefas do projeto | `TaskListPage` |
| `/projects/:id/tasks/new` | Nova tarefa | `TaskFormPage` |
| `**` | 404 | `NotFoundPage` |

> Guards: `/login` usa `guestGuard`; todas as outras usam `authGuard`.

---

## 2. Arquitetura

### Estrutura de Pastas (O QUE criar)

```
src/app/
├── core/                              ← Infraestrutura compartilhada
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── guest.guard.ts
│   ├── interceptors/
│   │   ├── mock-api.interceptor.ts
│   │   ├── auth.interceptor.ts
│   │   └── error.interceptor.ts
│   ├── layout/
│   │   ├── shell.component.ts
│   │   └── shell.component.html
│   └── tokens/
│       └── app-config.token.ts
│
├── features/
│   ├── auth/
│   │   ├── data-access/
│   │   │   └── auth.service.ts
│   │   └── pages/
│   │       └── login.page.ts
│   │
│   ├── dashboard/
│   │   ├── data-access/
│   │   │   └── dashboard.store.ts
│   │   ├── pages/
│   │   │   └── dashboard.page.ts
│   │   └── ui/
│   │       └── summary-cards.component.ts
│   │
│   └── projects/                      ← Feature com lazy load
│       ├── pages/
│       │   ├── project-list.page.ts
│       │   ├── project-form.page.ts
│       │   └── project-detail.page.ts
│       ├── ui/
│       │   ├── project-table.component.ts
│       │   ├── project-form.component.ts
│       │   ├── project-filters.component.ts
│       │   ├── task-list.component.ts
│       │   └── task-form.component.ts
│       ├── data-access/
│       │   ├── project.model.ts
│       │   ├── task.model.ts
│       │   ├── project-api.service.ts
│       │   ├── project.facade.ts
│       │   ├── task-api.service.ts
│       │   └── task.facade.ts
│       └── projects.routes.ts
│
└── shared/
    ├── pages/
    │   └── not-found.page.ts
    └── ui/
        └── empty-state.component.ts
```

### Fluxo de Dados (COMO conectar)

```
┌──────────────┐     input()      ┌──────────────────┐
│   Smart      │ ──────────────►  │     Dumb         │
│  (Page)      │                  │  (Component)     │
│              │ ◄────────────── │                  │
│ injeta       │     output()     │ OnPush           │
│ facade       │                  │ input.required   │
│ signals      │                  │ output()         │
│ computed     │                  │ sem services     │
└──────┬───────┘                  └──────────────────┘
       │
       │ chama métodos
       ▼
┌──────────────────────────────────────────────────┐
│                  Facade                           │
│  orquestra API + state + signals                 │
│                                                   │
│  - items = signal<T[]>                            │
│  - loading = signal<boolean>                      │
│  - error = signal<string | null>                  │
│  - loadAll(), create(), update(), delete()        │
└──────┬───────────────────────────────────────────┘
       │
       │ chama
       ▼
┌──────────────────────────────────────────────────┐
│               ApiService                          │
│  HttpClient puro — monta URL, retorna Observable  │
└──────────────────────────────────────────────────┘

INTERCEPTORS (ordem no array):
  mockApi → auth → error
  (mock short-circuita; auth adiciona token; error trata falha)
```

### Árvore de Componentes

```
AppComponent
└── ShellComponent (layout: sidebar + router-outlet)
    ├── LoginPage (guestGuard)
    ├── DashboardPage (authGuard)
    │   └── SummaryCardsComponent (dumb)
    ├── ProjectListPage (authGuard)
    │   ├── ProjectFiltersComponent (dumb)
    │   └── ProjectTableComponent (dumb)
    ├── ProjectFormPage (authGuard)
    │   └── ProjectFormComponent (dumb)
    ├── ProjectDetailPage (authGuard)
    │   └── TaskListComponent (dumb)
    │   └── TaskFormComponent (dumb)
    └── NotFoundPage
```

---

## 3. Setup Inicial

```bash
# 1. Criar o projeto
ng new proj-control --standalone --routing --style=scss --ssr=false

# 2. Entrar na pasta
cd proj-control

# 3. Adicionar Angular Material
ng add @angular/material

# 4. Adicionar Vitest (se quiser testes)
npm install -D @analogjs/vitest-angular vitest @testing-library/angular

# 5. (opcional) Colocar na pasta de projetos
# Copie a pasta proj-control para:
# D:\...\Estudos-AngularJS\Projetos\ProjControl\
```

> **Dica:** O nome da pasta é `proj-control` (kebab-case). O `ng new` já cria o workspace.

### app.config.ts (guia do que configurar)

```typescript
// Comece vazio, adicione conforme avança nas etapas:
provideHttpClient(
  withInterceptors([mockApiInterceptor, authInterceptor, errorInterceptor])
),
withComponentInputBinding(),  // no provideRouter
provideAnimationsAsync(),     // do Angular Material
```

---

## 4. Roadmap de Desenvolvimento

Cada etapa tem: **O QUE fazer** → **ONDE olhar** nos seus projetos anteriores.

---

### Etapa 1: Setup e Core Structure

**Objetivo:** Criar a estrutura de pastas, configs, tokens.

| O que fazer | Arquivos para criar |
|-------------|-------------------|
| Criar pastas `core/`, `features/`, `shared/` | - |
| Criar `APP_CONFIG` com `apiUrl`, `appName`, `production` | `core/tokens/app-config.token.ts` |
| Criar `mock-data.ts` com dados fake de projetos e tarefas | `core/interceptors/mock-data.ts` |
| Criar `mock-api.interceptor.ts` com rotas mock | `core/interceptors/mock-api.interceptor.ts` |
| Criar `app.routes.ts` com rotas vazias (só projects lazy) | `app.routes.ts` |
| Configurar `app.config.ts` | `app.config.ts` |

**Mock data sugerido:**

```typescript
// core/interceptors/mock-data.ts
export const MOCK_PROJECTS: Project[] = [
  { id: 1, name: 'App Mobile', description: 'App para iOS/Android', status: 'in_progress', priority: 'high', createdAt: '2026-01-15', dueDate: '2026-08-15' },
  { id: 2, name: 'Migração Cloud', description: 'Migrar servidores para AWS', status: 'pending', priority: 'medium', createdAt: '2026-03-01', dueDate: '2026-12-01' },
  { id: 3, name: 'Dashboard Vendas', description: 'Dashboard de indicadores', status: 'done', priority: 'low', createdAt: '2025-11-01', dueDate: '2026-02-28' },
];

export const MOCK_TASKS: Task[] = [
  { id: 1, projectId: 1, title: 'Tela de login', description: 'Criar tela de autenticação', status: 'done', priority: 'high', createdAt: '2026-01-20', assignedTo: 'Thiago' },
  { id: 2, projectId: 1, title: 'API de usuários', description: 'Endpoints CRUD', status: 'in_progress', priority: 'high', createdAt: '2026-02-01', assignedTo: 'Ana' },
  { id: 3, projectId: 2, title: 'Setup AWS', description: 'Configurar VPC e EC2', status: 'todo', priority: 'medium', createdAt: '2026-03-15', assignedTo: 'Carlos' },
];
```

**Mock interceptor — rotas que deve simular:**

| Método | URL | Resposta |
|--------|-----|----------|
| POST | `/api/auth/login` | `{ token: 'fake-jwt' }` |
| GET | `/api/projects` | lista de projects |
| GET | `/api/projects/:id` | project único |
| POST | `/api/projects` | project criado |
| PUT | `/api/projects/:id` | project atualizado |
| DELETE | `/api/projects/:id` | vazio (204) |
| GET | `/api/projects/:id/tasks` | tasks filtradas por projectId |
| POST | `/api/tasks` | task criada |
| PUT | `/api/tasks/:id` | task atualizada |
| DELETE | `/api/tasks/:id` | vazio (204) |

**Onde olhar:**

| Arquivo seu | O que observar |
|-------------|---------------|
| `FinControl\src\app\core\tokens\app-config.token.ts` | Como criar `InjectionToken<AppConfig>` |
| `FinControl\src\app\core\interceptors\mock-api.interceptor.ts` | Como mapear URL + método, responder com `of(HttpResponse)` |
| `FinControl\src\app\core\interceptors\mock-data.ts` | Estrutura dos dados mock |

---

### Etapa 2: Auth — Login, Guards e Interceptors

**Objetivo:** Usuário consegue fazer login e ser redirecionado.

| O que fazer | Arquivos |
|-------------|---------|
| Criar `AuthService` com signal de token + `isAuthenticated` computed | `features/auth/data-access/auth.service.ts` |
| Criar `auth.interceptor.ts` (adiciona Bearer token) | `core/interceptors/auth.interceptor.ts` |
| Criar `error.interceptor.ts` (trata 401, erros de rede) | `core/interceptors/error.interceptor.ts` |
| Criar `authGuard` com `CanActivateFn` | `core/guards/auth.guard.ts` |
| Criar `guestGuard` (inverte auth) | `core/guards/guest.guard.ts` |
| Criar `LoginPage` (smart container) | `features/auth/pages/login.page.ts` |
| Atualizar `app.routes.ts` com rota `/login` | `app.routes.ts` |

**LoginPage (smart):** formulário reativo com email + senha, botão com loading, mensagem de erro, chama `authService.login()` e navega.

**Onde olhar:**

| Arquivo seu | O que observar |
|-------------|---------------|
| `FinControl\src\app\features\auth\data-access\auth.service.ts` | `signal<string>`, `computed` isAuthenticated, `tap` no login |
| `FinControl\src\app\core\guards\auth.guard.ts` | `CanActivateFn`, `createUrlTree`, `returnUrl` |
| `FinControl\src\app\core\interceptors\auth.interceptor.ts` | `withHeaders` + `clone`, `skip` login endpoint |
| `FinControl\src\app\core\interceptors\error.interceptor.ts` | `catchError`, 401 → logout |
| `FinControl\src\app\features\auth\pages\login.page.ts` | Reactive form, loading/error signals, navegação |

---

### Etapa 3: Shell + Layout

**Objetivo:** Ter um layout com sidebar + navegação.

| O que fazer | Arquivos |
|-------------|---------|
| Criar `ShellComponent` | `core/layout/shell.component.ts` |
| Criar template com sidebar, `<router-outlet>`, nav links | `core/layout/shell.component.html` |
| Atualizar `app.routes.ts` com rota pai + `ShellComponent` | `app.routes.ts` |
| Botão de logout na sidebar | `ShellComponent` |

**Estrutura do Shell:**
```
┌──────────────┬─────────────────────────────────┐
│   Sidebar    │                                 │
│              │                                 │
│  ● Dashboard │      <router-outlet />          │
│  ● Projetos  │                                 │
│  ● Logout    │                                 │
│              │                                 │
│  Usuário:    │                                 │
│  thiago@b3   │                                 │
└──────────────┴─────────────────────────────────┘
```

**Onde olhar:**

| Arquivo seu | O que observar |
|-------------|---------------|
| `FinControl\src\app\core\layout\shell.component.ts` | `inject(AuthService)`, `router-outlet`, nav links |
| `FinControl\src\app\core\layout\shell.component.html` | `@if (user(); as u)`, `routerLinkActive`, logout |

---

### Etapa 4: Projects — Model, API e Facade

**Objetivo:** Criar toda camada de dados de projetos.

| O que fazer | Arquivos |
|-------------|---------|
| Criar `Project` model (interface) | `features/projects/data-access/project.model.ts` |
| Criar `ProjectApiService` (HttpClient puro) | `features/projects/data-access/project-api.service.ts` |
| Criar `ProjectFacade` (orquestra API + signals) | `features/projects/data-access/project.facade.ts` |

**ProjectFacade — contrato esperado:**

```typescript
@Injectable({ providedIn: 'root' })
export class ProjectFacade {
  readonly items = signal<Project[]>([]);   // protegido
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  loadAll(): void { }
  getById(id: number): Project | undefined { }
  create(project: ProjectCreateDto): void { }
  update(id: number, project: ProjectUpdateDto): void { }
  delete(id: number): void { }
}
```

**Dica:** O facade é `providedIn: 'root'` (diferente do gestao-titulos que é scoped). Use root pra simplificar.

**Onde olhar:**

| Arquivo seu | O que observar |
|-------------|---------------|
| `FinControl\src\app\features\transactions\data-access\transaction.model.ts` | Interface com tipos e união |
| `FinControl\src\app\features\transactions\data-access\transaction.facade.ts` | `signal` de items, `loading`, métodos `loadAll/create/delete` |
| `gestao-titulos\src\app\features\gestao-titulos\services\titulo-api.service.ts` | API service com mock (se quiser fazer separado) |

---

### Etapa 5: Projects — UI (Lista e Formulário)

**Objetivo:** Listar, criar, editar e deletar projetos.

| O que fazer | Arquivos |
|-------------|---------|
| Criar `ProjectFiltersComponent` (dumb, OnPush) | `features/projects/ui/project-filters.component.ts` |
| Criar `ProjectTableComponent` (dumb, OnPush, MatTable) | `features/projects/ui/project-table.component.ts` |
| Criar `ProjectFormComponent` (dumb, OnPush, Reactive Form) | `features/projects/ui/project-form.component.ts` |
| Criar `ProjectListPage` (smart, injeta facade) | `features/projects/pages/project-list.page.ts` |
| Criar `ProjectFormPage` (smart, cria/edita) | `features/projects/pages/project-form.page.ts` |
| Criar `ProjectDetailPage` (exibe tarefas) | `features/projects/pages/project-detail.page.ts` |
| Criar `projects.routes.ts` (lazy load) | `features/projects/projects.routes.ts` |
| Atualizar `app.routes.ts` com lazy load de projects | `app.routes.ts` |

**Fluxo da ProjectListPage (smart):**
```
1. Injeta ProjectFacade
2. Chama facade.loadAll() no OnInit
3. Mantém signal de filtro (texto, status)
4. Expõe computed filteredProjects
5. Template: ProjectFilters + ProjectTable
6. Escuta eventos: delete → facade.delete(), edit → navigate
```

**ProjectFormComponent (dumb):**
- `input` opcional: `project?: Project` (para edição)
- `output` de submit com dados validados
- Reactive Form com FormBuilder
- Material: mat-form-field, mat-select, mat-datepicker

**Onde olhar:**

| Arquivo seu | O que observar |
|-------------|---------------|
| `FinControl\src\app\features\transactions\pages\transaction-list.page.ts` | Smart com filters signal, computed filtered, delega pra dumb |
| `FinControl\src\app\features\transactions\ui\transaction-table.component.ts` | Dumb table, OnPush, input.required, output |
| `FinControl\src\app\features\transactions\ui\transaction-form.component.ts` | Dumb form, FormBuilder, output com valor validado |
| `FinControl\src\app\features\transactions\ui\transaction-filters.component.ts` | Dumb filters com two-way binding |
| `gestao-titulos\src\app\features\gestao-titulos\presenters\titulos-table-presenter` | MatTable no padrão Sinacor (se quiser copiar) |

---

### Etapa 6: Tasks — CRUD aninhado

**Objetivo:** Gerenciar tarefas dentro de um projeto.

| O que fazer | Arquivos |
|-------------|---------|
| Criar `Task` model | `features/projects/data-access/task.model.ts` |
| Criar `TaskApiService` | `features/projects/data-access/task-api.service.ts` |
| Criar `TaskFacade` (ou incluir no ProjectFacade) | `features/projects/data-access/task.facade.ts` |
| Criar `TaskListComponent` (dumb, MatTable) | `features/projects/ui/task-list.component.ts` |
| Criar `TaskFormComponent` (dumb) | `features/projects/ui/task-form.component.ts` |

**Decisão arquitetural:** `TaskFacade` separado ou dentro de `ProjectFacade`?
- **Sugestão:** `TaskFacade` separado, pois tem lifecycle próprio (carrega tarefas só quando entra no detalhe do projeto)
- Referência: `FinControl` tem `TransactionFacade` separado

**TaskListComponent:**
- Exibe tarefas do projeto em MatTable
- Colunas: título, status, prioridade, responsável, ações
- Botão "Nova tarefa" → abre formulário inline ou modal
- Ações por linha: editar, deletar

**Onde olhar:**

| Arquivo seu | O que observar |
|-------------|---------------|
| Mesmos da Etapa 5 — a estrutura é idêntica à de projetos, só muda a entidade |
| `FinControl\src\app\features\transactions\ui\transaction-table.component.ts` | Table component |
| `FinControl\src\app\features\transactions\ui\transaction-form.component.ts` | Form component |

---

### Etapa 7: Dashboard com KPIs

**Objetivo:** Tela inicial com indicadores dos projetos.

| O que fazer | Arquivos |
|-------------|---------|
| Criar `DashboardStore` | `features/dashboard/data-access/dashboard.store.ts` |
| Criar `DashboardPage` (smart) | `features/dashboard/pages/dashboard.page.ts` |
| Criar `SummaryCardsComponent` (dumb) | `features/dashboard/ui/summary-cards.component.ts` |
| Atualizar `app.routes.ts` com rota `/dashboard` | `app.routes.ts` |

**DashboardStore — computed que deve ter:**

```typescript
export class DashboardStore {
  private readonly projectFacade = inject(ProjectFacade);
  private readonly taskFacade = inject(TaskFacade);

  readonly totalProjects = computed(() => this.projectFacade.items().length);
  readonly inProgressProjects = computed(() =>
    this.projectFacade.items().filter(p => p.status === 'in_progress').length
  );
  readonly completedProjects = computed(() =>
    this.projectFacade.items().filter(p => p.status === 'done').length
  );
  readonly totalTasks = computed(() => this.taskFacade.items().length);
  readonly highPriorityTasks = computed(() =>
    this.taskFacade.items().filter(t => t.priority === 'high' && t.status !== 'done').length
  );
}
```

**SummaryCardsComponent (dumb):**
- `input.required<{ label: string; value: number; variant: string }[]>()` — recebe array de KPIs
- Renderiza cards com Material ou CSS

**Onde olhar:**

| Arquivo seu | O que observar |
|-------------|---------------|
| `FinControl\src\app\features\dashboard\data-access\dashboard.store.ts` | Store que injeta facade e deriva computed |
| `FinControl\src\app\features\dashboard\pages\dashboard.page.ts` | Smart que expõe os computeds |
| `FinControl\src\app\features\dashboard\ui\summary-cards.component.ts` | Dumb com input.required + computed interno |

---

### Etapa 8: Finalização — Empty States, 404, Polimento

**Objetivo:** Tratar estados de borda.

| O que fazer | Arquivos |
|-------------|---------|
| Criar `EmptyStateComponent` | `shared/ui/empty-state.component.ts` |
| Criar `NotFoundPage` | `shared/pages/not-found.page.ts` |
| Adicionar empty state em listas vazias | onde tiver `@for` |
| Adicionar `**_redirect` no `app.routes.ts` | `app.routes.ts` |
| Revisar loading/error em todas as páginas smart | todas as pages |

**Onde olhar:**

| Arquivo seu | O que observar |
|-------------|---------------|
| `FinControl\src\app\shared\ui\empty-state\empty-state.component.ts` | Componente simples com input de titulo/mensagem |
| `FinControl\src\app\shared\pages\not-found.page.ts` | Página 404 |

---

## 5. Tabela de Referência

Cada padrão → onde você já implementou. Consulte SEMPRE que travar.

### Core / Infraestrutura

| Padrão | Onde você já fez |
|--------|-----------------|
| `InjectionToken<AppConfig>` | `FinControl/src/app/core/tokens/app-config.token.ts` |
| Mock API Interceptor | `FinControl/src/app/core/interceptors/mock-api.interceptor.ts` |
| Auth Interceptor | `FinControl/src/app/core/interceptors/auth.interceptor.ts` |
| Error Interceptor | `FinControl/src/app/core/interceptors/error.interceptor.ts` |
| Auth Guard (CanActivateFn) | `FinControl/src/app/core/guards/auth.guard.ts` |
| Guest Guard | `FinControl/src/app/core/guards/guest.guard.ts` |
| Shell Layout | `FinControl/src/app/core/layout/shell.component.ts` (+ .html) |
| Lazy Load com loadComponent | `FinControl/src/app/app.routes.ts` |

### Data Access

| Padrão | Onde você já fez |
|--------|-----------------|
| Model/Interface | `FinControl/src/app/features/transactions/data-access/transaction.model.ts` |
| API Service (HttpClient) | `gestao-titulos/src/app/features/gestao-titulos/services/titulo-api.service.ts` |
| Facade Pattern | `FinControl/src/app/features/transactions/data-access/transaction.facade.ts` |
| Facade scoped (providers no container) | `gestao-titulos/src/app/features/gestao-titulos/services/titulo.service.ts` |
| State Service (asReadonly) | `gestao-titulos/src/app/features/gestao-titulos/state/titulo-state.service.ts` |
| Store with computed | `FinControl/src/app/features/dashboard/data-access/dashboard.store.ts` |
| Signal service básico | `Curso-FernandaKipper/src/app/services/dados.service.ts` |

### Componentes

| Padrão | Onde você já fez |
|--------|-----------------|
| Smart Page (lista) | `FinControl/src/app/features/transactions/pages/transaction-list.page.ts` |
| Smart Page (form) | `FinControl/src/app/features/auth/pages/login.page.ts` |
| Smart Container (Sinacor) | `gestao-titulos/src/app/.../containers/gestao-titulos-container.component.ts` |
| Dumb Table | `FinControl/src/app/features/transactions/ui/transaction-table.component.ts` |
| Dumb Form | `FinControl/src/app/features/transactions/ui/transaction-form.component.ts` |
| Dumb Filters | `FinControl/src/app/features/transactions/ui/transaction-filters.component.ts` |
| Dumb Cards | `FinControl/src/app/features/dashboard/ui/summary-cards.component.ts` |
| Dumb Table (MatTable) | `gestao-titulos/src/app/.../presenters/titulos-table-presenter.component.ts` |
| Dumb Presenter (form) | `gestao-titulos/src/app/.../presenters/titulos-filters-presenter.component.ts` |
| Empty State | `FinControl/src/app/shared/ui/empty-state/empty-state.component.ts` |

### Fluxos Completos

| Funcionalidade | Projeto para consultar |
|---------------|----------------------|
| Login completo (form + service + guard + interceptor) | `FinControl` — auth feature |
| CRUD com facade + smart + dumb | `FinControl` — transactions feature |
| Dashboard com KPIs computed | `FinControl` — dashboard feature |
| Container/Presenter + state scoped | `gestao-titulos` — gestao-titulos feature |
| Componente simples com signal | `Curso-FernandaKipper` — lista component |

---

## 6. Checklist Final

Antes de considerar o projeto completo:

- [ ] Login funciona (form valida, service persiste, guard redireciona)
- [ ] Logout limpa sessão e volta pro login
- [ ] Guest guard impede usuário logado de ver `/login`
- [ ] Auth guard redireita não-logado para `/login?returnUrl=...`
- [ ] Mock API responde todas as rotas (projects + tasks)
- [ ] Lista de projetos carrega, filtra, exibe em tabela
- [ ] Criar projeto via formulário aparece na lista
- [ ] Editar projeto abre form preenchido
- [ ] Deletar projeto remove da lista
- [ ] Tarefas aparecem no detalhe do projeto
- [ ] Criar/editar/deletar tarefa funciona
- [ ] Dashboard exibe KPIs corretos
- [ ] Loading state visível enquanto carrega
- [ ] Error state com mensagem quando API falha
- [ ] Empty state quando lista vazia
- [ ] Página 404 para rotas inexistentes
- [ ] OnPush em todos os componentes dumb
- [ ] Layout responsivo (sidebar + conteúdo)

### Estrela (extras opcionais):

- [ ] Teste do AuthService (login/logout)
- [ ] Teste de dumb component (ProjectTable renders, emite delete)
- [ ] Teste do DashboardStore (KPIs calculam corretamente)
- [ ] Confirmação antes de deletar (MatDialog)
- [ ] Snackbar de sucesso/erro (MatSnackBar)
- [ ] Filtro por data com date-range

---

## Resumo — Ordem de Desenvolvimento

```
Etapa 1: Setup + tokens + mock interceptor + app.config
    │
    ▼
Etapa 2: Auth (service + guards + interceptors + login page)
    │
    ▼
Etapa 3: Shell layout + navegação
    │
    ▼
Etapa 4: Project model + API service + facade
    │
    ▼
Etapa 5: Project UI (list, form, filters, routes)
    │
    ▼
Etapa 6: Task model + API + facade + UI
    │
    ▼
Etapa 7: Dashboard store + page + summary cards
    │
    ▼
Etapa 8: Empty states, 404, loading/error, polimento
```

---

Bons estudos! 🚀 Cada etapa tem referência direta pro código que você já escreveu. Se travar, abre o projeto correspondente e vê como resolveu antes.
