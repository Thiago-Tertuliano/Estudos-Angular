# Módulo 01 — Fundamentos Modernos do Angular

> **Iniciante?** Leia o [COMO-ESTUDAR.md](../COMO-ESTUDAR.md) e faça os exercícios pelo [GUIA-PASSO-A-PASSO](./exercicios/GUIA-PASSO-A-PASSO.md).

## Objetivos

- Entender o que é um **componente** no Angular moderno
- Usar **Signals** para estado na tela
- Usar **Control Flow** (`@if`, `@for`) no HTML
- Passar dados com **input()** e eventos com **output()**

---

## Glossário deste módulo

| Termo | Explicação com analogia |
|-------|-------------------------|
| **Component** | Uma "peça de LEGO" da tela. Tem nome (`app-counter`), HTML e lógica. |
| **standalone: true** | A peça funciona sozinha, sem precisar declarar em um módulo antigo. |
| **signal(0)** | Caixa com valor `0`. Quando muda, Angular atualiza a tela. |
| **count()** | Abrir a caixa e ler o valor. No template **sempre** use `()`. |
| **computed** | Valor que recalcula sozinho quando outro signal muda (ex: dobro do count). |
| **input()** | O componente pai "empurra" dados para dentro do filho. |
| **output()** | O filho "grita" um evento pro pai ouvir (ex: botão clicado). |
| **@if** | Se condição for verdadeira, mostra bloco HTML. |
| **@for** | Repete HTML para cada item de uma lista. |
| **track** | Diz ao Angular o ID único de cada item (performance). |

---

## 1. O que é um Component? (visão iniciante)

Todo componente Angular tem **3 partes**:

```
counter.component.ts   ← lógica (TypeScript)
counter.component.html ← visual (opcional se usar template inline)
counter.component.scss ← estilo (opcional)
```

No curso usamos muito **template inline** (HTML dentro do `.ts`) para exemplos menores.

### Anatomia mínima

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',      // tag HTML: <app-counter />
  standalone: true,             // moderno — sempre true neste curso
  template: `<p>{{ count() }}</p>`,
})
export class CounterComponent {
  readonly count = signal(0);   // estado
}
```

**Memorize:** `selector` = nome da tag | `signal` = estado | `()` no template = ler signal

---

## 2. Control Flow — HTML moderno

### Antes (não use em código novo)
```html
<div *ngIf="loading">...</div>
<li *ngFor="let item of items">...</li>
```

### Agora (Angular 17+)
```html
@if (loading()) {
  <p>Carregando...</p>
} @else {
  <p>Pronto!</p>
}

@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>Lista vazia</li>
}
```

**Referência real:** [`exemplos/user-list.component.html`](./exemplos/user-list.component.html)

---

## 3. Signals — estado local

```typescript
readonly count = signal(0);                           // criar
readonly double = computed(() => this.count() * 2);   // derivado

increment(): void {
  this.count.update(v => v + 1);   // novo valor baseado no anterior
}

reset(): void {
  this.count.set(0);               // valor fixo
}
```

**Referência real:** [`exemplos/counter.component.ts`](./exemplos/counter.component.ts)

---

## 4. input() e output() — comunicação pai ↔ filho

```typescript
// FILHO recebe produto do pai
readonly product = input.required<Product>();

// FILHO avisa pai que clicou
readonly addToCart = output<string>();

onClick(): void {
  this.addToCart.emit(this.product().id);
}
```

**Referência real:** [`exemplos/product-card.component.ts`](./exemplos/product-card.component.ts)

---

## Onde praticar (seu angular-lab)

Neste módulo você vai criar uma feature de estudos:

```
angular-lab/src/app/features/playground/
├── pages/
│   └── playground.page.ts       ← página que junta tudo
└── ui/
    ├── counter.component.ts
    ├── product-card.component.ts
    └── product-list.component.ts
```

Siga o guia: [`exercicios/GUIA-PASSO-A-PASSO.md`](./exercicios/GUIA-PASSO-A-PASSO.md)

Arquivos com TODO: [`aula-pratica/scaffold/`](./aula-pratica/scaffold/)

---

## Exemplos (memorização)

| Arquivo | O que aprender |
|---------|----------------|
| [`counter.component.ts`](./exemplos/counter.component.ts) | signal + computed + botões |
| [`user-list.component.html`](./exemplos/user-list.component.html) | @if, @for, @empty |
| [`product-card.component.ts`](./exemplos/product-card.component.ts) | input + output |

---

## Exercícios

| # | Descrição | Scaffold |
|---|-----------|----------|
| 1 | Counter com histórico | `scaffold/counter.component.ts` |
| 2 | Product card (dumb) | `scaffold/product-card.component.ts` |
| 3 | Product list (smart) | `scaffold/product-list.component.ts` |
| 4 | Registrar rota playground | `scaffold/playground.page.ts` |

Detalhes: [`exercicios/README.md`](./exercicios/README.md)

---

## Anti-patterns

| ❌ Evite | ✅ Faça |
|---------|--------|
| `*ngIf` / `*ngFor` | `@if` / `@for` |
| `{{ count }}` sem parênteses | `{{ count() }}` |
| Mutar array com `.push()` dentro de signal | `update(list => [...list, novo])` |

---

## Checklist

- [ ] Counter funciona em `/playground`
- [ ] Lista de produtos com `@for` + `track`
- [ ] `@empty` quando lista vazia
- [ ] ProductCard emite evento ao pai

**Próximo:** [Módulo 02 — Arquitetura de Componentes](../02-arquitetura-de-componentes/README.md)
