# Guia passo a passo — Módulo 07

> Pré-requisito: Módulo 06 (ProductFacade com HTTP).

**Referência:** [`../exemplos/search-autocomplete.component.ts`](../exemplos/search-autocomplete.component.ts)

---

## Passo 1 — Busca com debounce + switchMap

**Onde:** `features/playground/ui/catalog-filters.component.ts` OU novo `product-search.component.ts`

Substitua filtro local por:

1. `FormControl` para termo de busca
2. `toObservable(control.valueChanges)`
3. `debounceTime(300)` + `distinctUntilChanged()`
4. `switchMap(term => http.get(...))` — cancela busca anterior
5. `takeUntilDestroyed()` — **sem memory leak**

---

## Passo 2 — Endpoint mock

No `mock-api.interceptor.ts`, adicione:

`GET /api/products/search?q=termo` → filtra array em memória.

---

## Passo 3 — Validar cancelamento

1. Digite rápido "mouse" no campo
2. DevTools → Network: só última request importa
3. Não use `subscribe` sem teardown

---

## Anti-pattern a corrigir

Leia [`../exemplos/subscription-antipattern.ts`](../exemplos/subscription-antipattern.ts) e explique em comentário o que está errado.

**Próximo:** [Módulo 08](../../08-signals-estado-moderno/exercicios/GUIA-PASSO-A-PASSO.md)
