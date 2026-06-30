# Guia do Mentor — Como usar este curso com IA

Este curso foi desenhado para funcionar com **Code Review assistido por IA** (Cursor, ChatGPT, etc.).

## Fluxo recomendado por módulo

1. **Leia** o `README.md` do módulo (teoria + contexto).
2. **Estude** os arquivos em `exemplos/`.
3. **Implemente** os exercícios no seu `angular-lab` ou no FinControl.
4. **Envie** seu código ao mentor com o prompt:

```
[Módulo XX] Code Review

Cole aqui seu código ou @arquivo

Perguntas específicas (opcional):
- ...
```

5. **Refatore** com base na nota e feedback (meta: ≥ 8/10).
6. **Marque** o checklist do módulo.

---

## Prompt base para o mentor

Use este prompt nas Rules do Cursor ou no início da conversa:

> Aja como Desenvolvedor Front-end Sênior e Arquiteto Angular. Avalie meu código com nota 0-10, feedback direto, refatoração completa e explicação de conceitos. Tom dev-to-dev, em português.

---

## O que enviar para review

| Tipo | Exemplo |
|------|---------|
| Snippet | Um service ou componente |
| Feature | Pasta `features/transactions/` inteira |
| Dúvida conceitual | "Quando usar switchMap vs exhaustMap?" |
| Projeto final | PR simulado do FinControl |

---

## Metas de proficiência

- **Módulo 04:** Guard + lazy load funcionando
- **Módulo 07:** Zero memory leaks (DevTools → Performance)
- **Módulo 10:** ≥ 5 testes passando
- **Módulo 13:** App deployável + README de portfólio

---

## Dúvidas frequentes

**Posso pular módulos?**  
Se já domina o tema, faça os exercícios e peça review. Se passar ≥ 8, avance.

**Uso o curso da Fernanda junto?**  
Sim. Fernanda = sintaxe e primeiro app. Este curso = arquitetura e engenharia.

**FinControl substitui meu-primeiro-app?**  
Não. São complementares. FinControl é o projeto de consolidação.
