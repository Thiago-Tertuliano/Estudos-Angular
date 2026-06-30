# Módulo 08 — Signals e Estado Moderno

> **Guia:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **effect** | Side effect quando signal muda |
| **toSignal** | Converte Observable → Signal |
| **toObservable** | Converte Signal → Observable |
| **Store** | Classe com signals centralizados da feature |

## Objetivos

- `signal`, `computed`, `effect` — quando usar cada um
- `linkedSignal` e `resource()` (Angular 19+)
- Ponte RxJS ↔ Signals: `toSignal`, `toObservable`
- Estratégia híbrida: Signals para UI state, RxJS para event streams

## Contexto

Signals simplificam change detection e tornam estado derivado explícito. Mas RxJS ainda domina HTTP e eventos. O profissional sênior sabe **combinar** os dois — não escolher um religiosamente.

---

## Regras práticas

| Cenário | Ferramenta |
|---------|-----------|
| Estado local de UI (modal aberto, tab ativa) | `signal` |
| Valor derivado (total, filtro aplicado) | `computed` |
| Side effect (log, persist localStorage) | `effect` |
| HTTP / WebSocket / timers | RxJS → `toSignal` |
| Autocomplete / drag events | RxJS puro |

---

## resource() para async data

```typescript
transactionResource = resource({
  loader: () => fetch(`/api/transactions/${this.id()}`).then(r => r.json()),
});
// template: transactionResource.value(), transactionResource.isLoading()
```

---

## toSignal com initialValue

```typescript
categories = toSignal(this.categoryService.getAll$(), { initialValue: [] });
```

---

## Exemplos

- [`exemplos/dashboard.store.ts`](./exemplos/dashboard.store.ts)
- [`exemplos/rxjs-signal-bridge.ts`](./exemplos/rxjs-signal-bridge.ts)

---

## Exercícios

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**

---

## Checklist

- [ ] computed para derivados (sem lógica no template)
- [ ] effect sem mutar outros signals circularmente
- [ ] HTTP exposto como signal via toSignal ou resource

**Próximo:** [Módulo 09 — Performance](../09-performance-change-detection/README.md)
