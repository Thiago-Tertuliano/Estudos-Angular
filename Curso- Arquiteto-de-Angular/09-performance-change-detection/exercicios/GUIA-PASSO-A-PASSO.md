# Guia passo a passo — Módulo 09

---

## Passo 1 — Auditoria OnPush

Revise **todos** arquivos em `features/playground/ui/`:

- [ ] `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] Inputs imutáveis (objeto novo no emit)

---

## Passo 2 — track em toda lista

Grep no projeto: `@for` sem `track` = corrigir.

---

## Passo 3 — @defer no counter (opcional)

**Onde:** `playground.page.ts`

```html
@defer (on viewport) {
  <app-counter />
} @placeholder {
  <p>Carregando counter...</p>
}
```

Referência: [`../exemplos/defer-chart.example.html`](../exemplos/defer-chart.example.html)

---

## Passo 4 — Bundle

```bash
ng build --stats-json
```

Abra `dist/stats.json` no [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) ou anote tamanho do chunk `playground`.

**Próximo:** [Módulo 10](../../10-testes-automatizados/exercicios/GUIA-PASSO-A-PASSO.md)
