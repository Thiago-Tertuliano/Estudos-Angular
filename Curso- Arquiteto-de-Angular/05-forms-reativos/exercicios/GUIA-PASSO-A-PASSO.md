# Guia passo a passo — Módulo 05

> Pré-requisito: Módulo 04 (auth funcionando).

**Referência:** [`../exemplos/transaction-form.component.ts`](../exemplos/transaction-form.component.ts)

---

## Mapa

```
features/playground/ui/product-form.component.ts   ← DUMB form
features/playground/pages/catalog.page.ts          ← escuta (saved)
```

---

## Passo 1 — Product Form (reactive)

**Onde:** `ui/product-form.component.ts`

Scaffold: [`../aula-pratica/scaffold/product-form.component.ts`](../aula-pratica/scaffold/product-form.component.ts)

Campos: `name`, `price` — validators `required`, `min(0.01)`.

`output` `saved` emite `Product` sem id.

---

## Passo 2 — Integrar no Catalog (smart)

No `catalog.page.ts`:

```html
<app-product-form (saved)="onProductSaved($event)" />
```

```typescript
onProductSaved(product: Omit<Product, 'id'>): void {
  this.products.update(list => [{ ...product, id: crypto.randomUUID() }, ...list]);
}
```

---

## Passo 3 — UX de erro

- Botão submit `[disabled]="form.invalid"`
- `markAllAsTouched()` se submit inválido
- Mensagem `@if (form.controls.name.touched && form.controls.name.hasError('required'))`

---

## Validar

- [ ] Adicionar produto pelo form atualiza grid
- [ ] Preço 0 bloqueia submit

**Próximo:** [Módulo 06](../../06-http-interceptors-estado/exercicios/GUIA-PASSO-A-PASSO.md)
