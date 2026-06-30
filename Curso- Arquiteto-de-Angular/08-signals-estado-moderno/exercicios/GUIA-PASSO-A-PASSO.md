# Guia passo a passo — Módulo 08

> **Referência:** [`../exemplos/dashboard.store.ts`](../exemplos/dashboard.store.ts)

---

## Passo 1 — CatalogStore

**Onde:** `features/playground/data-access/catalog.store.ts`

Scaffold: [`../aula-pratica/scaffold/catalog.store.ts`](../aula-pratica/scaffold/catalog.store.ts)

Signals:
- `products` (readonly do facade)
- `totalValue` = computed soma de prices
- `cheapest` = computed menor preço

---

## Passo 2 — KPI na playground page

Template dumb:

```html
<p>Total em estoque: {{ store.totalValue() | currency:'BRL' }}</p>
<p>Mais barato: {{ store.cheapest()?.name }}</p>
```

Smart injeta store, dumb só exibe se preferir separar depois.

---

## Passo 3 — Regra Signals vs RxJS

| Dado | Ferramenta |
|------|------------|
| Lista da API | Facade + HTTP (RxJS) |
| Totais derivados | computed (Signals) |
| Tab ativa, modal | signal |

**Próximo:** [Módulo 09](../../09-performance-change-detection/exercicios/GUIA-PASSO-A-PASSO.md)
