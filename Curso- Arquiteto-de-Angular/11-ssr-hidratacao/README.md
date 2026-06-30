# Módulo 11 — SSR e Hidratação

> **Guia:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **SSR** | HTML gerado no servidor |
| **Hydration** | Browser "ativa" o HTML do servidor |
| **isPlatformBrowser** | Checa se está no browser (não no Node) |

## Objetivos

- Entender **Server-Side Rendering** vs **Client-Side Rendering**
- Configurar Angular SSR com `ng add @angular/ssr`
- Hidratação: o que acontece no browser após HTML do servidor
- `isPlatformBrowser` / `isPlatformServer` para código isomórfico
- SEO e Core Web Vitals (LCP, CLS)

## Contexto

Landing pages, e-commerce e apps públicos precisam de SSR para SEO e first paint. Apps autenticadas (dashboard) muitas vezes ficam CSR — saiba escolher.

---

## Quando usar SSR

| Cenário | SSR? |
|---------|------|
| Landing / marketing | ✅ Sim |
| Blog / conteúdo indexável | ✅ Sim |
| Dashboard autenticado | ⚠️ Opcional |
| App interna enterprise | ❌ Geralmente não |

---

## Setup

```bash
ng add @angular/ssr
ng serve  # dev com SSR
npm run build && npm run serve:ssr:app-name
```

---

## Código isomórfico

```typescript
private readonly platformId = inject(PLATFORM_ID);

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    // localStorage, window, chart libraries
  }
}
```

---

## TransferState (evitar double fetch)

Dados carregados no server são transferidos ao client via `TransferState` — evita 2x HTTP para mesma rota.

---

## Exemplos

- [`exemplos/platform-check.service.ts`](./exemplos/platform-check.service.ts)
- [`exemplos/ssr-safe.component.ts`](./exemplos/ssr-safe.component.ts)

---

## Exercícios

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**

---

## Checklist

- [ ] SSR adicionado ao projeto lab
- [ ] Nenhum acesso a `window`/`document` sem guard
- [ ] Meta tags dinâmicas com `Title`/`Meta` services

**Próximo:** [Módulo 12 — Padrões Enterprise](../12-padroes-enterprise/README.md)
