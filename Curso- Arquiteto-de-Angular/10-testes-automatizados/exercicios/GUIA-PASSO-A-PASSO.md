# Guia passo a passo — Módulo 10

**Referência:** [`../exemplos/auth.service.spec.ts`](../exemplos/auth.service.spec.ts)

---

## Passo 1 — Criar spec do AuthService

**Onde:** `features/auth/data-access/auth.service.spec.ts`

Scaffold: [`../aula-pratica/scaffold/auth.service.spec.ts`](../aula-pratica/scaffold/auth.service.spec.ts)

Testes mínimos:
1. `login` válido → `isAuthenticated()` true
2. `logout` → false

---

## Passo 2 — Testar ProductCard (dumb)

**Onde:** `features/playground/ui/product-card.component.spec.ts`

Gabarito: [`../aula-pratica/gabarito/product-card.component.spec.ts`](../aula-pratica/gabarito/product-card.component.spec.ts)

---

## Passo 3 — Rodar

```bash
ng test
```

**Próximo:** [Módulo 11](../../11-ssr-hidratacao/exercicios/GUIA-PASSO-A-PASSO.md)
