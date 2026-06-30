# Módulo 10 — Testes Automatizados

> **Guia:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **TestBed** | Ambiente de teste do Angular |
| **fixture** | Componente renderizado no teste |
| **setInput** | Define input em teste de dumb |
| **HttpTestingController** | Mock de HTTP em testes |

## Objetivos

- Testes unitários de services com `TestBed`
- Testes de componentes dumb (render + output)
- HTTP testing com `HttpTestingController`
- Vitest/Jasmine — padrão Angular 21

## Contexto

Empresa que contrata sênior espera testes nos fluxos críticos: auth, pagamento, CRUD. Sem testes, refatorar vira roulette.

---

## Teste de service

```typescript
it('should login and store token', () => {
  const httpMock = TestBed.inject(HttpTestingController);
  service.login('a@b.com', '123').subscribe();
  const req = httpMock.expectOne('/api/auth/login');
  req.flush({ token: 'abc', user: { id: '1', email: 'a@b.com', name: 'A' } });
  expect(service.isAuthenticated()).toBe(true);
  httpMock.verify();
});
```

---

## Teste de dumb component

```typescript
it('should emit delete on click', () => {
  const deleteSpy = vi.fn();
  fixture.componentRef.setInput('transactions', mockData);
  component.delete.subscribe(deleteSpy);
  fixture.detectChanges();
  button.click();
  expect(deleteSpy).toHaveBeenCalledWith('tx-1');
});
```

---

## Exemplos

- [`exemplos/auth.service.spec.ts`](./exemplos/auth.service.spec.ts)
- [`exemplos/transaction-table.component.spec.ts`](./exemplos/transaction-table.component.spec.ts)

---

## Exercícios

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**

---

## Checklist

- [ ] AuthService testado (login/logout/401)
- [ ] Pelo menos 1 dumb component testado
- [ ] HttpTestingController sem leaks

**Próximo:** [Módulo 11 — SSR](../11-ssr-hidratacao/README.md)
