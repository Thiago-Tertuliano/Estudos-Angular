# Módulo 09 — Performance e Change Detection

> **Guia:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **Change Detection** | Angular verifica o que mudou na tela |
| **OnPush** | CD só quando inputs mudam |
| **@defer** | Carrega componente pesado sob demanda |
| **track** | ID único em listas para performance |

## Objetivos

- `ChangeDetectionStrategy.OnPush` em todo componente dumb
- `@for` com `track` — nunca esquecer
- Lazy loading e preloading strategies
- Analisar bundle com `ng build --stats-json`
- Defer blocks (`@defer`) para componentes pesados

## Contexto

Performance não é otimização prematura — é requisito em apps com tabelas grandes, dashboards e mobile. OnPush mal usado quebra UI; bem usado reduz CD em 80%+.

---

## OnPush checklist

1. Inputs são imutáveis (novo objeto/array a cada mudança)
2. Events locais disparam CD no componente
3. Async pipe ou signals disparam CD automaticamente

---

## @defer (Angular 17+)

```html
@defer (on viewport) {
  <app-heavy-chart [data]="chartData()" />
} @placeholder {
  <div class="skeleton">Carregando gráfico...</div>
} @error {
  <p>Falha ao carregar gráfico.</p>
}
```

---

## Preloading

```typescript
provideRouter(routes, withPreloading(PreloadAllModules))
// Ou custom: preload só rotas autenticadas
```

---

## Exemplos

- [`exemplos/on-push.component.ts`](./exemplos/on-push.component.ts)
- [`exemplos/defer-chart.example.html`](./exemplos/defer-chart.example.html)

---

## Exercícios

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**

---

## Checklist

- [ ] Todos dumb components com OnPush
- [ ] track em todas as listas
- [ ] Bundle analisado — nenhum chunk > 500kb sem lazy

**Próximo:** [Módulo 10 — Testes](../10-testes-automatizados/README.md)
