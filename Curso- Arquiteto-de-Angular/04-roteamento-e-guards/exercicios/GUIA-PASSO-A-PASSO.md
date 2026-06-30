# Guia passo a passo — Módulo 04

> Pré-requisito: Módulo 03 (LoggerService + APP_CONFIG).

**Referências:** [`../exemplos/auth.guard.ts`](../exemplos/auth.guard.ts), [`../exemplos/app.routes.ts`](../exemplos/app.routes.ts)

---

## Mapa

```
core/guards/auth.guard.ts
features/auth/
├── data-access/auth.service.ts
└── pages/login.page.ts
app.routes.ts                    ← lazy + guards
```

---

## Passo 1 — AuthService (mock simples)

**Onde:** `features/auth/data-access/auth.service.ts`

Scaffold: [`../aula-pratica/scaffold/auth.service.ts`](../aula-pratica/scaffold/auth.service.ts)

- `signal` para token
- `login(email, password)` — aceita qualquer senha 3+ chars
- `logout()`, `isAuthenticated()`, `getToken()`

---

## Passo 2 — Guards

**Onde:** `core/guards/auth.guard.ts`

Copie de [`../exemplos/auth.guard.ts`](../exemplos/auth.guard.ts) — `authGuard` + `guestGuard`.

---

## Passo 3 — Login Page

**Onde:** `features/auth/pages/login.page.ts`

Scaffold: [`../aula-pratica/scaffold/login.page.ts`](../aula-pratica/scaffold/login.page.ts)

Form com email/senha → chama `auth.login()` → navega para `/playground`.

---

## Passo 4 — Rotas

**Onde:** `app.routes.ts`

```typescript
{ path: '', redirectTo: 'playground', pathMatch: 'full' },
{
  path: 'login',
  canActivate: [guestGuard],
  loadComponent: () => import('@features/auth/pages/login.page').then(m => m.LoginPage),
},
{
  path: 'playground',
  canActivate: [authGuard],
  loadComponent: () => import('@features/playground/pages/playground.page').then(m => m.PlaygroundPage),
},
```

---

## Passo 5 — Testar fluxo

1. Abra `/playground` deslogado → redireciona `/login`
2. Login → volta `/playground`
3. Logout (adicione botão temporário) → `/login`

**Próximo:** [Módulo 05](../../05-forms-reativos/exercicios/GUIA-PASSO-A-PASSO.md)
