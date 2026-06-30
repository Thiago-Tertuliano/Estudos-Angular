# Guia passo a passo — Módulo 00

> Siga na ordem. Não pule etapas. Cada passo diz **onde** você está e **o que** fazer.

**Projeto alvo:** `aula-pratica/angular-lab/` (na raiz do curso)

---

## Passo 0 — O que você vai construir

Ao final deste módulo você terá:

```
aula-pratica/angular-lab/
└── src/app/
    ├── core/
    │   ├── README.md
    │   └── tokens/app-config.token.ts    ← você cria no Passo 5
    ├── shared/README.md
    ├── features/README.md
    ├── app.config.ts                     ← você edita no Passo 5
    └── ... (arquivos gerados pelo ng new)
```

---

## Passo 1 — Criar o projeto (terminal)

**Onde:** terminal, na pasta `aula-pratica/` (raiz do curso)

```bash
cd "Estudos-AngularJS/Curso- Arquiteto-de-Angular/aula-pratica"

ng new angular-lab --standalone --style=scss --routing --ssr=false
```

Quando perguntar algo, aceite os defaults (`--defaults` se quiser pular perguntas).

**Teste:**
```bash
cd angular-lab
ng serve
```
Abra `http://localhost:4200` — deve aparecer a tela padrão do Angular.

---

## Passo 2 — Criar pastas (Explorer do VS Code)

**Onde:** `angular-lab/src/app/`

Clique com botão direito em `app` → **New Folder** e crie:

| Pasta | Caminho completo |
|-------|------------------|
| core | `src/app/core/` |
| shared | `src/app/shared/` |
| features | `src/app/features/` |

Dentro de `core`, crie outra pasta: `tokens` → `src/app/core/tokens/`

---

## Passo 3 — Criar READMEs (3 arquivos)

**Onde:** uma pasta por README

### `src/app/core/README.md`
```markdown
# core/

Services singleton (uma instância no app inteiro): auth, interceptors, guards.
Tokens de configuração (APP_CONFIG).
Não coloque componentes de tela aqui.
```

### `src/app/shared/README.md`
```markdown
# shared/

Componentes visuais reutilizáveis (botões, cards, tabelas).
Pipes e diretivas compartilhadas.
Componentes "dumb": só recebem dados, não chamam API.
```

### `src/app/features/README.md`
```markdown
# features/

Uma pasta por domínio de negócio (login, produtos, dashboard).
Cada feature tem: pages/, ui/, data-access/.
Componentes "smart": orquestram dados e chamam services.
```

---

## Passo 4 — Configurar path aliases

**Onde editar:** `angular-lab/tsconfig.app.json`

Abra o arquivo e deixe `compilerOptions` assim (adicione `baseUrl` e `paths`):

```json
"compilerOptions": {
  "outDir": "./out-tsc/app",
  "types": [],
  "baseUrl": "./",
  "paths": {
    "@core/*": ["src/app/core/*"],
    "@shared/*": ["src/app/shared/*"],
    "@features/*": ["src/app/features/*"]
  }
}
```

**Referência:** compare com [`../exemplos/paths-alias.exemplo.ts`](../exemplos/paths-alias.exemplo.ts)

---

## Passo 5 — Criar token e validar alias (VOCÊ digita)

### 5.1 Criar arquivo

**Onde:** `src/app/core/tokens/app-config.token.ts`

**O que digitar** (ou copie do scaffold em `aula-pratica/scaffold/` se existir):

```typescript
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  appName: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
```

**Referência memorização:** [`../exemplos/app.config.exemplo.ts`](../exemplos/app.config.exemplo.ts)

### 5.2 Editar app.config.ts

**Onde:** `src/app/app.config.ts`

Adicione no topo:
```typescript
import { APP_CONFIG } from '@core/tokens/app-config.token';
```

Dentro de `providers: [...]`, adicione:
```typescript
{
  provide: APP_CONFIG,
  useValue: { appName: 'angular-lab' },
},
```

Se `ng serve` compilar **sem erro**, seus aliases funcionam.

---

## Passo 6 — ESLint (opcional mas recomendado)

**Onde:** terminal, na raiz do `angular-lab`

```bash
ng add @angular-eslint/schematics
```

Aceite as opções padrão.

---

## Passo 7 — Validar tudo

```bash
ng build
ng serve
```

| Check | Esperado |
|-------|----------|
| `ng build` | Sem erros |
| `ng serve` | Abre no browser |
| Import `@core/...` | Compila sem erro |

---

## Passo 8 — Code Review

Envie ao mentor:
- `tsconfig.app.json`
- `src/app/app.config.ts`
- Print ou lista da pasta `src/app/`

**Próximo módulo:** [01 — Fundamentos Modernos](../../01-fundamentos-modernos/README.md)
