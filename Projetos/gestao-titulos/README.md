# Gestão de Títulos — Sinacor Eleva Cloud

Feature Angular implementada a partir do **Material.pdf** (modelo de tela base Sinacor).

## Quick start

```bash
npm install
ng serve
```

Acesse `http://localhost:4200/gestao-titulos`

## Funcionalidades

- Listar títulos (Nome Cliente, Conta, CPF, Data da Compra)
- Filtrar com botão **Pesquisar**
- Editar título inline
- **Exportar CSV**
- Arquitetura Container/Presenter + Facade + State (Signals)

## Estrutura

```
src/app/features/gestao-titulos/
├── gestao-titulos.routes.ts
├── containers/gestao-titulos-container/
├── presenters/
│   ├── titulos-filters-presenter/
│   ├── titulos-table-presenter/
│   └── titulo-edit-presenter/
├── services/
│   ├── titulo.service.ts      (facade — scope do container)
│   └── titulo-api.service.ts  (mock)
├── state/titulo-state.service.ts
├── models/
└── shared/utils/csv-export.util.ts
```

## Padrões (PDF)

| Padrão | Onde |
|--------|------|
| Container/Presenter | `containers/` + `presenters/` |
| Signals | `TituloStateService` (`_data` + `asReadonly()`) |
| Facade | `TituloService` |
| OnPush | Todos os presenters + container |
| Lazy load | `gestao-titulos.routes.ts` |
| `accessFunction` | `data: { accessFunction: 'GESTAO_TITULOS' }` |

## UI

Angular Material (substituto do `@sinacor/lib` conforme exercício do PDF).

## Documentação

- [ARQUITETURA.md](./src/app/features/gestao-titulos/ARQUITETURA.md)
- [COMO-USAR.md](./src/app/features/gestao-titulos/COMO-USAR.md)
