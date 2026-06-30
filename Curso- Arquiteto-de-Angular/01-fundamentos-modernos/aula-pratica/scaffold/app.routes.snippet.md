# Scaffold — app.routes.ts (trecho)

Adicione este objeto no array `routes` do seu `angular-lab/src/app/app.routes.ts`:

```typescript
{
  path: 'playground',
  loadComponent: () =>
    import('@features/playground/pages/playground.page').then((m) => m.PlaygroundPage),
  title: 'Playground — Módulo 01',
},
```

Teste: `http://localhost:4200/playground`
