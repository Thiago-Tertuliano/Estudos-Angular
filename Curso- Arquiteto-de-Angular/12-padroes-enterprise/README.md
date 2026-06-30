# Módulo 12 — Padrões Enterprise

> **Guia:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **Feature folder** | Pasta por domínio de negócio |
| **ADR** | Documento de decisão arquitetural |
| **Boundary** | Regra de quem importa quem |

## Objetivos

- Feature folders vs layer folders
- Boundary rules (eslint-plugin-boundaries)
- Monorepo com Nx (visão geral)
- Documentação de arquitetura (ADR)
- Code review checklist de produção

## Contexto

Times de 5–50 devs precisam de **regras explícitas** — quem importa o quê, onde colocar código novo, como nomear. Sem isso, o app vira big ball of mud em 6 meses.

---

## Feature folder (recomendado)

```
features/transactions/
├── data-access/
│   ├── transaction.api.ts
│   ├── transaction.facade.ts
│   └── transaction.model.ts
├── ui/
│   ├── transaction-table.component.ts
│   └── transaction-form.component.ts
├── pages/
│   ├── transaction-list.page.ts
│   └── transaction-detail.page.ts
└── transactions.routes.ts
```

---

## Regras de import (exemplo)

```
core     → (nada)
shared   → core
features → core, shared
app      → tudo
```

`features/A` **nunca** importa `features/B` diretamente — use shared ou event bus.

---

## ADR (Architecture Decision Record)

```markdown
# ADR-001: Signals para UI state, RxJS para streams

## Status: Accepted
## Context: ...
## Decision: ...
## Consequences: ...
```

---

## Code Review Checklist (produção)

- [ ] OnPush nos dumb components
- [ ] Subscriptions com teardown
- [ ] Sem lógica de negócio no template
- [ ] Testes nos fluxos críticos
- [ ] Acessibilidade básica (labels, aria)
- [ ] Error states tratados na UI

---

## Exemplos

- [`exemplos/feature-structure.md`](./exemplos/feature-structure.md)
- [`exemplos/adr-template.md`](./exemplos/adr-template.md)

---

## Exercícios

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**

---

## Checklist final do curso teórico

- [ ] Seu projeto segue feature folders
- [ ] ADR escrito para 1 decisão técnica
- [ ] Checklist de PR colado no README do projeto

**Próximo:** [Módulo 13 — Projeto Final FinControl](../13-projeto-final-fincontrol/README.md)
