# Como estudar este curso (especialmente se você é iniciante)

Este curso foi pensado para quem **já viu Angular básico** (ex: curso Fernanda) mas ainda não domina arquitetura. Se você está começando do zero, siga esta ordem **sem pular etapas**.

---

## Estrutura de cada módulo

```
XX-nome-do-modulo/
├── README.md                    ← Teoria + glossário (leia primeiro)
├── exemplos/                    ← Código REAL de referência (memorize o padrão)
├── exercicios/
│   ├── README.md                ← Lista do que fazer
│   └── GUIA-PASSO-A-PASSO.md    ← Onde clicar, onde criar, o que VOCÊ digita
└── aula-pratica/
    ├── README.md                ← Como usar os scaffolds
    ├── scaffold/                ← Arquivos com TODO — você completa
    └── gabarito/                ← Resposta completa (só olhe depois de tentar)
```

---

## Fluxo de estudo (1 módulo)

| Passo | O que fazer | Tempo |
|-------|-------------|-------|
| 1 | Ler `README.md` do módulo (inclui glossário) | 20–30 min |
| 2 | Abrir `exemplos/` e ler o código comentado | 20 min |
| 3 | Seguir `exercicios/GUIA-PASSO-A-PASSO.md` | 1–2 h |
| 4 | Completar os arquivos em `aula-pratica/scaffold/` | 1–2 h |
| 5 | Rodar `ng serve` e testar no browser | 10 min |
| 6 | Comparar com `gabarito/` se travar | 15 min |
| 7 | Enviar ao mentor para Code Review | — |

---

## Onde fica seu projeto?

Todo o curso usa **um único projeto** chamado `angular-lab`:

```
Curso- Arquiteto-de-Angular/aula-pratica/angular-lab/
```

(Criado no módulo 00; usado até o módulo 12.)

---

## O que é "scaffold"?

Arquivo **quase pronto** com:

- Imports já escritos
- Estrutura do componente montada
- `// TODO:` marcando **só o que você precisa digitar**

Você não precisa adivinhar onde criar arquivo — o guia diz o caminho exato.

---

## O que é "gabarito"?

Resposta completa do exercício. **Regra:**

1. Tente completar o scaffold sozinho
2. Se travar 20+ minutos, abra o gabarito
3. Digite de novo **sem copiar/colar** — digitar fixa na memória

---

## Glossário rápido (use durante todo o curso)

| Termo | Significado simples |
|-------|---------------------|
| **Component** | Um pedaço de tela (HTML + lógica + estilo) |
| **Standalone** | Componente que não precisa de NgModule |
| **Signal** | Variável reativa: muda → tela atualiza |
| **computed** | Valor calculado automaticamente a partir de signals |
| **input** | Dado que o pai passa para o filho |
| **output** | Evento que o filho envia para o pai |
| **@if / @for** | Sintaxe moderna de condição e loop no HTML |
| **feature** | Pasta de um domínio (ex: produtos, login) |

---

## Travou? Use esta ordem

1. Reler o trecho do `README.md` do módulo
2. Comparar seu código com `exemplos/` (referência oficial)
3. Abrir `gabarito/` e entender a diferença
4. Perguntar ao mentor com `@arquivo` anexado
