# Guia passo a passo — Módulo 06

> Pré-requisito: Módulo 05 + `provideHttpClient` no `app.config.ts`.

**Referências:** [`../exemplos/`](../exemplos/)

---

## Mapa

```
core/interceptors/auth.interceptor.ts
core/interceptors/mock-api.interceptor.ts
features/playground/data-access/product.api.ts
features/playground/data-access/product.facade.ts
```

---

## Passo 1 — HttpClient

**Onde:** `app.config.ts`

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// providers: provideHttpClient(withInterceptors([mockApiInterceptor, authInterceptor]))
```

---

## Passo 2 — Mock API interceptor

**Onde:** `core/interceptors/mock-api.interceptor.ts`

Gabarito simplificado: intercepta `GET /api/products` e `POST /api/products`.

Use array em memória (copie lógica do FinControl `mock-data.ts`).

---

## Passo 3 — ProductApi

**Onde:** `data-access/product.api.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class ProductApi {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);
  getAll() { return this.http.get<Product[]>(`${this.config.apiUrl}/products`); }
  create(p: Omit<Product,'id'>) { return this.http.post<Product>(...); }
}
```

---

## Passo 4 — ProductFacade

**Onde:** `data-access/product.facade.ts`

Scaffold: [`../aula-pratica/scaffold/product.facade.ts`](../aula-pratica/scaffold/product.facade.ts)

- signals: `items`, `loading`, `error`
- `loadAll()`, `create()` — smart page só fala com facade

---

## Passo 5 — Refatorar CatalogPage

Remova MOCK local — use `facade` no `ngOnInit` e após salvar form.

**Próximo:** [Módulo 07](../../07-rxjs-na-pratica/exercicios/GUIA-PASSO-A-PASSO.md)
