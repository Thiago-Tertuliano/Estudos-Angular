# Arquitetura — Angular Lab

## Estrutura

```
src/app/
├── core/           guards, interceptors, services, tokens
├── shared/         componentes reutilizáveis (futuro)
└── features/
    ├── auth/       login + AuthService
    └── playground/ catalog, counter, forms
```

## Regras de import

| De | Pode importar |
|----|----------------|
| `pages/` | `data-access`, `ui`, `@core` |
| `ui/` | `data-access` (apenas models), `@shared` |
| `data-access/` | `@core`, HttpClient |
| `core/` | Angular e libs puras |

**Proibido:** `ui/` injetar services de negócio ou chamar HTTP diretamente.

## Smart vs Dumb

- **Smart:** `pages/`, orquestra estado, `inject()`, RxJS com teardown
- **Dumb:** `ui/`, OnPush, `input`/`output` apenas

## Estado

| Tipo | Ferramenta |
|------|------------|
| HTTP / streams | RxJS + Facade |
| KPIs derivados | Signals `computed` |
| UI local | `signal` |
