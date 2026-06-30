# ADR-002: SSR no Angular Lab

**Status:** Accepted  
**Data:** 2026-06-29  
**Autores:** Thiago Matos Tertuliano

## Contexto

O lab usa `localStorage` para auth mock. Em SSR, `localStorage` não existe no servidor e quebra a hidratação.

## Decisão

- Manter app **CSR** (sem `ng add @angular/ssr` no lab)
- Proteger acesso a `localStorage` com `isPlatformBrowser(PLATFORM_ID)` no `AuthService`
- FinControl (módulo 13) é o candidato a SSR completo

## Alternativas consideradas

1. **SSR no lab** — aprendizado válido, mas aumenta complexidade dos módulos 00–12
2. **Ignorar SSR** — risco de código que quebra em produção com SSR

## Consequências

### Positivas

- AuthService seguro para futura migração SSR
- Lab permanece simples de rodar

### Negativas

- SSR não exercitado no lab (apenas no FinControl)
