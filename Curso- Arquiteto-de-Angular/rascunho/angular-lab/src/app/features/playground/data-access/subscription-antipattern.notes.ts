/**
 * Referência do módulo 07 — anti-pattern de subscribe sem teardown.
 *
 * Problemas do código abaixo:
 * 1. Subscribe no constructor sem unsubscribe = memory leak
 * 2. mergeMap em busca = race condition (resposta antiga sobrescreve a nova)
 * 3. Múltiplas chamadas HTTP duplicadas
 *
 * Correção aplicada no catalog.page:
 * - debounceTime(300) + distinctUntilChanged()
 * - switchMap para cancelar busca anterior
 * - takeUntilDestroyed(this.destroyRef)
 */
export {};
