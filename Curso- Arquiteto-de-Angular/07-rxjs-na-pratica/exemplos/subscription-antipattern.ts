/**
 * ❌ ANTIPATTERN — NÃO FAÇA ISSO EM PRODUÇÃO
 *
 * Problemas:
 * 1. Subscribe no constructor sem unsubscribe = memory leak
 * 2. mergeMap em input de busca = race condition (resposta antiga sobrescreve nova)
 * 3. Múltiplas chamadas HTTP duplicadas
 */

// import { Component, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { mergeMap } from 'rxjs/operators';

// @Component({ ... })
// export class BadSearchComponent {
//   private http = inject(HttpClient);
//
//   constructor() {
//     this.searchInput.addEventListener('input', (e) => {
//       const term = (e.target as HTMLInputElement).value;
//       this.http.get(`/api/search?q=${term}`).pipe(
//         mergeMap(r => r) // wrong operator for search
//       ).subscribe(data => this.results = data); // LEAK!
//     });
//   }
// }

/**
 * ✅ CORREÇÃO:
 * - switchMap + debounceTime + takeUntilDestroyed
 * - Ou toSignal() com rxMethod / resource API
 * - Ou async pipe no template
 */

export {};
