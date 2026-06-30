# Angular Lab

Projeto único do curso **Angular Architect** (módulos 00–12).

## Rodar

```bash
npm install
ng serve
```

Acesse `http://localhost:4200` → login → playground.

**Credenciais:** qualquer e-mail válido + senha com 3+ caracteres.

## Módulos implementados

| Módulo | Conteúdo |
|--------|----------|
| 00–01 | Setup, counter, signals |
| 02 | Smart/Dumb, catalog |
| 03 | DI, LoggerService |
| 04 | Auth, guards, lazy routes |
| 05 | Reactive forms |
| 06 | HTTP, interceptors, facade |
| 07 | RxJS debounce + switchMap na busca |
| 08 | CatalogStore, KPIs |
| 09 | OnPush, @defer |
| 10 | Testes unitários |
| 11 | localStorage SSR-safe |
| 12 | Documentação de arquitetura |

## Code review checklist

- [x] OnPush nos dumb
- [x] Sem subscribe sem teardown (catalog.page)
- [x] Feature folders
- [x] Testes críticos passando

## Documentação

- [docs/ARQUITETURA.md](./docs/ARQUITETURA.md)
- [docs/adr-001-signals-vs-rxjs.md](./docs/adr-001-signals-vs-rxjs.md)
- [docs/adr-001-ssr.md](./docs/adr-001-ssr.md)

## Próximo passo

Projeto final: [FinControl](../../13-projeto-final-fincontrol/README.md)
