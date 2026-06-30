# Guia passo a passo — Módulo 12

---

## Passo 1 — Desenhar estrutura final do lab

Compare seu `angular-lab` com [`../exemplos/feature-structure.md`](../exemplos/feature-structure.md).

Crie `docs/ARQUITETURA.md` no angular-lab listando:
- O que vai em core / shared / features
- Regras de import

---

## Passo 2 — ADR

**Onde:** `angular-lab/docs/adr-001-signals-vs-rxjs.md`

Use template: [`../exemplos/adr-template.md`](../exemplos/adr-template.md)

Decisão: "Signals para UI state, RxJS para HTTP streams"

---

## Passo 3 — Code review checklist

Cole no README do angular-lab:

- [ ] OnPush nos dumb
- [ ] Sem subscribe sem teardown
- [ ] Feature folders
- [ ] Testes críticos passando

---

## Passo 4 — Preparar para FinControl

Leia [Módulo 13](../../13-projeto-final-fincontrol/README.md) — seu lab foi o treino, FinControl é o produto final.

**Próximo:** [FinControl](../../13-projeto-final-fincontrol/README.md)
