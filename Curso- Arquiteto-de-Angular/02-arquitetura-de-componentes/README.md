# Módulo 02 — Arquitetura de Componentes

> **Guia prático:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)  
> **Metodologia:** [COMO-ESTUDAR.md](../COMO-ESTUDAR.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **Smart / Container** | Componente que busca dados, chama service, decide o que mostrar |
| **Dumb / Presentational** | Só renderiza o que recebe via `input` e avisa via `output` |
| **OnPush** | Change detection só roda quando inputs mudam — obrigatório em dumb |
| **data-access/** | Models, services, facades da feature |
| **pages/** | Smart components (uma por rota) |
| **ui/** | Dumb components da feature |

## Objetivos

- Separar **Smart (Container)** vs **Dumb (Presentational)** components
- Aplicar composição sobre herança
- Definir contratos claros entre componentes (inputs/outputs)
- Organizar features em subpastas `pages/`, `ui/`, `data-access/`

## Contexto

O erro #1 em code reviews Angular: **componentes Deus** com 500 linhas, HTTP, formulário e template juntos. Empresas sérias exigem separação clara — facilita teste, reuso e onboarding.

---

## Smart vs Dumb

| | Smart (Container) | Dumb (Presentational) |
|--|-------------------|----------------------|
| **Responsabilidade** | Orquestra dados, chama services | Renderiza UI, emite eventos |
| **Conhece** | Services, Store, Router | Apenas `@Input` / `@Output` |
| **Testes** | Mock de services | Testa render + eventos |
| **Reuso** | Baixo (específico da feature) | Alto (shared/ui) |

```
features/transactions/
├── pages/
│   └── transaction-list.page.ts    ← SMART
├── ui/
│   ├── transaction-table.ts        ← DUMB
│   └── transaction-filters.ts      ← DUMB
└── data-access/
    └── transaction.service.ts
```

---

## Exemplo: fluxo de dados unidirecional

```
Service → Smart Component → [inputs] → Dumb Component
                ↑                            |
                └──────── [outputs] ─────────┘
```

---

## OnPush no dumb component

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  ...
})
```

Dumb components **devem** usar OnPush — recebem dados novos via input reference change.

---

## Exemplos

- [`exemplos/transaction-list.page.ts`](./exemplos/transaction-list.page.ts) — Smart
- [`exemplos/transaction-table.component.ts`](./exemplos/transaction-table.component.ts) — Dumb
- [`exemplos/transaction-filters.component.ts`](./exemplos/transaction-filters.component.ts) — Dumb

---

## Exercícios

Refatore o `product-list` do módulo 01 → arquitetura Smart/Dumb.

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**  
→ Scaffolds: [`aula-pratica/scaffold/`](./aula-pratica/scaffold/)

---

## Anti-patterns

| ❌ | ✅ |
|----|-----|
| Service injetado no card de UI | Service só no container |
| `@Output` emitindo objeto mutado | Emitir valor imutável novo |
| Lógica de filtro no template | `computed()` no smart |

---

## Checklist

- [ ] Feature organizada em pages/ui/data-access
- [ ] Dumb sem dependência de services
- [ ] OnPush nos presentational
- [ ] Fluxo unidirecional documentado

**Próximo:** [Módulo 03 — Injeção de Dependência](../03-injecao-de-dependencia/README.md)
