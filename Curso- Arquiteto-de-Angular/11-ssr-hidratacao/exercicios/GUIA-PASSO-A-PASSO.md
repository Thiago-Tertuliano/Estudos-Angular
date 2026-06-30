# Guia passo a passo — Módulo 11

> SSR é opcional no lab — foco em entender **quando** usar.

---

## Passo 1 — Ler conceitos

README do módulo + [`../exemplos/platform-check.service.ts`](../exemplos/platform-check.service.ts)

---

## Passo 2 — Adicionar SSR (opcional)

```bash
cd aula-pratica/angular-lab
ng add @angular/ssr
```

---

## Passo 3 — Proteger localStorage

**Onde:** `auth.service.ts`

```typescript
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

private readonly platformId = inject(PLATFORM_ID);

// só acessa localStorage se isPlatformBrowser(platformId)
```

---

## Passo 4 — Documentar decisão

Crie `docs/adr-001-ssr.md` usando template do módulo 12.

**Próximo:** [Módulo 12](../../12-padroes-enterprise/exercicios/GUIA-PASSO-A-PASSO.md)
