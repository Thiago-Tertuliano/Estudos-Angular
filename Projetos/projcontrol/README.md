# ProjControl

Aplicação Angular 21 de **gestão de projetos** — projeto de estudo do curso Angular, seguindo o padrão arquitetural do FinControl.

## Funcionalidades

- **Autenticação** com guards, sessão em `localStorage` e mock API
- **Dashboard** com KPIs: total, em andamento, concluídos e atrasados
- **CRUD de projetos** com filtros por status e busca textual
- **Interceptors** HTTP: mock API, auth token e tratamento de erros
- **Arquitetura** Smart/Dumb components + Facade + Store

## Como executar

```bash
npm install
npm start
```

Acesse `http://localhost:4200/`.

## Credenciais demo

| Campo | Valor |
|-------|-------|
| E-mail | qualquer e-mail válido (ex: `dev@projcontrol.app`) |
| Senha | mínimo 3 caracteres (ex: `123`) |

## Estrutura

```
src/app/
├── core/           # guards, interceptors, layout, tokens
├── features/
│   ├── auth/       # login
│   ├── dashboard/  # KPIs e resumo
│   └── projects/   # CRUD de projetos
└── shared/         # componentes reutilizáveis
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm start` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm test` | Testes unitários (Vitest) |

## Stack

- Angular 21 (standalone components, signals, lazy routes)
- RxJS + HttpClient
- SCSS com design system dark
- Mock API via interceptor (sem backend real)
