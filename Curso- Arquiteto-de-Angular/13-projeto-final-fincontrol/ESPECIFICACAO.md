# FinControl — Especificação Técnica

## Visão geral

**FinControl** é um dashboard de finanças pessoais para consolidar aprendizado do curso Angular Architect.

| Campo | Valor |
|-------|-------|
| Stack | Angular 21, Standalone, Signals, RxJS, SCSS |
| Backend | Mock in-memory via HttpInterceptor |
| Auth | JWT mock em localStorage |

---

## Requisitos funcionais

### RF-01 Autenticação
- Login com e-mail e senha
- Guard protege rotas autenticadas
- Logout limpa sessão
- Redirect para login em 401

### RF-02 Dashboard
- Exibir receitas, despesas, saldo e total de transações
- Listar 5 transações mais recentes
- Atualizar ao CRUD de transações

### RF-03 Transações
- Listar com filtro por texto e tipo
- Criar transação (descrição, valor, tipo, categoria, data)
- Excluir transação
- Feedback de loading e erro

### RF-04 Categorias
- Listar categorias por tipo (receita/despesa)
- Associar transação a categoria

---

## Requisitos não-funcionais

### RNF-01 Arquitetura
- Feature folders (`pages`, `ui`, `data-access`)
- Smart vs Dumb components
- Path aliases `@core`, `@shared`, `@features`

### RNF-02 Performance
- OnPush em componentes presentational
- `@for` com `track`
- Lazy loading de features

### RNF-03 Manutenibilidade
- Strict TypeScript
- Facade para acesso a dados
- Interceptors centralizados

---

## API Mock (interceptor)

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Autenticação |
| GET | `/api/transactions` | Lista transações |
| POST | `/api/transactions` | Cria transação |
| DELETE | `/api/transactions/:id` | Remove transação |
| GET | `/api/categories` | Lista categorias |
| GET | `/api/transactions/search?q=` | Autocomplete |

---

## Modelos de dados

```typescript
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
  date: string; // ISO date YYYY-MM-DD
}

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}
```

---

## User stories para Fase 2

1. **Como usuário**, quero ver gráfico de despesas por categoria no dashboard.
2. **Como usuário**, quero que filtros fiquem na URL para compartilhar.
3. **Como dev**, quero testes no AuthService e TransactionFacade.
4. **Como dev**, quero trocar mock por API real alterando só `APP_CONFIG` e removendo interceptor mock.

---

## Definition of Done

- [ ] `ng build` sem erros
- [ ] `ng test` com testes críticos passando
- [ ] Fluxo login → dashboard → CRUD → logout funcional
- [ ] README com instruções de execução
- [ ] Code review mentor ≥ 8/10
