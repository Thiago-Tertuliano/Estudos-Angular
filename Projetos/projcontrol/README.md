# ProjControl

Aplicação de **gestão de projetos** em Angular 21 — dashboard com KPIs, CRUD de projetos e arquitetura feature-based no padrão do [FinControl](../FinControl/).

**Stack:** Angular 21 · Standalone · Signals · RxJS · Mock API via interceptors · SCSS dark theme

---

## Quick start

```bash
npm install
ng serve
```

Abra `http://localhost:4200`

**Login demo:** `dev@projcontrol.app` / `123` (ou qualquer e-mail válido + senha com 3+ caracteres)

---

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm start` / `ng serve` | Servidor de desenvolvimento |
| `ng build` | Build de produção → `dist/projcontrol` |
| `ng test` | Testes unitários (Vitest — 4 testes) |
| `ng build --watch --configuration development` | Build contínuo em dev |

---

## Funcionalidades

### Autenticação
- Login com Reactive Forms e validação (e-mail + senha mín. 3 caracteres)
- `authGuard` / `guestGuard` com redirect e `returnUrl`
- Sessão persistida em `localStorage` (`auth_token`, `auth_user`)
- Logout com limpeza de sessão

### Dashboard (`/dashboard`)
- KPIs calculados com signals/computed:
  - Total de projetos
  - Em andamento
  - Concluídos
  - Atrasados (prazo vencido e status ≠ concluído)
- Lista dos 5 projetos mais recentes

### Projetos (`/projects`)
- Listagem com tabela responsiva
- **Criar** projeto via formulário inline
- **Excluir** projeto
- **Filtros:** busca por nome, responsável ou descrição + filtro por status
- Badges visuais de status e prioridade
- Destaque de projetos atrasados

### Infraestrutura
- Shell com sidebar, navegação, usuário logado e logout
- Interceptors: mock API, auth token (`Bearer`), tratamento de erros 401
- Rota lazy para login, dashboard e projetos
- Página 404 (`**`)

---

## Rotas

| Rota | Guard | Descrição |
|------|-------|-----------|
| `/login` | `guestGuard` | Tela de login |
| `/dashboard` | `authGuard` | KPIs e resumo |
| `/projects` | `authGuard` | CRUD de projetos |
| `/**` | — | Página não encontrada |

Redirecionamento padrão: `/` → `/dashboard`

---

## Arquitetura

```
src/app/
├── app.config.ts          # HttpClient, interceptors, APP_CONFIG
├── app.routes.ts          # Rotas lazy + guards
├── core/
│   ├── guards/            # auth.guard, guest.guard
│   ├── interceptors/      # mock-api, auth, error + mock-data
│   ├── layout/            # ShellComponent (sidebar)
│   └── tokens/            # APP_CONFIG
├── features/
│   ├── auth/
│   │   ├── data-access/   # AuthService (signals + HttpClient)
│   │   ├── pages/         # LoginPage (smart)
│   │   └── ui/            # LoginFormComponent (dumb)
│   ├── dashboard/
│   │   ├── data-access/   # DashboardStore (computed KPIs)
│   │   ├── pages/         # DashboardPage (smart)
│   │   └── ui/            # SummaryCardsComponent (dumb)
│   └── projects/
│       ├── data-access/   # ProjectFacade, project.model
│       ├── pages/         # ProjectListPage (smart)
│       ├── ui/            # form, table, filters (dumb)
│       └── projects.routes.ts
└── shared/
    ├── pages/             # NotFoundPage
    └── ui/                # kpi-card, empty-state
```

### Padrões aplicados

| Padrão | Implementação |
|--------|---------------|
| Smart / Dumb | `pages/` orquestram; `ui/` recebem `input()` e emitem `output()` |
| Facade | `ProjectFacade` centraliza HTTP e signals de estado |
| Store | `DashboardStore` com `computed()` sobre dados do facade |
| Lazy loading | Rotas e features carregadas sob demanda |
| Path aliases | `@core/*`, `@features/*`, `@shared/*` em `tsconfig.app.json` |

---

## Modelo de dados — Projeto

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high';
  deadline: string;      // YYYY-MM-DD
  responsible: string;
}
```

### Status

| Valor | Label |
|-------|-------|
| `planning` | Planejamento |
| `in_progress` | Em andamento |
| `completed` | Concluído |
| `on_hold` | Em pausa |

### Prioridade

| Valor | Label |
|-------|-------|
| `low` | Baixa |
| `medium` | Média |
| `high` | Alta |

---

## Mock API

O `mockApiInterceptor` simula REST em `/api/*` (latência ~400ms):

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Login (e-mail válido + senha 3+ chars) |
| GET | `/api/projects` | Lista todos os projetos |
| POST | `/api/projects` | Cria projeto |
| DELETE | `/api/projects/:id` | Remove projeto |

### Dados iniciais (mock)

| Projeto | Status | Prioridade |
|---------|--------|------------|
| Portal SISCON | Em andamento | Alta |
| Migração Data Warehouse | Planejamento | Alta |
| App Mobile Sinacor | Concluído | Média |
| Integração ERP | Em pausa | Baixa |
| Dashboard Executivo | Em andamento | Média |

Para API real: remova o `mockApiInterceptor` de `app.config.ts` e configure `APP_CONFIG.apiUrl`.

---

## Interceptors

| Interceptor | Função |
|-------------|--------|
| `mockApiInterceptor` | Simula backend REST em `/api` |
| `authInterceptor` | Adiciona `Authorization: Bearer <token>` |
| `errorInterceptor` | Trata 401 (logout + redirect) e normaliza mensagens |

Ordem de execução: mock → auth → error

---

## Testes

```bash
ng test
```

| Arquivo | O que testa |
|---------|-------------|
| `app.spec.ts` | Bootstrap do App |
| `auth.service.spec.ts` | Login + persistência + logout |
| `dashboard.store.spec.ts` | Cálculo de KPIs (total, andamento, concluídos, atrasados) |

---

## Design system (SCSS)

Variáveis globais em `src/styles.scss`:

| Token | Uso |
|-------|-----|
| `--color-bg` | Fundo principal |
| `--color-surface` | Cards, sidebar |
| `--color-primary` | Ações, links (#1565c0) |
| `--color-success` | Concluídos |
| `--color-warning` | Em pausa |
| `--color-danger` | Atrasados, erros |
| `--radius` | Border radius padrão (8px) |

---

## Fluxo da aplicação

```mermaid
flowchart TD
  A[/login] -->|credenciais OK| B[/dashboard]
  B --> C[/projects]
  C -->|CRUD| D[ProjectFacade]
  D --> E[mockApiInterceptor]
  B --> F[DashboardStore]
  F --> D
  G[authGuard] --> B
  G --> C
  H[guestGuard] --> A
```

---

## Comparação com FinControl

| Aspecto | FinControl | ProjControl |
|---------|------------|-------------|
| Domínio | Finanças pessoais | Gestão de projetos |
| Feature CRUD | Transações | Projetos |
| KPIs | Receitas, despesas, saldo | Total, andamento, concluídos, atrasados |
| Filtros | Tipo + busca | Status + busca |
| UI | SCSS dark | SCSS dark (azul corporativo) |

---

## Próximos passos (evolução)

- [ ] Edição inline de projetos
- [ ] Paginação na listagem
- [ ] Filtros persistidos na URL (query params)
- [ ] Gráfico de projetos por status (`@defer`)
- [ ] SSR com `ng add @angular/ssr`
- [ ] Mais testes (dumb components, facade)

---

## Curso

Desenvolvido como projeto de portfólio na trilha [Estudos Angular](../../README.md), seguindo os módulos do [Curso Arquiteto de Angular](../../Curso-%20Arquiteto-de-Angular/README.md) (padrões dos módulos 04–08 e 13).

Referência direta: [FinControl](../FinControl/) (módulo 13 — projeto final).
