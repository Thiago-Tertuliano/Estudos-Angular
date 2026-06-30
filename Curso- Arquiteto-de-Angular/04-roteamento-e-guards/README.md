# Módulo 04 — Roteamento e Guards

> **Guia:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **Route** | URL → componente |
| **lazy load** | Carrega código só quando acessa a rota |
| **Guard** | "Porteiro" — bloqueia ou libera navegação |
| **canActivate** | Guard antes de entrar na rota |
| **loadComponent** | Lazy de componente standalone |

## Objetivos

- Configurar rotas com **lazy loading** standalone
- Implementar **functional guards** (`CanActivateFn`)
- Usar **resolvers** para pré-carregar dados
- Bind de route params como `@Input` via `withComponentInputBinding`

## Contexto

Apps enterprise têm dezenas de features. Carregar tudo no bootstrap = bundle gigante e TTI lento. Guards protegem rotas; resolvers evitam flash de loading na UI.

---

## Lazy loading (standalone)

```typescript
{
  path: 'transactions',
  loadComponent: () =>
    import('./features/transactions/pages/transaction-list.page')
      .then(m => m.TransactionListPage),
}
```

---

## Functional Guard

```typescript
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
```

---

## Route com data e title

```typescript
{
  path: 'dashboard',
  loadComponent: () => import('./dashboard.page').then(m => m.DashboardPage),
  canActivate: [authGuard],
  title: 'Dashboard — FinControl',
  data: { breadcrumb: 'Dashboard' },
}
```

---

## Exemplos

- [`exemplos/app.routes.ts`](./exemplos/app.routes.ts)
- [`exemplos/auth.guard.ts`](./exemplos/auth.guard.ts)
- [`exemplos/transaction.resolver.ts`](./exemplos/transaction.resolver.ts)

---

## Exercícios

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)** — auth + guards no `angular-lab`

---

## Checklist

- [ ] Lazy loading funcionando (ver Network tab — chunks separados)
- [ ] Guard redireciona para login
- [ ] Title dinâmico na aba do browser

**Próximo:** [Módulo 05 — Forms Reativos](../05-forms-reativos/README.md)
