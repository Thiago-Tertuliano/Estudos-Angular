# FinControl

Projeto final do **Curso Angular Architect** — dashboard de finanças pessoais com arquitetura enterprise.

## Quick start

```bash
npm install
ng serve
```

Abra `http://localhost:4200`

**Login demo:** `dev@fincontrol.app` / `123` (ou qualquer e-mail + senha 3+ chars)

## Scripts

| Comando | Descrição |
|---------|-----------|
| `ng serve` | Dev server |
| `ng build` | Build produção |
| `ng test` | Testes unitários |

## Arquitetura

- **core/** — guards, interceptors (auth, error, mock API), shell layout
- **shared/** — componentes UI reutilizáveis
- **features/** — auth, dashboard, transactions

## Mock API

Durante desenvolvimento, `mockApiInterceptor` simula REST em `/api/*`. Para API real:

1. Remova `mockApiInterceptor` de `app.config.ts`
2. Configure `APP_CONFIG.apiUrl` para sua API

## Curso

Parte de [Curso Arquiteto de Angular](../README.md).
