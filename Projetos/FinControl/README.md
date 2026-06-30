# FinControl

Dashboard de finanças pessoais — projeto final do **Curso Angular Architect** e peça de portfólio.

**Stack:** Angular 21 · Standalone · Signals · RxJS · Mock API via interceptors

## Quick start

```bash
npm install
ng serve
```

Abra `http://localhost:4200`

**Login demo:** `dev@fincontrol.app` / `123` (ou qualquer e-mail válido + senha com 3+ caracteres)

## Scripts

| Comando | Descrição |
|---------|-----------|
| `ng serve` | Dev server |
| `ng build` | Build produção |
| `ng test` | Testes unitários (6 testes) |

## Funcionalidades

- Autenticação mock (JWT em `localStorage`)
- Dashboard com KPIs (receitas, despesas, saldo)
- CRUD de transações com categorias
- Filtros por texto e tipo
- Guards, interceptors (auth, error, mock API)
- Arquitetura feature-based (smart/dumb)

## Arquitetura

```
src/app/
├── core/           guards, interceptors, layout shell
├── shared/         kpi-card, empty-state, not-found
└── features/
    ├── auth/       login + AuthService
    ├── dashboard/  KPIs + resumo
    └── transactions/ CRUD completo
```

## Mock API

O `mockApiInterceptor` simula REST em `/api/*`:

| Método | Rota |
|--------|------|
| POST | `/api/auth/login` |
| GET | `/api/transactions` |
| POST | `/api/transactions` |
| DELETE | `/api/transactions/:id` |
| GET | `/api/categories` |
| GET | `/api/transactions/search?q=` |

Para API real: remova o mock interceptor e configure `APP_CONFIG.apiUrl`.

## Curso

Desenvolvido como parte do [Curso Arquiteto de Angular](../../Curso-%20Arquiteto-de-Angular/README.md) (módulo 13).

Laboratório dos módulos 00–12: [`rascunho/angular-lab`](../../Curso-%20Arquiteto-de-Angular/rascunho/angular-lab/).

## Próximos passos (Fase 2)

- [ ] Gráfico de despesas por categoria (`@defer`)
- [ ] Paginação na lista de transações
- [ ] Filtros persistidos na URL (query params)
- [ ] SSR com `ng add @angular/ssr`
