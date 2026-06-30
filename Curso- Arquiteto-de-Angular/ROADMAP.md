# Roadmap Visual — Angular Architect

```mermaid
flowchart TD
    subgraph fundacao [Fundação]
        M00[00 Setup]
        M01[01 Fundamentos Modernos]
    end

    subgraph arquitetura [Arquitetura]
        M02[02 Componentes Smart/Dumb]
        M03[03 Injeção de Dependência]
        M04[04 Roteamento e Guards]
    end

    subgraph dados [Dados e Estado]
        M05[05 Forms Reativos]
        M06[06 HTTP e Interceptors]
        M07[07 RxJS na Prática]
        M08[08 Signals]
    end

    subgraph qualidade [Qualidade e Escala]
        M09[09 Performance]
        M10[10 Testes]
        M11[11 SSR]
        M12[12 Padrões Enterprise]
    end

    subgraph entrega [Entrega]
        M13[13 FinControl — Projeto Final]
    end

    M00 --> M01 --> M02 --> M03 --> M04
    M04 --> M05 --> M06 --> M07 --> M08
    M08 --> M09 --> M10 --> M11 --> M12 --> M13
```

## Marcos de competência

| Marco | Após módulo | Você consegue... |
|-------|-------------|------------------|
| 🟢 Junior+ | 04 | Estruturar features com rotas lazy e guards |
| 🟡 Pleno | 08 | Combinar RxJS + Signals sem vazamento de memória |
| 🟠 Pleno+ | 10 | Entregar código com testes e OnPush |
| 🔴 Sênior | 13 | Projetar e entregar app enterprise completo |

## Ritmo sugerido

- **Intensivo (4 semanas):** 20h/semana
- **Moderado (8 semanas):** 10h/semana
- **Leve (16 semanas):** 5h/semana

Revise cada módulo com o mentor: envie código, receba nota e refatoração.
