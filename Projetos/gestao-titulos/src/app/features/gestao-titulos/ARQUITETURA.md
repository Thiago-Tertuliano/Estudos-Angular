# Arquitetura — Gestão de Títulos

Baseado no modelo Sinacor Eleva Cloud (Material.pdf).

## Fluxo

```
Route (lazy) → Container → Presenters (input/output)
                    ↓
              TituloService (facade, scope container)
                    ↓
         TituloApiService + TituloStateService (root)
```

## Regras

- **Container:** injeta services, handlers, providers `[TituloService]`
- **Presenters:** OnPush, sem `inject()` de negócio
- **State:** signals privados `_data`, públicos `asReadonly()`
- **Facade:** orquestra API + state + loading/error

## Diferenças do Sinacor real

| Sinacor real | Este projeto |
|--------------|--------------|
| `@sinacor/lib` | Angular Material |
| API REST | Mock em `TituloApiService` |
| LoginGuard | Não implementado (foco na feature) |
