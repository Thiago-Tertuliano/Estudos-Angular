# Estrutura Feature — FinControl

```
src/app/
├── core/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   ├── auth.interceptor.ts
│   │   └── error.interceptor.ts
│   ├── tokens/
│   │   └── app-config.token.ts
│   └── layout/
│       ├── shell.component.ts
│       └── sidebar.component.ts
│
├── shared/
│   ├── ui/
│   │   ├── button/
│   │   ├── kpi-card/
│   │   └── empty-state/
│   └── pipes/
│       └── currency-brl.pipe.ts
│
├── features/
│   ├── auth/
│   │   ├── pages/login.page.ts
│   │   └── data-access/auth.service.ts
│   ├── dashboard/
│   │   ├── pages/dashboard.page.ts
│   │   ├── ui/summary-cards.component.ts
│   │   └── data-access/dashboard.store.ts
│   └── transactions/
│       ├── transactions.routes.ts
│       ├── pages/
│       ├── ui/
│       └── data-access/
│
├── app.config.ts
├── app.routes.ts
└── app.ts
```

## Fluxo de dependências

```
pages → data-access + ui
ui → shared (apenas)
data-access → core tokens + HttpClient
```
