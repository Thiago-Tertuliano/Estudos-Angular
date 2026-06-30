# Guia passo a passo — Módulo 02

> Pré-requisito: Módulo 01 concluído (`playground` com counter + product-list).

**Referências:**
- [`../exemplos/transaction-list.page.ts`](../exemplos/transaction-list.page.ts) — padrão Smart
- [`../exemplos/transaction-table.component.ts`](../exemplos/transaction-table.component.ts) — padrão Dumb + OnPush
- [`../exemplos/transaction-filters.component.ts`](../exemplos/transaction-filters.component.ts) — Dumb com output

**Projeto:** `aula-pratica/angular-lab/` (raiz do curso)

---

## O que você vai fazer

Refatorar o `product-list` monolítico do módulo 01 em arquitetura **feature-based**:

```
features/playground/
├── data-access/
│   └── product.model.ts          ← Passo 1
├── pages/
│   └── catalog.page.ts           ← Passo 2 (SMART — orquestra)
└── ui/
    ├── product-card.component.ts ← já existe (manter dumb)
    ├── catalog-filters.component.ts  ← Passo 3 (DUMB)
    └── product-grid.component.ts     ← Passo 4 (DUMB)
```

---

## Passo 1 — Extrair model (DRY)

**Problema:** `Product` estava duplicado em 2 arquivos.

**Onde criar:** `src/app/features/playground/data-access/product.model.ts`

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
}
```

**Onde editar:** remova `interface Product` de `product-card` e `product-list`; importe:

```typescript
import { Product } from '../data-access/product.model';
// ou de ui: import { Product } from '../data-access/product.model';
```

---

## Passo 2 — Criar Catalog Page (SMART)

**Onde:** `src/app/features/playground/pages/catalog.page.ts`

Copie [`../aula-pratica/scaffold/catalog.page.ts`](../aula-pratica/scaffold/catalog.page.ts) e complete TODOs.

**Responsabilidades do SMART:**
- `signal` de `search` e `products`
- `computed` de `filteredProducts`
- Método `onAdd(id)` — lógica de negócio
- **Não** renderiza HTML de card — delega para dumb

**Template:**
```html
<app-catalog-filters [search]="search()" (searchChange)="search.set($event)" />
<app-product-grid [products]="filteredProducts()" (addToCart)="onAdd($event)" />
```

---

## Passo 3 — Catalog Filters (DUMB)

**Onde:** `src/app/features/playground/ui/catalog-filters.component.ts`

Scaffold: [`../aula-pratica/scaffold/catalog-filters.component.ts`](../aula-pratica/scaffold/catalog-filters.component.ts)

| Regra | Detalhe |
|-------|---------|
| OnPush | `changeDetection: ChangeDetectionStrategy.OnPush` |
| Sem inject() | Zero services |
| input | `search = input.required<string>()` |
| output | `searchChange = output<string>()` |
| Emitir imutável | `this.searchChange.emit($event)` |

---

## Passo 4 — Product Grid (DUMB)

**Onde:** `src/app/features/playground/ui/product-grid.component.ts`

Scaffold: [`../aula-pratica/scaffold/product-grid.component.ts`](../aula-pratica/scaffold/product-grid.component.ts)

- Recebe `products = input.required<Product[]>()`
- `@for` + `track` + `@empty`
- Repassa `(addToCart)` do card para o pai

---

## Passo 5 — Atualizar Playground Page

**Onde:** `playground.page.ts`

Substitua `<app-product-list />` por `<app-catalog-page />` (ou renomeie se preferir manter uma page só).

---

## Passo 6 — Remover arquivo antigo

Apague `product-list.component.ts` após migrar tudo.

---

## Passo 7 — Validar OnPush

1. Abra `/playground`
2. Digite no filtro — lista deve atualizar
3. Clique Adicionar — console deve logar id

Se filtro não atualizar: verifique se emite **valor novo** no output (não muta objeto).

---

## Gabarito

[`../aula-pratica/gabarito/`](../aula-pratica/gabarito/) — consulte depois de tentar.

**Próximo:** [Módulo 03](../../03-injecao-de-dependencia/exercicios/GUIA-PASSO-A-PASSO.md)
