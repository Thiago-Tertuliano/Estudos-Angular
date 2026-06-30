# Módulo 06 — HTTP, Interceptors e Estado

> **Guia:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **HttpClient** | Service do Angular para chamadas HTTP |
| **Interceptor** | Middleware — altera request/response globalmente |
| **Facade** | Camada única entre UI e API |
| **finalize** | Operator RxJS que roda ao terminar (loading off) |

## Objetivos

- Configurar `provideHttpClient` com interceptors funcionais
- Centralizar auth token e error handling
- Padrão **facade service** para estado de API
- Tratar loading/error de forma consistente

## Contexto

Sem interceptors, cada service repete headers, tratamento de 401 e parse de erro. Em apps com 30+ endpoints, isso vira caos. Interceptors + facade = código DRY e UX consistente.

---

## Auth Interceptor

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  if (!token) return next(req);
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
```

---

## Error Interceptor

```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) router.navigate(['/login']);
      return throwError(() => error);
    })
  );
};
```

---

## Facade Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class TransactionFacade {
  private readonly api = inject(TransactionApi);
  readonly items = signal<Transaction[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  load(): void { /* orquestra api + signals */ }
}
```

---

## Exemplos

- [`exemplos/auth.interceptor.ts`](./exemplos/auth.interceptor.ts)
- [`exemplos/error.interceptor.ts`](./exemplos/error.interceptor.ts)
- [`exemplos/transaction.facade.ts`](./exemplos/transaction.facade.ts)

---

## Exercícios

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**

---

## Checklist

- [ ] Interceptors registrados no app.config
- [ ] 401 redireciona para login
- [ ] Facade expõe loading/error/items

**Próximo:** [Módulo 07 — RxJS na Prática](../07-rxjs-na-pratica/README.md)
