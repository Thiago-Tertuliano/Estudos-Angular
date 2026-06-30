# Guia passo a passo — Módulo 01

> Pré-requisito: módulo 00 concluído (`angular-lab` rodando com pastas `core`, `shared`, `features`).

**Referências para memorizar** (abra lado a lado):
- [`../exemplos/counter.component.ts`](../exemplos/counter.component.ts)
- [`../exemplos/product-card.component.ts`](../exemplos/product-card.component.ts)
- [`../exemplos/user-list.component.html`](../exemplos/user-list.component.html)

---

## Mapa — onde cada arquivo vai

```
angular-lab/src/app/
├── app.routes.ts                          ← Passo 6 (adicionar rota)
└── features/
    └── playground/
        ├── pages/
        │   └── playground.page.ts         ← Passo 5
        └── ui/
            ├── counter.component.ts       ← Passo 1
            ├── product-card.component.ts  ← Passo 2
            └── product-list.component.ts  ← Passo 3
```

**Scaffolds prontos (com TODO):** [`../aula-pratica/scaffold/`](../aula-pratica/scaffold/)

---

## Passo 1 — Counter (signal + computed)

### 1.1 Criar pastas

No Explorer: `src/app/features/playground/ui/`

### 1.2 Criar arquivo

**Onde:** `src/app/features/playground/ui/counter.component.ts`

**Como:** copie `aula-pratica/scaffold/counter.component.ts` para lá e complete os `TODO`.

### 1.3 O que você deve digitar (resumo)

| TODO | O que fazer | Dica do exemplo |
|------|-------------|-----------------|
| signal count | `signal(0)` | `counter.component.ts` linha 15 |
| computed double | `computed(() => this.count() * 2)` | linha 18 |
| increment | `this.count.update(v => v + 1)` | linha 21 |
| reset | `this.count.set(0)` | linha 25 |
| history (exercício extra) | signal com array, guardar últimos 5 | gabarito |

### 1.4 Testar isolado (opcional)

Ainda não tem rota — vá para Passo 5 para ver no browser.

---

## Passo 2 — Product Card (input + output)

### 2.1 Criar arquivo

**Onde:** `src/app/features/playground/ui/product-card.component.ts`

Copie de `aula-pratica/scaffold/product-card.component.ts`.

### 2.2 O que você digita

| TODO | Código | Referência |
|------|--------|------------|
| interface Product | `id`, `name`, `price` | scaffold |
| input product | `input.required<Product>()` | `product-card.component.ts` ex. |
| output addToCart | `output<string>()` | idem |
| template botão | `(click)="addToCart.emit(product().id)"` | idem |

**Conceito:** este componente é **dumb** — não tem lista, não filtra. Só mostra 1 produto.

---

## Passo 3 — Product List (smart + @for)

### 3.1 Criar arquivo

**Onde:** `src/app/features/playground/ui/product-list.component.ts`

### 3.2 O que você digita

| TODO | O que fazer |
|------|-------------|
| signal products | lista mock com 3 produtos |
| computed filtered | filtrar por `search` signal |
| template @for | `track product.id` |
| template @empty | mensagem quando vazio |
| import ProductCard | no array `imports: [...]` |

**Referência HTML:** `user-list.component.html` — mesma lógica de `@if` / `@for` / `@empty`

---

## Passo 4 — Dados mock (copiar e colar)

Use estes produtos no `product-list`:

```typescript
const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Notebook', price: 4500 },
  { id: '2', name: 'Mouse', price: 120 },
  { id: '3', name: 'Teclado', price: 280 },
];
```

---

## Passo 5 — Página Playground (junta os componentes)

### 5.1 Criar arquivo

**Onde:** `src/app/features/playground/pages/playground.page.ts`

Copie scaffold `playground.page.ts`.

### 5.2 Template da página

```html
<h1>Playground — Módulo 01</h1>

<section>
  <h2>Counter</h2>
  <app-counter />
</section>

<section>
  <h2>Produtos</h2>
  <app-product-list />
</section>
```

### 5.3 imports no @Component

```typescript
imports: [CounterComponent, ProductListComponent],
```

---

## Passo 6 — Registrar rota

**Onde:** `src/app/app.routes.ts`

Adicione:

```typescript
{
  path: 'playground',
  loadComponent: () =>
    import('@features/playground/pages/playground.page').then(m => m.PlaygroundPage),
  title: 'Playground',
},
```

**Teste:**
```bash
ng serve
```
Abra `http://localhost:4200/playground`

---

## Passo 7 — Exercício extra (histórico do Counter)

No `counter.component.ts`:

1. Crie `readonly history = signal<number[]>([]);`
2. Em `increment()`, após aumentar count, faça:
   ```typescript
   this.history.update(h => [this.count(), ...h].slice(0, 5));
   ```
3. No template, liste o histórico com `@for`

**Gabarito:** [`../aula-pratica/gabarito/counter.component.ts`](../aula-pratica/gabarito/counter.component.ts)

---

## Passo 8 — Validar

| Teste | Esperado |
|-------|----------|
| `/playground` abre | Página com Counter e Produtos |
| Botão +1 | Count e Double atualizam |
| Lista produtos | 3 cards visíveis |
| Busca vazia com filtro | `@empty` aparece |

---

## Travou?

1. Compare com `exemplos/` (referência do curso)
2. Abra `aula-pratica/gabarito/` **depois** de tentar
3. Envie `@counter.component.ts` ao mentor

**Próximo:** [Módulo 02](../../02-arquitetura-de-componentes/README.md)
