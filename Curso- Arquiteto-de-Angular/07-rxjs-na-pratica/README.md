# Módulo 07 — RxJS na Prática

> **Guia:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **Observable** | Stream de valores ao longo do tempo |
| **subscribe** | Escutar o stream (cuidado com leak!) |
| **switchMap** | Cancela request anterior (buscas) |
| **debounceTime** | Espera parar de digitar |
| **takeUntilDestroyed** | Limpa subscribe ao destruir componente |

## Objetivos

- Dominar operators essenciais: `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`
- Combinar streams: `combineLatest`, `forkJoin`, `withLatestFrom`
- **Evitar memory leaks** com `takeUntilDestroyed`, `async pipe`
- Debounce, distinctUntilChanged, shareReplay

## Contexto

RxJS é a maior fonte de bugs em Angular: subscription esquecida, race condition em autocomplete, duplicate HTTP calls. Dominar operators = você vira o dev que os outros pedem review.

---

## Quando usar cada flatten operator

| Operator | Use quando | Cancela anterior? |
|----------|-----------|-------------------|
| `switchMap` | Autocomplete, busca | ✅ Sim |
| `mergeMap` | Paralelo independente | ❌ Não |
| `concatMap` | Fila ordenada (uploads) | Espera |
| `exhaustMap` | Ignorar cliques duplos | Ignora novos |

---

## takeUntilDestroyed (Angular 16+)

```typescript
export class SearchComponent {
  private readonly destroyRef = inject(DestroyRef);

  search(term$: Observable<string>) {
    term$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.api.search(term)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(results => this.results.set(results));
  }
}
```

---

## shareReplay para cache

```typescript
private categories$ = this.http.get<Category[]>('/api/categories').pipe(
  shareReplay({ bufferSize: 1, refCount: true })
);
```

---

## Exemplos

- [`exemplos/search-autocomplete.component.ts`](./exemplos/search-autocomplete.component.ts)
- [`exemplos/typeahead.operators.ts`](./exemplos/typeahead.operators.ts)
- [`exemplos/subscription-antipattern.ts`](./exemplos/subscription-antipattern.ts) — o que NÃO fazer

---

## Exercícios

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**

---

## Checklist

- [ ] Zero subscribe sem teardown
- [ ] switchMap em buscas
- [ ] shareReplay em dados estáticos de referência

**Próximo:** [Módulo 08 — Signals e Estado Moderno](../08-signals-estado-moderno/README.md)
