# Módulo 13 — Projeto Final: FinControl

## Objetivo

Construir um **dashboard de finanças pessoais** aplicando todos os conceitos do curso: arquitetura feature-based, Smart/Dumb components, DI, guards, interceptors, reactive forms, RxJS, signals e testes.

---

## O projeto

O app **FinControl** está em [`fincontrol/`](./fincontrol/).

```bash
cd fincontrol
npm install
ng serve
```

Acesse `http://localhost:4200` → login → dashboard.

**Credenciais demo:** qualquer e-mail válido + senha com 3+ caracteres (ex: `dev@fincontrol.app` / `123`).

---

## Arquitetura implementada

```
fincontrol/src/app/
├── core/           guards, interceptors, layout, tokens
├── shared/         kpi-card, empty-state, not-found
├── features/
│   ├── auth/       login + AuthService
│   ├── dashboard/  KPIs + resumo
│   └── transactions/ CRUD completo
└── app.config.ts   HttpClient + interceptors
```

---

## Fases de implementação (sua evolução)

### Fase 1 — Base (já scaffolded)
- [x] Estrutura core/shared/features
- [x] Auth mock com guards
- [x] Mock API interceptor
- [x] Dashboard com signals/computed
- [x] CRUD de transações

### Fase 2 — Você implementa
- [ ] Testes unitários (AuthService, TransactionTable)
- [ ] Gráfico de despesas por categoria (`@defer`)
- [ ] Paginação na lista de transações
- [ ] Persistência de filtros na URL (query params)

### Fase 3 — Avançado
- [ ] Substituir mock interceptor por API real
- [ ] SSR com `ng add @angular/ssr`
- [ ] NgRx SignalStore ou migrar DashboardStore
- [ ] PWA offline

---

## Critérios de entrega (portfólio)

1. README do projeto com screenshots
2. Arquitetura documentada (diagrama)
3. Pelo menos 5 testes passando
4. Lighthouse Performance > 80
5. Code review com mentor (nota ≥ 8)

---

## Documentação

- [ESPECIFICACAO.md](./ESPECIFICACAO.md) — requisitos funcionais e técnicos
- [fincontrol/README.md](./fincontrol/README.md) — como rodar o projeto

---

**Parabéns por chegar até aqui.** Este projeto é seu cartão de visita como Angular Architect.
