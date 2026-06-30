# Módulo 03 — Injeção de Dependência

> **Guia:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **DI** | Angular cria e entrega dependências automaticamente |
| **inject()** | Forma moderna de receber dependência na classe |
| **providedIn: 'root'** | Uma instância para o app inteiro (singleton) |
| **InjectionToken** | "Chave" tipada para config (evita strings mágicas) |
| **providers** | Onde registrar quem fornece o quê |

## Objetivos

- Entender o **DI tree** do Angular e hierarquia de injectors
- Usar `inject()` vs constructor injection
- Criar **InjectionTokens** para configuração
- Configurar providers: `root`, `platform`, component-level

## Contexto

DI é o coração do Angular. Mal configurada, você tem services duplicados, estado inconsistente e testes impossíveis. Em enterprise, DI bem feita = mock fácil em testes + config por ambiente.

---

## 1. inject() — padrão moderno

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
}
```

---

## 2. InjectionToken para config

```typescript
export interface AppConfig {
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

// app.config.ts
{ provide: APP_CONFIG, useValue: { apiUrl: 'https://api.example.com' } }
```

**Por quê:** strings mágicas no código = bugs. Token tipado = refactor seguro.

---

## 3. Hierarquia de providers

| Escopo | Quando usar |
|--------|-------------|
| `providedIn: 'root'` | Singleton global (AuthService) |
| `providers: [...]` no component | Estado por instância do componente |
| `EnvironmentProviders` | Config no bootstrap |

---

## 4. Factory providers

```typescript
{
  provide: API_CLIENT,
  useFactory: (config: AppConfig) => new HttpApiClient(config.apiUrl),
  deps: [APP_CONFIG],
}
```

---

## Exemplos

- [`exemplos/app-config.token.ts`](./exemplos/app-config.token.ts)
- [`exemplos/auth.service.ts`](./exemplos/auth.service.ts)
- [`exemplos/feature-scoped.service.exemplo.ts`](./exemplos/feature-scoped.service.exemplo.ts)

---

## Exercícios

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**

---

## Anti-patterns

| ❌ | ✅ |
|----|-----|
| `new AuthService()` manual | Sempre via DI |
| Service com 20 dependências | Quebrar responsabilidades |
| Config hardcoded no service | InjectionToken |

---

## Checklist

- [ ] InjectionToken criado e usado
- [ ] Services com `providedIn: 'root'`
- [ ] Teste unitário com mock de dependência

**Próximo:** [Módulo 04 — Roteamento e Guards](../04-roteamento-e-guards/README.md)
