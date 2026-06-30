# Módulo 00 — Setup e Ambiente

> **Iniciante?** Abra [`exercicios/GUIA-PASSO-A-PASSO.md`](./exercicios/GUIA-PASSO-A-PASSO.md) e siga passo a passo.  
> Metodologia geral: [`COMO-ESTUDAR.md`](../COMO-ESTUDAR.md)

## Objetivos

- Configurar ambiente profissional de desenvolvimento Angular
- Entender a estrutura de um projeto Angular 21 (standalone)
- Definir convenções que você usará em todo o curso

## A dor que este módulo resolve

Projetos Angular mal organizados desde o dia 1 viram **dívida técnica permanente**. Antes de escrever feature, você precisa de tooling, convenções e estrutura de pastas que escalem.

---

## 1. Instalação

```bash
# Node LTS (20 ou 22)
node -v

# Angular CLI global
npm install -g @angular/cli@21

# Verificar
ng version
```

### Extensões VS Code recomendadas

- Angular Language Service
- ESLint
- Prettier
- EditorConfig

---

## 2. Criar projeto de laboratório

```bash
ng new angular-lab --standalone --style=scss --routing --ssr=false
cd angular-lab
ng serve
```

Acesse `http://localhost:4200`.

---

## 3. Estrutura de pastas (convenção do curso)

```
src/app/
├── core/           # Singletons: auth, interceptors, guards
├── shared/         # Componentes/pipes/diretivas reutilizáveis (dumb)
├── features/       # Domínios de negócio (smart containers)
│   └── transactions/
│       ├── data-access/
│       ├── ui/
│       └── pages/
└── app.config.ts
```

> **Regra de ouro:** `core` importa de ninguém. `shared` importa só de `core`. `features` importam de `shared` e `core`.

---

## 4. Configurações essenciais

### `tsconfig.json` — strict mode

Confirme que `"strict": true` está ativo. Tipagem fraca = bugs em produção.

### Prettier + ESLint

```bash
ng add @angular-eslint/schematics
```

---

## 5. Scripts úteis no `package.json`

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "format": "prettier --write \"src/**/*.{ts,html,scss}\""
  }
}
```

---

## Exemplos deste módulo

Veja [`exemplos/`](./exemplos/):

- `app.config.exemplo.ts` — providers base de um app enterprise
- `paths-alias.exemplo.ts` — como configurar `@core`, `@shared`, `@features`

---

## Exercícios

**Não faça no escuro** — use o guia:

→ **[exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**

Resumo:
1. Criar `angular-lab` em `aula-pratica/`
2. Pastas `src/app/{core,shared,features}/` + READMEs
3. Path aliases + `APP_CONFIG` com import `@core/...`
4. `ng serve` e `ng build` sem erros

---

## Anti-patterns

| ❌ Evite | ✅ Faça |
|---------|--------|
| Tudo dentro de `app/` flat | Feature folders desde o início |
| Desabilitar strict | Strict sempre on |
| Lógica de negócio no componente root | Root só orquestra layout |

---

## Checklist de domínio

- [ ] Node 20+ e Angular CLI 21 instalados
- [ ] Projeto `angular-lab` criado e rodando
- [ ] Pastas `core`, `shared`, `features` criadas
- [ ] Path aliases configurados
- [ ] ESLint/Prettier configurados

---

**Próximo:** [Módulo 01 — Fundamentos Modernos](../01-fundamentos-modernos/README.md)
