# Angular Architect — Curso de Engenharia Front-end

> **Autor do curso:** Thiago Matos Tertuliano  
> **Mentor técnico:** IA (modo Arquiteto de Angular)  
> **Stack alvo:** Angular 21+ · Standalone Components · Signals · RxJS · SSR  
> **Diferencial:** Este curso **não** é introdutório. Ele parte da engenharia real — arquitetura, performance, padrões enterprise e produto escalável.

---

## Por que este curso existe?

O curso da Fernanda Kipper (`Curso-de-Angular-FernandaKipper`) é excelente para **dar os primeiros passos**: instalar, criar componentes, entender o básico. Este curso complementa (e eleva) esse conhecimento com foco em:

| Curso Fernanda | Curso Arquiteto de Angular |
|----------------|---------------------------|
| Primeiro app funcional | App **escalável** e **testável** |
| Sintaxe e conceitos iniciais | **Arquitetura** e **decisões de design** |
| Aprender fazendo | Aprender **pensando como sênior** |
| Um projeto guiado | **12 módulos** + **projeto final enterprise** |

---

## Pré-requisitos

- JavaScript/TypeScript intermediário (tipos, async/await, destructuring)
- HTML/CSS sólidos
- Node.js 20+ e npm 10+
- Angular CLI 21+ (`npm install -g @angular/cli`)
- (Recomendado) Ter concluído ou estar fazendo o curso introdutório da Fernanda

---

## Como estudar

> **Iniciante em Angular?** Leia primeiro: **[COMO-ESTUDAR.md](./COMO-ESTUDAR.md)**  
> Cada módulo tem `exercicios/GUIA-PASSO-A-PASSO.md` (onde clicar) e `aula-pratica/scaffold/` (código com TODO).

1. Siga a ordem numérica dos módulos (`00` → `13`).
2. Leia o `README.md` de cada módulo (inclui **glossário**).
3. Abra `exemplos/` — são as referências reais para memorizar.
4. Siga `exercicios/GUIA-PASSO-A-PASSO.md` — passo a passo com caminhos de arquivo.
5. Complete os `TODO` em `aula-pratica/scaffold/` no seu `angular-lab`.
6. Compare com `gabarito/` só se travar (redigite, não copie).
7. Envie ao mentor para Code Review (nota 0–10).
8. No módulo `13`, construa o **FinControl** — portfólio enterprise.

---

## Roadmap

| # | Módulo | Guia prático | Tempo est. |
|---|--------|--------------|------------|
| 00 | [Setup](./00-setup-e-ambiente/) | [GUIA](./00-setup-e-ambiente/exercicios/GUIA-PASSO-A-PASSO.md) | 2h |
| 01 | [Fundamentos](./01-fundamentos-modernos/) | [GUIA](./01-fundamentos-modernos/exercicios/GUIA-PASSO-A-PASSO.md) | 4h |
| 02 | [Componentes](./02-arquitetura-de-componentes/) | [GUIA](./02-arquitetura-de-componentes/exercicios/GUIA-PASSO-A-PASSO.md) | 6h |
| 03 | [DI](./03-injecao-de-dependencia/) | [GUIA](./03-injecao-de-dependencia/exercicios/GUIA-PASSO-A-PASSO.md) | 5h |
| 04 | [Rotas](./04-roteamento-e-guards/) | [GUIA](./04-roteamento-e-guards/exercicios/GUIA-PASSO-A-PASSO.md) | 5h |
| 05 | [Forms](./05-forms-reativos/) | [GUIA](./05-forms-reativos/exercicios/GUIA-PASSO-A-PASSO.md) | 6h |
| 06 | [HTTP](./06-http-interceptors-estado/) | [GUIA](./06-http-interceptors-estado/exercicios/GUIA-PASSO-A-PASSO.md) | 5h |
| 07 | [RxJS](./07-rxjs-na-pratica/) | [GUIA](./07-rxjs-na-pratica/exercicios/GUIA-PASSO-A-PASSO.md) | 8h |
| 08 | [Signals](./08-signals-estado-moderno/) | [GUIA](./08-signals-estado-moderno/exercicios/GUIA-PASSO-A-PASSO.md) | 6h |
| 09 | [Performance](./09-performance-change-detection/) | [GUIA](./09-performance-change-detection/exercicios/GUIA-PASSO-A-PASSO.md) | 5h |
| 10 | [Testes](./10-testes-automatizados/) | [GUIA](./10-testes-automatizados/exercicios/GUIA-PASSO-A-PASSO.md) | 6h |
| 11 | [SSR](./11-ssr-hidratacao/) | [GUIA](./11-ssr-hidratacao/exercicios/GUIA-PASSO-A-PASSO.md) | 4h |
| 12 | [Enterprise](./12-padroes-enterprise/) | [GUIA](./12-padroes-enterprise/exercicios/GUIA-PASSO-A-PASSO.md) | 4h |
| 13 | [FinControl](./13-projeto-final-fincontrol/) | [Especificação](./13-projeto-final-fincontrol/ESPECIFICACAO.md) | 20h+ |

**Projeto único (módulos 00–12):** [`aula-pratica/angular-lab/`](./aula-pratica/angular-lab/)

**Total estimado:** ~86 horas de estudo prático.

---

## Estrutura de cada módulo

```
XX-nome-do-modulo/
├── README.md                    ← Teoria + glossário
├── exemplos/                    ← Referência real (memorize)
├── exercicios/
│   ├── README.md                ← Lista de exercícios
│   └── GUIA-PASSO-A-PASSO.md    ← Onde criar cada arquivo
└── aula-pratica/
    ├── scaffold/                ← Arquivos com TODO (você completa)
    └── gabarito/                ← Resposta (consulte depois de tentar)
```

---

## Projeto Final: FinControl

Dashboard de finanças pessoais com arquitetura **feature-based**:

- Autenticação (mock JWT)
- CRUD de transações com categorias
- Dashboard com gráficos (signals + computed)
- Filtros reativos com RxJS
- Guards, interceptors, error boundary
- Testes unitários nos serviços críticos
- Preparado para SSR (módulo 11)

Veja a especificação completa em [`13-projeto-final-fincontrol/ESPECIFICACAO.md`](./13-projeto-final-fincontrol/ESPECIFICACAO.md).

---

## Comandos úteis

```bash
# Criar projeto de prática
ng new meu-laboratorio --standalone --style=scss --routing

# Rodar dev server
ng serve

# Testes
ng test

# Build produção
ng build

# SSR (após módulo 11)
ng add @angular/ssr
```

---

## Recursos oficiais

- [Angular Docs](https://angular.dev)
- [RxJS Docs](https://rxjs.dev)
- [Angular Style Guide](https://angular.dev/style-guide)

---

## Próximo passo

Comece pelo módulo **[00 — Setup e Ambiente](./00-setup-e-ambiente/README.md)**.
