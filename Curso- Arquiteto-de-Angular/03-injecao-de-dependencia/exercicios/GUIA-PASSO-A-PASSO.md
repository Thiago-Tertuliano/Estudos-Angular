# Guia passo a passo — Módulo 03

> Pré-requisito: Módulo 02 (catalog smart/dumb).

**Referências:** [`../exemplos/`](../exemplos/)

---

## Mapa de arquivos

```
src/app/core/
├── tokens/app-config.token.ts    ← Passo 1 (expandir)
└── services/logger.service.ts    ← Passo 2 (criar)

src/app/app.config.ts             ← Passo 3 (provider)
src/app/features/playground/pages/catalog.page.ts  ← Passo 4 (inject)
```

---

## Passo 1 — Expandir APP_CONFIG

**Onde:** `core/tokens/app-config.token.ts`

Adicione `apiUrl: string` à interface (já tem `appName` do módulo 00).

**Referência:** [`../exemplos/app-config.token.ts`](../exemplos/app-config.token.ts)

---

## Passo 2 — LoggerService

**Onde:** `core/services/logger.service.ts`

Scaffold: [`../aula-pratica/scaffold/logger.service.ts`](../aula-pratica/scaffold/logger.service.ts)

```typescript
@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: string): void {
    console.log(`[Angular Lab] ${message}`);
  }
}
```

---

## Passo 3 — Registrar config no bootstrap

**Onde:** `app.config.ts`

```typescript
{
  provide: APP_CONFIG,
  useValue: {
    appName: 'Angular Lab',
    apiUrl: '/api',  // adicionar
  },
},
```

---

## Passo 4 — Usar inject() no CatalogPage

**Onde:** `catalog.page.ts`

```typescript
private readonly logger = inject(LoggerService);

onAdd(id: string): void {
  this.logger.log(`Produto ${id} adicionado`);
}
```

**Regra:** só o **smart** injeta services — nunca o dumb.

---

## Passo 5 (extra) — Provider no componente

Leia [`../exemplos/feature-scoped.service.exemplo.ts`](../exemplos/feature-scoped.service.exemplo.ts) — entenda escopo por componente (não precisa implementar agora).

---

## Validar

- [ ] `inject(LoggerService)` só em `pages/`
- [ ] `inject(APP_CONFIG)` em um service se quiser praticar
- [ ] `ng build` sem erros

**Próximo:** [Módulo 04](../../04-roteamento-e-guards/exercicios/GUIA-PASSO-A-PASSO.md)
