# ADR-001: Signals vs RxJS

**Status:** Accepted  
**Data:** 2026-06-29  
**Autores:** Thiago Matos Tertuliano

## Contexto

O Angular Lab mistura dados HTTP (assíncronos) com estado derivado de UI (filtros, KPIs). Precisávamos de uma regra clara para evitar subscribe sem teardown e over-engineering com NgRx.

## Decisão

- **RxJS** para HTTP, debounce de busca (`switchMap` + `takeUntilDestroyed`)
- **Signals** para estado de tela, `computed` para totais (`CatalogStore`)
- **Facade** como fronteira entre page e API

## Alternativas consideradas

1. **NgRx SignalStore** — poderoso, mas excessivo para o lab
2. **Tudo em RxJS** — mais boilerplate e risco de memory leak
3. **Tudo em Signals** — HTTP ainda exige Observables

## Consequências

### Positivas

- Código legível para apps médias
- KPIs reativos sem subscribe extra
- Busca cancelável com `switchMap`

### Negativas

- Duas mentalidades (Signals + RxJS) no mesmo projeto
- Exige disciplina na fronteira facade/page

## Referências

- Módulo 07 — RxJS na prática
- Módulo 08 — Signals estado moderno
