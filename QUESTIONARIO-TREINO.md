# Questionário de Treino — Estudos Angular

> Use este arquivo para se preparar para reuniões com gestor, tech lead ou entrevistas técnicas.  
> **Como estudar:** leia a pergunta, escolha uma alternativa **sem olhar a resposta**, depois confira a seção **Gabarito + Por quê**.

**Legenda de temas**

| Tag | Área |
|-----|------|
| `[M00-01]` | Setup e fundamentos |
| `[M02]` | Smart / Dumb |
| `[M03]` | Injeção de dependência |
| `[M04]` | Rotas e guards |
| `[M05]` | Forms reativos |
| `[M06]` | HTTP, interceptors, facade |
| `[M07]` | RxJS |
| `[M08]` | Signals e store |
| `[M09]` | Performance |
| `[M10]` | Testes |
| `[M11]` | SSR |
| `[SIN]` | Padrão Sinacor (Gestão de Títulos) |
| `[GER]` | Conceitos gerais / gestor |

---

## Bloco 1 — Arquitetura e conceitos

### Pergunta 1 `[M02]` `[GER]`

Em uma feature Angular enterprise, qual é a responsabilidade do componente **smart** (container / page)?

- A) Renderizar HTML e emitir eventos sem conhecer services
- B) Orquestrar dados, injetar services e delegar UI aos dumb
- C) Centralizar todo SQL e queries do banco
- D) Substituir o uso de rotas lazy

---

### Pergunta 2 `[M02]` `[SIN]`

Qual a diferença entre a estrutura do **angular-lab** e a do **gestao-titulos** (Sinacor)?

- A) Lab usa `containers/` e Sinacor usa `pages/`
- B) Lab usa `pages/` + `ui/`; Sinacor usa `containers/` + `presenters/` + `state/` separado
- C) São idênticos; só muda o nome dos arquivos
- D) Sinacor não usa standalone components

---

### Pergunta 3 `[GER]`

O que é **boilerplate** em um projeto Angular?

- A) Código de regra de negócio específica do cliente
- B) Código estrutural repetitivo (decorators, pastas, imports) necessário para seguir o padrão
- C) Apenas CSS global do tema
- D) Testes end-to-end automatizados

---

### Pergunta 4 `[M08]` `[SIN]`

No `TituloStateService`, por que usar `_data` privado e `data` com `asReadonly()`?

- A) Porque signals não podem ser públicos em TypeScript
- B) Para impedir mutação externa e expor só leitura — padrão Sinacor/enterprise
- C) Para melhorar SEO
- D) Porque `asReadonly()` substitui o HttpClient

---

### Pergunta 5 `[GER]`

Angular é frequentemente comparado a Java/C# no front porque:

- A) Usa JVM por baixo dos panos
- B) É opinativo: DI, camadas, convenções — escala bem em times grandes
- C) Não suporta TypeScript
- D) Proíbe o uso de bibliotecas externas

---

## Bloco 2 — Componentes, DI e rotas

### Pergunta 6 `[M02]`

Por que componentes **dumb** devem usar `ChangeDetectionStrategy.OnPush`?

- A) Para desativar o Angular completamente
- B) Para rodar change detection só quando inputs mudam — performance e contrato claro
- C) Porque dumb components não podem usar signals
- D) É obrigatório apenas em NgModules

---

### Pergunta 7 `[M03]`

Onde o `inject(LoggerService)` deve ficar no **angular-lab** (módulo 03)?

- A) Em qualquer arquivo dentro de `ui/`
- B) Apenas no smart component (`catalog.page.ts`), nunca nos dumb
- C) Apenas em `app.config.ts`
- D) No `product-card.component.ts` obrigatoriamente

---

### Pergunta 8 `[M03]` `[SIN]`

No **gestao-titulos**, o `TituloService` (facade) usa `@Injectable()` **sem** `providedIn: 'root'`. Onde ele é registrado?

- A) Em `main.ts`
- B) No `providers` do `GestaoTitulosContainerComponent`
- C) No `app.routes.ts` automaticamente
- D) Não precisa registrar; Angular adivinha

---

### Pergunta 9 `[M04]`

O que o `authGuard` faz quando o usuário não está autenticado?

- A) Exibe um alert e mantém na rota
- B) Redireciona para `/login`, preservando `returnUrl` na query string
- C) Apaga o banco local
- D) Chama `location.reload()` sempre

---

### Pergunta 10 `[M04]` `[SIN]`

Para que serve `data: { accessFunction: 'GESTAO_TITULOS' }` na rota?

- A) Define o título da aba do browser apenas
- B) Metadado para guard de permissão no produto real Sinacor
- C) Ativa o modo escuro automaticamente
- D) Substitui o lazy loading

---

## Bloco 3 — Forms, HTTP e RxJS

### Pergunta 11 `[M05]`

No padrão do curso, o `product-form` (dumb) deve:

- A) Chamar `HttpClient` diretamente para salvar
- B) Emitir `saved` via `output()` com os dados validados; o smart persiste
- C) Guardar no `localStorage` sem avisar o pai
- D) Usar apenas template-driven forms com `ngModel` no smart

---

### Pergunta 12 `[M06]`

Qual a ordem correta dos interceptors no `app.config.ts` do FinControl/lab?

- A) auth → mock → error (sempre nesta ordem fixa do Angular)
- B) mockApi → auth → error (mock responde antes; auth adiciona token nas chamadas reais)
- C) Não importa a ordem
- D) Apenas um interceptor por aplicação

---

### Pergunta 13 `[M06]`

Qual o papel da **facade** (`ProductFacade`, `TituloService`)?

- A) Substituir o banco de dados
- B) Orquestrar API + state + loading/erro; único ponto para o smart component
- C) Renderizar tabelas Material
- D) Compilar templates SCSS

---

### Pergunta 14 `[M07]`

Por que usar `switchMap` (e não `mergeMap`) em campo de busca com debounce?

- A) `mergeMap` é mais rápido em todos os casos
- B) `switchMap` cancela a requisição anterior — evita race condition
- C) `switchMap` não funciona com HttpClient
- D) Porque o PDF proíbe `debounceTime`

---

### Pergunta 15 `[M07]`

Como evitar **memory leak** em subscribe dentro de componente?

- A) Nunca usar `subscribe`; Angular proíbe
- B) `takeUntilDestroyed(destroyRef)` ou `async` pipe no template
- C) Adicionar `setInterval` para limpar
- D) Usar `mergeMap` sem unsubscribe

---

## Bloco 4 — Signals, performance, testes, SSR

### Pergunta 16 `[M08]`

Quando preferir **Signals** em vez de RxJS para estado de UI?

- A) WebSockets e streams infinitos
- B) Estado local/global, valores derivados (`computed`), sincronização com template
- C) Apenas para CSS
- D) Nunca; RxJS substitui signals totalmente

---

### Pergunta 17 `[M08]`

O `CatalogStore` no angular-lab calcula `totalValue` com:

- A) `subscribe` manual no template
- B) `computed()` derivado dos items da facade
- C) `localStorage`
- D) Pipe `currency` no service

---

### Pergunta 18 `[M09]`

O que `@defer (on viewport)` faz no `playground.page`?

- A) Carrega o counter só quando entra na viewport — melhora carga inicial
- B) Desativa OnPush
- C) Compila SCSS sob demanda
- D) Executa testes automaticamente

---

### Pergunta 19 `[M10]`

Por que testar `ProductCardComponent` separado do `CatalogPage`?

- A) Porque o card não pode ter template
- B) Dumb testa render + emissão de eventos; smart testa orquestração — responsabilidades diferentes
- C) Vitest só aceita um spec por feature
- D) Para evitar usar `TestBed`

---

### Pergunta 20 `[M11]`

Por que proteger `localStorage` com `isPlatformBrowser(PLATFORM_ID)`?

- A) Porque localStorage é lento no mobile
- B) No SSR o código roda no servidor, onde `localStorage` não existe
- C) Porque guards não funcionam no browser
- D) Para criptografar o token

---

## Bloco 5 — Projetos e Sinacor

### Pergunta 21 `[SIN]`

No exercício Gestão de Títulos, quais campos compõem um título?

- A) SKU, estoque, fornecedor
- B) Nome Cliente, Conta, CPF, Data da Compra
- C) Apenas CPF e senha
- D) Receita, despesa, saldo

---

### Pergunta 22 `[SIN]`

O filtro em Gestão de Títulos usa botão **Pesquisar** em vez de filtrar ao digitar. Por quê no modelo Sinacor?

- A) Angular não suporta input events
- B) Fluxo explícito presenter → container → facade; comum em telas corporativas com validação antes da busca
- C) Porque CSV export bloqueia o teclado
- D) É obrigatório por lei

---

### Pergunta 23 `[M06]` `[SIN]`

Se amanhã a API real substituir o mock, o que muda **menos**?

- A) Toda a estrutura de presenters e container
- B) Principalmente `TituloApiService` / interceptor e `APP_CONFIG.apiUrl`; facade e container permanecem
- C) Apenas o `index.html`
- D) O padrão OnPush deixa de valer

---

### Pergunta 24 `[GER]`

Qual projeto do repositório é o mais adequado para demonstrar **dashboard financeiro completo**?

- A) gestao-titulos
- B) FinControl
- C) meu-primeiro-app (Fernanda)
- D) Apenas o README

---

### Pergunta 25 `[GER]`

Ordem recomendada de estudo no repositório:

- A) FinControl → Sinacor → Fernanda
- B) Fernanda Kipper → Curso Arquiteto (00–13) → projetos de portfólio
- C) Apenas gestao-titulos
- D) Pular módulos 00–06 e ir direto ao 13

---

## Bloco 6 — Revisão avançada (mistura de temas)

> **Novo bloco** — alternativas corretas distribuídas em A, B, C e D (não concentre em uma letra só).

### Pergunta 26 `[M02]` `[M07]`

Um colega colocou `HttpClient.get()` e `subscribe` direto no `product-card.component.ts` (dumb). Qual é o problema principal?

- A) Viola smart/dumb: HTTP e estado pertencem ao smart ou à facade
- B) OnPush deixa de funcionar automaticamente
- C) Vitest não consegue testar o componente
- D) Angular bloqueia `HttpClient` em componentes standalone

---

### Pergunta 27 `[M02]` `[M07]`

No `catalog.page`, a lista exibia todos os produtos mesmo com filtro preenchido. A causa mais provável foi:

- A) `debounceTime` muito alto no RxJS
- B) O `authGuard` bloqueou a rota
- C) O template usava `products()` em vez de `filteredProducts()` (signal/computed não ligado)
- D) Falta de `providedIn: 'root'` na facade

---

### Pergunta 28 `[M04]`

O `guestGuard` deve impedir usuário **já logado** de ver `/login`. Comportamento correto:

- A) Chamar `logout()` e manter na tela de login
- B) Exibir modal de confirmação sem redirecionar
- C) Bloquear navegação com `return false` e tela em branco
- D) Redirecionar para rota autenticada (ex.: `/dashboard` ou `returnUrl`)

---

### Pergunta 29 `[M00-01]` `[GER]`

No FinControl, o erro **NG0908** (`zone.js` has been loaded) geralmente indica:

- A) `zone.js` importado mais de uma vez ou polyfill duplicado no `angular.json`/entry
- B) Falta de `BrowserModule` no `app.config`
- C) Uso proibido de standalone components
- D) `HttpClient` sem interceptor de erro

---

### Pergunta 30 `[M06]` `[SIN]`

Qual camada deve **única** conhecer a URL base da API e montar query params HTTP?

- A) Presenter (tabela Material)
- B) Container (só repassa eventos de clique)
- C) `TituloApiService` / `ProductApiService` — repositório HTTP
- D) `index.html` via meta tag

---

### Pergunta 31 `[M03]` `[M08]`

`providedIn: 'root'` vs `providers` no container (como no gestao-titulos). Quando o escopo **por feature** faz sentido?

- A) Nunca; sempre use root
- B) Apenas em projetos com NgModules legados
- C) Quando quer lazy load com instância isolada por rota/feature e lifecycle ligado ao container
- D) Para substituir signals por BehaviorSubject

---

### Pergunta 32 `[M07]` `[M09]`

Por que o `async` pipe é preferível a `subscribe` manual no template do smart?

- A) Desinscreve automaticamente ao destruir o componente — menos memory leak
- B) É obrigatório com `OnPush` em todo projeto Angular
- C) Substitui a necessidade de facade
- D) Funciona apenas com Observables frios (`of()`)

---

### Pergunta 33 `[M05]` `[M02]`

No formulário reativo dumb, o pai deve receber os dados quando:

- A) O dumb chama `facade.save()` internamente
- B) A cada `keyup` sem validação
- C) O dumb emite `saved`/`valueChange` após validação; o smart persiste
- D) O `FormGroup` é clonado para o service via `inject`

---

### Pergunta 34 `[M10]`

Ao testar `AuthService.login()`, o que o spec deve verificar prioritariamente?

- A) Apenas se o CSS do botão mudou
- B) Token/sessão atualizados e método de logout limpa estado — comportamento, não implementação interna
- C) Se o `HttpClient` foi instanciado com `new`
- D) Snapshot de todo o `app.config.ts`

---

### Pergunta 35 `[M09]` `[M02]`

Mesmo com `OnPush`, uma lista grande ainda re-renderiza demais. Primeira coisa a verificar:

- A) Remover a facade do smart
- B) Adicionar mais `subscribe` no template
- C) Desativar standalone components
- D) `track` no `@for` e evitar recriar arrays/objetos a cada ciclo de detecção

---

### Pergunta 36 `[SIN]` `[M06]`

Exportar CSV em Gestão de Títulos: onde deve ficar a orquestração (pegar dados + disparar download)?

- A) Container ou facade — presenter só emite evento `exportCsv`
- B) Direto no `app.component.ts` global
- C) Interceptor HTTP que converte JSON em arquivo
- D) Guard de rota `canActivate`

---

### Pergunta 37 `[M08]` `[M07]`

`computed()` no Angular signals difere de `map` no RxJS porque:

- A) `computed` só roda em SSR
- B) `map` não aceita números
- C) `computed` é síncrono e reativo a signals — ideal para derivados de estado local sem stream
- D) São idênticos; só muda o nome

---

### Pergunta 38 `[M04]` `[GER]`

`returnUrl` na query após login serve para:

- A) Cachear assets estáticos
- B) Voltar o usuário à rota que tentou acessar antes do `authGuard` redirecionar
- C) Definir idioma da aplicação
- D) Ativar lazy loading da feature

---

### Pergunta 39 `[GER]` `[M02]`

Comparando Angular enterprise com React “soltinho”, a frase mais honesta para o gestor é:

- A) React não escala em nenhum cenário
- B) Angular elimina a necessidade de arquitetura
- C) TypeScript é exclusivo do Angular
- D) Angular traz mais convenção (DI, estrutura, CLI); React exige mais decisões explícitas do time

---

### Pergunta 40 `[M11]` `[M06]`

Em app com SSR, onde configurar `HTTP_INTERCEPTORS` para token **sem** quebrar hidratação?

- A) `provideHttpClient(withInterceptors([...]))` no `app.config` — mesmo bundle server/browser, com guards de plataforma onde necessário
- B) Apenas no `server.ts` ignorando o browser
- C) Dentro de cada presenter
- D) Não é possível usar interceptors com SSR

---

## Bloco 7 — Nível entrevista (cenários reais)

> **Bloco novo** — lazy load, guards funcionais, testes HTTP, FinControl, ADR e pegadinhas de produção. Gabarito misturado (A–D).

### Pergunta 41 `[M04]` `[M09]`

Qual o principal benefício de `loadComponent` / lazy loading em `app.routes.ts`?

- A) Elimina a necessidade de guards e interceptors
- B) Substitui `ChangeDetectionStrategy.OnPush`
- C) Reduz o bundle inicial — o código da feature só carrega quando o usuário navega
- D) Proíbe standalone components na rota

---

### Pergunta 42 `[M06]`

Para que serve o **mock API interceptor** no angular-lab / FinControl em desenvolvimento?

- A) Criptografar o JWT no header
- B) Compilar SCSS sob demanda
- C) Substituir o `zone.js` no polyfill
- D) Responder requests com fixtures locais sem depender do backend real

---

### Pergunta 43 `[M08]`

Ao atualizar um `signal<number>`, quando usar `update()` em vez de `set()`?

- A) `set` só é permitido em services root
- B) `update` e `set` são proibidos em components OnPush
- C) `update(fn)` quando o novo valor depende do anterior; `set` quando substitui o valor inteiro
- D) `update` dispara HTTP automaticamente para o servidor

---

### Pergunta 44 `[M06]`

Qual responsabilidade típica do **error interceptor**?

- A) Centralizar tratamento de erros HTTP (ex.: 401 → logout, toast em 5xx)
- B) Acelerar todas as requisições com cache global
- C) Substituir a facade na camada de negócio
- D) Executar apenas no servidor SSR, nunca no browser

---

### Pergunta 45 `[M04]`

No padrão moderno standalone, o `authGuard` do curso é implementado como:

- A) Classe `AuthGuard` registrada só em `NgModule`
- B) `CanActivateFn` — função que usa `inject()` para Router e AuthService
- C) Decorator `@Guard()` no componente de login
- D) Interceptor HTTP que bloqueia navegação

---

### Pergunta 46 `[GER]` `[M02]`

Na página de transações do **FinControl**, qual papel do `transaction-list.page` (smart)?

- A) Chamar `HttpClient` direto na tabela Material
- B) Apenas estilizar SCSS do dashboard
- C) Orquestrar facade/store, tratar loading/erro e delegar render ao dumb
- D) Calcular KPIs globais no error interceptor

---

### Pergunta 47 `[M12]` `[GER]`

O que um **ADR** (Architecture Decision Record) documenta no repositório?

- A) Substitui testes unitários e e2e
- B) Gera componentes automaticamente via CLI
- C) Apenas comandos `npm install` para onboarding
- D) **Por que** o time escolheu um padrão (facade, OnPush, etc.) e alternativas rejeitadas

---

### Pergunta 48 `[M02]` `[M03]`

Por que usar `input.required<Product>()` em um dumb component?

- A) Contrato explícito — falha cedo se o pai esquecer de passar o input obrigatório
- B) Desativa OnPush automaticamente
- C) Substitui `@Output` e eventos
- D) Funciona apenas em projetos com NgModules legados

---

### Pergunta 49 `[M07]`

Em qual cenário `concatMap` é mais adequado que `switchMap`?

- A) Campo de busca com debounce que cancela request anterior
- B) Passos HTTP sequenciais onde cada um deve completar antes do próximo (fila)
- C) Dezenas de GET independentes em paralelo
- D) Nunca usar com `HttpClient`

---

### Pergunta 50 `[M10]` `[M06]`

No teste de um service que chama API, o que `HttpTestingController.expectOne(url).flush(body)` faz?

- A) Grava snapshot visual de toda a árvore DOM
- B) Executa a API de produção sem mock
- C) Verifica que exatamente uma request foi feita e devolve corpo fake com `flush`
- D) Substitui a necessidade do Vitest/Jasmine

---

### Pergunta 51 `[M04]` `[M05]`

O guard `canDeactivate` é usado principalmente para:

- A) Impedir login de usuários convidados
- B) Ativar lazy loading de uma feature
- C) Exportar CSV de títulos automaticamente
- D) Bloquear saída da rota se o formulário tem alterações não salvas (confirmação)

---

### Pergunta 52 `[M08]`

Quando usar `effect()` em vez de `computed()` com signals?

- A) `effect()` para side effects (sync storage, log); derivados de estado usam `computed`
- B) `effect()` substitui `computed` em todos os casos
- C) `effect()` é proibido com OnPush
- D) `effect()` executa apenas no servidor Node

---

### Pergunta 53 `[M03]` `[M06]`

Para que serve o token `APP_CONFIG` / `environment` injetável?

- A) Apenas variáveis de tema CSS
- B) Substituir o AuthService em produção
- C) Centralizar `apiUrl`, flags (`production`) — sem URL hardcoded espalhada
- D) Obrigatório em todo presenter Sinacor

---

### Pergunta 54 `[SIN]` `[M02]`

No gestao-titulos, onde deve ficar o template da **tabela Material** com colunas e botões?

- A) Direto no `GestaoTitulosContainerComponent` sem separar HTML
- B) No presenter dumb — recebe dados via `input`, emite cliques via `output`
- C) No `TituloApiService` que monta strings HTML
- D) No `app.routes.ts` como template inline

---

### Pergunta 55 `[M09]` `[M11]`

Diferença entre `@defer (on viewport)` e `@defer (on idle)`?

- A) São idênticos; só muda o nome do trigger
- B) `on idle` impede SSR completamente
- C) `on viewport` sempre carrega antes do primeiro paint da página
- D) `on viewport` carrega quando o bloco entra na tela; `on idle` quando o browser fica ocioso

---

## Bloco 8 — Caça-falhas (nível sênior)

> **Difícil de propósito** — cenários onde a resposta “óbvia” está errada. Meta honesta: **13+ de 20**. Errar aqui é ouro: mostra onde estudar.

### Pergunta 56 `[M02]` `[M09]`

Componente dumb com `OnPush` recebe `@Input() items: Product[]`. O smart faz `this.items.push(novo)` **sem** criar novo array. O que acontece?

- A) Angular detecta sempre porque o conteúdo mudou
- B) OnPush ignora arrays — só funciona com strings
- C) `push` dispara `ngOnChanges` com `items` diferente automaticamente
- D) Referência do input não mudou — OnPush **não** re-renderiza; precisa novo array ou signal/input atualizado

---

### Pergunta 57 `[M06]`

`provideHttpClient(withInterceptors([mockApi, auth, error]))`. O mock responde `/api/*` com `of(HttpResponse)` **sem** chamar `next(req)`. O auth interceptor roda nessa request?

- A) Sim — todos os interceptors sempre rodam em toda request
- B) Só no SSR
- C) Não — mock short-circuita a cadeia; interceptors **depois** dele no array não executam para essa request
- D) O HttpClient ignora mock em POST

---

### Pergunta 58 `[M03]` `[M04]`

Onde `inject(Router)` é **válido** sem erro NG0203?

- A) No corpo de `CanActivateFn`, factory de `provideAppInitializer`, construtor de service — contextos de injeção
- B) Em qualquer `setTimeout` dentro de componente
- C) No callback de `addEventListener` sem `runInInjectionContext`
- D) Apenas em `main.ts` fora do bootstrap

---

### Pergunta 59 `[M07]`

Botão **Salvar** dispara POST. Usuário clica 3× rápido. Qual operador evita requests paralelas **e** não cancela a primeira?

- A) `switchMap` — cancela anterior
- B) `exhaustMap` — ignora cliques enquanto a request atual não termina
- C) `mergeMap` com `debounceTime(0)`
- D) `concatMap` com `debounceTime(300)` — sempre fila, mas aceita cliques após debounce

---

### Pergunta 60 `[M08]` `[M07]`

`toSignal(this.http.get<Product[]>('/api/products'))` sem `initialValue`. No primeiro render do template:

- A) Emite array vazio `[]` automaticamente
- B) Lança erro de runtime sempre
- C) Valor é `undefined` até o Observable emitir — template precisa tratar (`@if`, `?.`)
- D) Bloqueia render até HTTP completar

---

### Pergunta 61 `[M09]` `[M08]`

Smart OnPush atualiza `loading` via `subscribe` callback **fora** do Angular zone (lib externa). UI não atualiza. Primeira correção idiomática hoje:

- A) Remover OnPush permanentemente
- B) `ChangeDetectorRef.detectChanges()` em todo componente dumb
- C) Converter tudo para NgZone.run apenas no dumb
- D) Preferir `signal` + `async` pipe / `toSignal` para o estado reativo disparar CD, ou `NgZone.run()` no callback se inevitável

---

### Pergunta 62 `[M03]` `[SIN]`

`TituloService` no `providers` do container **e** `TituloStateService` no mesmo array. Usuário navega para outra rota e volta. O que ocorre?

- A) Mesma instância forever — singleton global
- B) Nova instância ao remontar o container — estado da feature **reseta** (a menos que store esteja em root)
- C) Angular reutiliza sempre o mesmo container sem destruir
- D) State service não pode coexistir com facade no mesmo provider

---

### Pergunta 63 `[M04]`

No `authGuard`, por que retornar `router.createUrlTree(['/login'])` é preferível a `router.navigate(['/login'])`?

- A) `UrlTree` integra ao ciclo de navegação do guard — cancela/redireciona de forma síncrona sem corrida com a rota original
- B) `navigate` é deprecated
- C) `UrlTree` só funciona em SSR
- D) Não há diferença prática

---

### Pergunta 64 `[M11]`

Após habilitar SSR, tela pisca e console mostra **hydration mismatch**. Causa mais provável no seu stack:

- A) OnPush proibido em SSR
- B) `localStorage` no construtor do guard
- C) Falta de Material theme
- D) HTML diferente server vs browser (ex.: `Date.now()`, `window`, `localStorage` no template ou construtor sem guard de plataforma)

---

### Pergunta 65 `[M07]`

Observable de config compartilhado entre 5 subscribers com `shareReplay(1)` **sem** `refCount: true`. Risco:

- A) Cada subscriber dispara novo HTTP
- B) Subscription nunca é liberada — memory leak e execução “presa” ao primeiro subscribe
- C) `shareReplay` proíbe HttpClient
- D) Cancela requests anteriores como switchMap

---

### Pergunta 66 `[M08]` `[SIN]`

```typescript
readonly data = this._data.asReadonly(); // signal<Titulo[]>
```

Container faz `this.state.data().push(tituloFalso)`. Por que isso é bug?

- A) `asReadonly` proíbe leitura no template
- B) Signals não aceitam arrays
- C) `asReadonly` impede **reassign** do signal, não mutação **in-place** do array — quebra encapsulamento do state
- D) Só funciona com `BehaviorSubject`

---

### Pergunta 67 `[M10]`

Teste de componente com `effect()` que grava em `localStorage` falha ou loopa. Abordagem correta:

- A) `TestBed.flushEffects()` após mudança de signal + mock de storage; evitar effect sem cleanup em teste
- B) Desabilitar todos os effects globalmente em produção
- C) `effect` não é testável — remover do código
- D) Usar `ngOnInit` duplicado junto com effect

---

### Pergunta 68 `[M04]` `[M05]`

Rota `/products/:id/edit` — usuário edita id=1, navega para id=2 **sem** sair do mesmo componente. Form continua com dados do id=1. Fix:

- A) Trocar OnPush por Default
- B) Duplicar componente no router com paths diferentes
- C) `router.reload()` em todo clique
- D) Reagir a mudança de param (`input` de rota ou `route.paramMap` / `switchMap`) e resetar/rebindar o form

---

### Pergunta 69 `[M07]`

Busca: `valueChanges.pipe(debounceTime(300), distinctUntilChanged(), switchMap(...))`. Se remover só `distinctUntilChanged()`, o que piora?

- A) Nada — debounce já evita tudo
- B) HTTP nunca dispara
- C) Requests duplicadas quando o mesmo termo re-emite após blur/focus ou programmatic patch com mesmo valor
- D) Memory leak garantido

---

### Pergunta 70 `[M03]` `[M06]`

Dois services: `ProductApiService` e `ProductFacade`, ambos `providedIn: 'root'`. `ProductFacade` injeta `ProductApi`. `ProductApi` injeta `ProductFacade` para “atalho”. O que acontece?

- A) Funciona — singleton resolve circular
- B) **NG0200** dependência circular em runtime/DI — refatorar (api não conhece facade)
- C) Só falha em testes
- D) Angular cria duas instâncias automáticas

---

### Pergunta 71 `[M06]` `[M08]`

Facade faz `load()` mas `loading` fica `true` para sempre após erro de rede. Causa clássica:

- A) `loading.set(true)` sem `finalize`/`tap`/`catchError` que zera loading no termino (sucesso ou falha)
- B) OnPush no template
- C) Falta de `providedIn root`
- D) Uso de signals em vez de RxJS

---

### Pergunta 72 `[M06]`

Error interceptor com `catchError` que só faz `console.log` e retorna `of(null)`:

- A) Melhor prática — smart não precisa saber de erro
- B) Obrigatório para mock API
- C) Acelera o HttpClient
- D) Smart recebe “sucesso” com body null — **engole** o erro; facade pode achar que deu certo

---

### Pergunta 73 `[M04]` `[M02]`

`withComponentInputBinding()` no router permite:

- A) Dumb injetar HttpClient via rota
- B) Lazy load sem `loadComponent`
- C) Route params/query como `input()` do componente — menos subscribe manual a `ActivatedRoute`
- D) Substituir guards por inputs

---

### Pergunta 74 `[M07]` `[M09]`

Cold Observable: cinco `async` pipes no template na **mesma** propriedade `vm$ | async` (cinco vezes). Resultado:

- A) Uma subscription compartilhada automaticamente
- B) Cinco execuções/subscriptions independentes do cold source — usar `shareReplay(1)` ou um `async` pipe + `@let`
- C) Erro de compilação
- D) Apenas a primeira linha atualiza

---

### Pergunta 75 `[GER]` `[M12]`

Gestor pergunta: *“Por que não colocar toda lógica no service root e um componente só?”* Melhor resposta técnica:

- A) Angular proíbe services com mais de 200 linhas
- B) Um mega-service + mega-componente acopla UI, testes e lifecycle; smart/dumb + facade **separam** orquestração, estado e view — facilita teste, troca de tela e onboarding
- C) Porque Material exige três componentes mínimos
- D) SSR não funciona com services

---

# Gabarito detalhado

> Leia a explicação mesmo quando acertar — ela fixa o **tema** para reunião com gestor.

---

## Respostas — Bloco 1

### Pergunta 1 — **B** `[M02]` `[GER]`

**Tema:** Smart vs Dumb (Container/Presenter)

O smart **orquestra**: injeta services, mantém signals de tela, chama facade, trata eventos dos filhos. O dumb **só renderiza** via `input`/`output`.

**Lembrete para reunião:** *"Smart pensa, dumb mostra."*

**Onde viu:** `catalog.page.ts`, `GestaoTitulosContainerComponent`, `transaction-list.page.ts` (FinControl).

---

### Pergunta 2 — **B** `[M02]` `[SIN]`

**Tema:** Convenções de pasta — curso vs Sinacor

| angular-lab / FinControl | gestao-titulos (Sinacor) |
|--------------------------|--------------------------|
| `pages/` (smart) | `containers/` |
| `ui/` (dumb) | `presenters/` |
| `data-access/` (model, api, facade) | `services/` + `state/` separados |

**Lembrete:** Mesma ideia (separação de responsabilidades), **nomes diferentes** conforme o contrato corporativo.

---

### Pergunta 3 — **B** `[GER]`

**Tema:** Boilerplate

Não é a regra de negócio — é a "casca": `@Component`, imports, pastas, `OnPush`, providers. Tedioso, mas **padroniza** times grandes.

**Lembrete:** *"Boilerplate compra previsibilidade."*

---

### Pergunta 4 — **B** `[M08]` `[SIN]`

**Tema:** State service com encapsulamento

```typescript
private readonly _data = signal<Titulo[]>([]);
readonly data = this._data.asReadonly();
```

Só o state (ou facade autorizada) **muta**; componentes **leem**. Evita `componente filho alterando lista direto`.

**Lembrete:** Padrão explícito no PDF Sinacor.

---

### Pergunta 5 — **B** `[GER]`

**Tema:** Angular vs React (visão gestor)

Angular **guia** estrutura (DI, módulos/features, style guide). React **deixa escolher** (libs, estado). Nenhum é "melhor" — depende do time e do produto.

---

## Respostas — Bloco 2

### Pergunta 6 — **B** `[M02]`

**Tema:** OnPush

Com OnPush, change detection roda quando:
- inputs mudam (referência)
- eventos do próprio componente
- signals/async pipe atualizam

Força dados **imutáveis** nos dumb.

---

### Pergunta 7 — **B** `[M03]`

**Tema:** Onde injetar services

Regra do curso: **só smart** injeta services de negócio. Dumb usa `input`/`output`. Exceção pedagógica: `FormBuilder` no dumb de formulário (só infra de form, não HTTP).

**Erro comum:** `inject(ProductFacade)` no `catalog-filters` — você cometeu isso no módulo 06.

---

### Pergunta 8 — **B** `[M03]` `[SIN]`

**Tema:** Escopo de DI da facade

`@Injectable()` sem root = **nova instância por provider**. No container:

```typescript
@Component({
  providers: [TituloService],
})
```

`TituloStateService` continua `root` (singleton global).

**Lembrete:** Facade por tela; state compartilhado se necessário.

---

### Pergunta 9 — **B** `[M04]`

**Tema:** authGuard

```typescript
return router.createUrlTree(['/login'], {
  queryParams: { returnUrl: state.url },
});
```

Login deve ler `returnUrl` e navegar de volta após sucesso.

---

### Pergunta 10 — **B** `[M04]` `[SIN]`

**Tema:** accessFunction

Metadado da rota para o guard de permissão do Sinacor verificar se o usuário pode acessar aquela função do sistema. No exercício está declarado; guard real seria o próximo passo.

---

## Respostas — Bloco 3

### Pergunta 11 — **B** `[M05]`

**Tema:** Reactive forms dumb → smart

Fluxo:
1. Form valida campos
2. `saved.emit(dados)` 
3. Smart chama `facade.create()` ou atualiza state

Dumb **não** chama API.

---

### Pergunta 12 — **B** `[M06]`

**Tema:** Ordem de interceptors

- **mockApi:** responde `/api/*` em dev sem backend
- **auth:** adiciona `Authorization: Bearer ...`
- **error:** trata 401/500 globalmente

Ordem importa: quem transforma a request/response primeiro.

---

### Pergunta 13 — **B** `[M06]`

**Tema:** Facade pattern

O smart chama `facade.loadAll()` — não faz `http.get` + `loading.set` + `toast` espalhado. Facade encapsula isso.

**Lembrete gestor:** *"Componente fino, facade grossa (em responsabilidade, não em linhas)."*

---

### Pergunta 14 — **B** `[M07]`

**Tema:** switchMap em busca

Cenário: usuário digita "mouse" rápido.
- `mergeMap`: várias respostas competem — a antiga pode chegar por último
- `switchMap`: cancela a anterior — só a última importa

Combine com `debounceTime(300)` + `distinctUntilChanged()`.

---

### Pergunta 15 — **B** `[M07]`

**Tema:** Teardown / memory leak

Anti-pattern do PDF: `subscribe` no constructor sem unsubscribe.

Correção moderna: `takeUntilDestroyed(this.destroyRef)` (Angular 16+).

---

## Respostas — Bloco 4

### Pergunta 16 — **B** `[M08]`

**Tema:** Signals vs RxJS — quando usar cada um

| Use Signals | Use RxJS |
|-------------|----------|
| KPIs, totais, tab ativa | HTTP, debounce, WebSocket |
| `computed` derivado | Operadores complexos |

No seu ADR: *"Signals para UI state, RxJS para HTTP streams"*.

---

### Pergunta 17 — **B** `[M08]`

**Tema:** CatalogStore

```typescript
readonly totalValue = computed(() =>
  this.products().reduce((sum, p) => sum + p.price, 0)
);
```

Reativo: quando `facade.items` muda, KPI atualiza sem subscribe manual.

---

### Pergunta 18 — **A** `[M09]`

**Tema:** @defer

Lazy load **de componente** na viewport — chunk do counter só baixa quando visível. Complementa lazy de **rotas**.

---

### Pergunta 19 — **B** `[M10]`

**Tema:** Pirâmide de testes por camada

- **ProductCard spec:** `setInput('product', ...)` + texto no DOM + clique em botão
- **CatalogPage spec:** mock `ProductFacade`, verifica se `loadAll` foi chamado

---

### Pergunta 20 — **B** `[M11]`

**Tema:** SSR e localStorage

No servidor Node não existe `window`/`localStorage`. `isPlatformBrowser` evita crash na hidratação.

---

## Respostas — Bloco 5

### Pergunta 21 — **B** `[SIN]`

**Tema:** Domínio do exercício PDF

Campos do mock: cliente, conta corretora, CPF, data da compra do título. Diferente de transações receita/despesa do FinControl.

---

### Pergunta 22 — **B** `[SIN]`

**Tema:** UX corporativa vs busca instantânea

Presenter emite `filterSubmit` no submit → container → `tituloService.loadTitulos(filtros)`. No lab você também tem busca com debounce HTTP — **dois padrões válidos** conforme o caso.

---

### Pergunta 23 — **B** `[M06]` `[SIN]`

**Tema:** Troca mock → API real

Muda: `TituloApiService`, interceptor, environment/`APP_CONFIG`.  
Não muda: presenters, contratos input/output, estrutura container/state.

**Frase para gestor:** *"Trocamos a borda, não o núcleo."*

---

### Pergunta 24 — **B** `[GER]`

**Tema:** Portfólio por projeto

| Projeto | Melhor para demonstrar |
|---------|------------------------|
| **FinControl** | Dashboard, CRUD transações, auth, KPIs |
| **gestao-titulos** | Padrão Sinacor, CSV, Container/Presenter |
| **angular-lab** | Evolução incremental módulo a módulo |

---

### Pergunta 25 — **B** `[GER]`

**Tema:** Trilha de estudo

Fernanda (sintaxe) → Arquiteto 00–12 (lab) → 13 FinControl → Sinacor como especialização corporativa.

---

## Respostas — Bloco 6

### Pergunta 26 — **A** `[M02]` `[M07]`

**Tema:** Erro clássico — HTTP no dumb

Dumb **não injeta** `HttpClient` nem faz `subscribe`. Quem busca/persiste é **smart** ou **facade**. Isso mantém testes simples e contrato claro.

**Lembrete:** *"Se tem URL na URL bar do código dumb, provavelmente está errado."*

---

### Pergunta 27 — **C** `[M02]` `[M07]`

**Tema:** Filtro que não filtra

Você tinha `filteredProducts` (computed/signal) mas o template ainda lia `products()`. A lógica existia; o **binding** não.

**Lembrete:** Sempre conferir **qual signal** o template consome.

---

### Pergunta 28 — **D** `[M04]`

**Tema:** `guestGuard` vs `authGuard`

| Guard | Quando | Ação |
|-------|--------|------|
| `authGuard` | Sem login | → `/login?returnUrl=...` |
| `guestGuard` | Já logado em `/login` | → `/dashboard` (ou destino seguro) |

---

### Pergunta 29 — **A** `[M00-01]` `[GER]`

**Tema:** NG0908 / zone.js

Causa típica: `zone.js` importado duas vezes (`polyfills` + `import` manual). FinControl foi corrigido alinhando entry/polyfills do `angular.json`.

---

### Pergunta 30 — **C** `[M06]` `[SIN]`

**Tema:** Camadas HTTP

Presenter **não** monta URL. API service concentra HTTP; facade orquestra; container liga eventos.

**Frase:** *"URL fica na borda HTTP, não na tabela."*

---

### Pergunta 31 — **C** `[M03]` `[M08]`

**Tema:** Escopo de DI

`providers` no container = instância **por árvore de componentes** da feature. Útil quando o PDF/contrato pede lifecycle acoplado ao container Sinacor. Root é default para singletons globais (Auth, Logger).

---

### Pergunta 32 — **A** `[M07]` `[M09]`

**Tema:** `async` pipe

Gerencia subscribe/unsubscribe no destroy. Menos boilerplate que `takeUntilDestroyed` manual no template.

---

### Pergunta 33 — **C** `[M05]` `[M02]`

**Tema:** Forms dumb → smart

Dumb valida e **emite**; smart chama `facade.save()`. Mesmo padrão do `product-form` no lab.

---

### Pergunta 34 — **B** `[M10]`

**Tema:** O que testar no AuthService

Teste de **comportamento**: após login há sessão/token; após logout limpa. Mock de `HttpClient` com `HttpTestingController` se necessário.

---

### Pergunta 35 — **D** `[M09]` `[M02]`

**Tema:** OnPush + listas

OnPush não elimina custo de reconciliar listas gigantes. `@for` com `track` + referências estáveis é o primeiro check de performance.

---

### Pergunta 36 — **A** `[SIN]` `[M06]`

**Tema:** Export CSV

Presenter emite `exportCsv`; container/facade lê dados do state e gera blob/download. UI não conhece formato do arquivo.

---

### Pergunta 37 — **C** `[M08]` `[M07]`

**Tema:** Signals `computed` vs RxJS `map`

`computed` = derivado **síncrono** de signals (ex.: total do carrinho). RxJS = streams assíncronos (HTTP, websockets, debounce).

---

### Pergunta 38 — **B** `[M04]` `[GER]`

**Tema:** `returnUrl`

Fluxo: usuário tenta `/transactions` → guard manda login → após auth sucesso navega de volta. UX padrão enterprise.

---

### Pergunta 39 — **D** `[GER]` `[M02]`

**Tema:** Angular vs React para gestor

Não é "melhor/pior" absoluto — é **trade-off**: Angular entrega mais estrutura out-of-the-box; React é flexível mas exige disciplina do time.

---

### Pergunta 40 — **A** `[M11]` `[M06]`

**Tema:** Interceptors com SSR

Configure no `app.config` com `provideHttpClient(withInterceptors(...))`. Onde acessar `window`/`localStorage`, use `isPlatformBrowser`.

---

## Respostas — Bloco 7

### Pergunta 41 — **C** `[M04]` `[M09]`

**Tema:** Lazy loading

Feature só baixa quando navega → **TTI menor**, especialmente em apps grandes (FinControl com várias rotas).

**Lembrete:** Lazy ≠ eliminar guards; guards rodam na navegação.

---

### Pergunta 42 — **D** `[M06]`

**Tema:** Mock interceptor

Dev/test sem backend: interceptor intercepta URL e retorna JSON fixture. Troca para API real = mudar config + remover/condicionar mock.

---

### Pergunta 43 — **C** `[M08]`

**Tema:** `signal.set` vs `signal.update`

```typescript
count.set(5);           // valor absoluto
count.update(n => n + 1); // depende do anterior
```

---

### Pergunta 44 — **A** `[M06]`

**Tema:** Error interceptor

Um lugar para 401 → logout, 403 → mensagem, 5xx → toast. Smart/facade ficam focados em negócio.

---

### Pergunta 45 — **B** `[M04]`

**Tema:** Functional guards

Angular moderno: `export const authGuard: CanActivateFn = () => { const auth = inject(AuthService); ... }`. Sem classe, compatível com standalone.

---

### Pergunta 46 — **C** `[GER]` `[M02]`

**Tema:** FinControl smart page

`transaction-list.page` injeta facade, lê signals de loading/erro, passa lista ao dumb. Mesma receita do `catalog.page`.

---

### Pergunta 47 — **D** `[M12]` `[GER]`

**Tema:** ADR

Módulo 11–12 do curso: ADR explica decisão, contexto, consequências. Gestor valoriza **rastreabilidade** de escolhas técnicas.

**Frase:** *"Código mostra o quê; ADR mostra o porquê."*

---

### Pergunta 48 — **A** `[M02]` `[M03]`

**Tema:** `input.required`

API de inputs como signals — required quebra cedo em dev se pai esquecer binding. Reforça contrato dumb.

---

### Pergunta 49 — **B** `[M07]`

**Tema:** concatMap vs switchMap

| Operador | Comportamento |
|----------|----------------|
| `switchMap` | Cancela anterior (busca) |
| `concatMap` | Fila — espera anterior terminar |
| `mergeMap` | Paralelo — todas em voo |

---

### Pergunta 50 — **C** `[M10]` `[M06]`

**Tema:** HttpTestingController

Padrão de teste de service HTTP no Angular: `TestBed.inject(HttpTestingController)`, `expectOne`, `flush`, `verify`.

---

### Pergunta 51 — **D** `[M04]` `[M05]`

**Tema:** canDeactivate

UX clássica: usuário editou formulário e clica Voltar → modal "Descartar alterações?". Guard retorna `boolean` ou `UrlTree`.

---

### Pergunta 52 — **A** `[M08]`

**Tema:** effect vs computed

- `computed` → valor derivado puro (total, filtro)
- `effect` → efeito colateral (persistir preferência, analytics)

Não coloque estado derivado em `effect` se `computed` resolve.

---

### Pergunta 53 — **C** `[M03]` `[M06]`

**Tema:** APP_CONFIG

`provide: APP_CONFIG, useValue: environment` — services injetam URL base. Facilita teste (mock config) e deploy.

---

### Pergunta 54 — **B** `[SIN]` `[M02]`

**Tema:** Presenter com Material

Sinacor: tabela é **view** — sem HTTP. Container passa `titulos()` e escuta `filterSubmit`, `exportCsv`.

---

### Pergunta 55 — **D** `[M09]` `[M11]`

**Tema:** @defer triggers

- `viewport` → scroll até aparecer (playground counter)
- `idle` → após main thread livre — bom para blocos não críticos

Ambos melhoram carga inicial percebida.

---

## Respostas — Bloco 8

> **Se errou 5+ aqui, ótimo** — este bloco existe para achar buracos. Revise o tema de cada erro antes da reunião.

### Pergunta 56 — **D** `[M02]` `[M09]`

**Tema:** OnPush + mutação in-place

OnPush compara **referência** do input (ou signal). `push` muta sem nova referência → dumb não atualiza.

**Fix:** `items.set([...items(), novo])` ou `update(list => [...list, novo])`.

**Pegadinha:** “Os dados mudaram” ≠ “Angular detectou”.

---

### Pergunta 57 — **C** `[M06]`

**Tema:** Cadeia de interceptors

Ordem no array = ordem na ida. Mock primeiro que responde sem `next()` → auth/error **não rodam** nessa request.

**Por isso** no lab: mock antes de auth — não adiciona token em fixture local (desnecessário).

---

### Pergunta 58 — **A** `[M03]` `[M04]`

**Tema:** Injection context

`inject()` funciona em: construtor, field initializer de DI, guards, interceptors, resolvers, `runInInjectionContext`.

**Não funciona** em callbacks soltos — aí use `inject` antes ou `runInInjectionContext`.

---

### Pergunta 59 — **B** `[M07]`

**Tema:** exhaustMap no submit

| Operador | Duplo clique Salvar |
|----------|---------------------|
| `switchMap` | Cancela 1º POST — perigoso |
| `exhaustMap` | Ignora cliques até terminar — ideal |
| `mergeMap` | Vários POSTs paralelos — bug |

---

### Pergunta 60 — **C** `[M08]` `[M07]`

**Tema:** toSignal sem initialValue

Primeiro valor = `undefined`. Template: `@if (products(); as p)` ou `initialValue: []` no `toSignal`.

---

### Pergunta 61 — **D** `[M09]` `[M08]`

**Tema:** Zone + OnPush

Signals e zone.js moderno reduzem o problema, mas callback externo ainda pode escapar. Preferir modelo reativo; `NgZone.run()` é escape hatch.

---

### Pergunta 62 — **B** `[M03]` `[SIN]`

**Tema:** Provider scope por container

Providers no container = instância **por montagem**. Saiu da rota → destruiu → estado zerou.

**Se precisar persistir:** store em root ou serviço de sessão explícito.

---

### Pergunta 63 — **A** `[M04]`

**Tema:** UrlTree no guard

`createUrlTree` retorna redirect **como resultado** do guard. `navigate()` dentro do guard pode competir com navegação em andamento.

---

### Pergunta 64 — **D** `[M11]`

**Tema:** Hydration mismatch

Server renderizou HTML A; browser montou HTML B. Clássico: `localStorage`, `Date`, `window` no template/construtor.

**Fix:** `isPlatformBrowser`, `afterNextRender`, `@defer` no client.

---

### Pergunta 65 — **B** `[M07]`

**Tema:** shareReplay sem refCount

Buffer + subscription interna permanecem — leak em rotas que montam/desmontam. Use `refCount: true` ou `share({ connector: () => new ReplaySubject(1), resetOnRefCountZero: true })`.

---

### Pergunta 66 — **C** `[M08]` `[SIN]`

**Tema:** asReadonly não é deep freeze

```typescript
// BUG — muta array interno
state.data().push(fake);

// OK — API do state
state.setData([...state.data(), fake]);
```

**Lembrete:** encapsulamento = só facade/state muta.

---

### Pergunta 67 — **A** `[M10]`

**Tema:** Testar effects

`TestBed.flushEffects()` sincroniza effects após mudança de signal. Mock `localStorage`. Em produção, effects devem ter teardown quando necessário.

---

### Pergunta 68 — **D** `[M04]` `[M05]`

**Tema:** Mesmo componente, param diferente

Angular **reutiliza** instância se mesma rota. Precisa escutar mudança de `:id` e `form.reset(patch)`.

Angular 16+: `input.required` de rota com `withComponentInputBinding`.

---

### Pergunta 69 — **C** `[M07]`

**Tema:** distinctUntilChanged

Debounce só espera tempo — não compara valor. Mesmo termo pode re-disparar HTTP após `patchValue`, reset ou re-focus.

---

### Pergunta 70 — **B** `[M03]` `[M06]`

**Tema:** DI circular

**Api** = borda HTTP. **Facade** = orquestra api. Api **nunca** injeta facade.

**NG0200** = cheiro de camada invertida.

---

### Pergunta 71 — **A** `[M06]` `[M08]`

**Tema:** loading preso

```typescript
this.loading.set(true);
this.api.get().pipe(
  finalize(() => this.loading.set(false))
).subscribe(...);
```

Ou `try/finally` em async/await com firstValueFrom.

---

### Pergunta 72 — **D** `[M06]`

**Tema:** Engolir erro no interceptor

Retornar `of(null)` transforma erro em sucesso. Facade pode limpar erro e mostrar lista vazia sem saber que falhou.

**Melhor:** log + `throwError(() => error)` ou rethrow após side effect (logout).

---

### Pergunta 73 — **C** `[M04]` `[M02]`

**Tema:** Component input binding

```typescript
// rota: products/:id
readonly id = input.required<string>(); // em vez de route.snapshot
```

Menos boilerplate, mais alinhado a signals.

---

### Pergunta 74 — **B** `[M07]` `[M09]`

**Tema:** Cold observable + múltiplos async pipes

Cada `| async` = nova subscription. Cinco no template = cinco HTTP (se cold).

**Fix:** uma variável `@let vm = vm$ | async` ou `shareReplay(1)` no service.

---

### Pergunta 75 — **B** `[GER]` `[M12]`

**Tema:** Defender arquitetura para gestor

Não é frescura — é **custo de manutenção**. Mega-arquivo = teste difícil, merge conflict, onboarding lento.

**Frase:** *"Separamos para mudar uma camada sem quebrar as outras."*

---

# Plano de treino sugerido

| Dia | Ação |
|-----|------|
| 1 | Bloco 1 (5 perguntas) — arquitetura |
| 2 | Bloco 2 (5 perguntas) — DI e rotas |
| 3 | Bloco 3 (5 perguntas) — HTTP e RxJS |
| 4 | Bloco 4 (5 perguntas) — signals, perf, testes |
| 5 | Bloco 5 (5 perguntas) — projetos e gestor |
| 6 | Bloco 6 (15 perguntas) — revisão avançada **(letras misturadas)** |
| 7 | Bloco 7 (15 perguntas) — nível entrevista (lazy, testes HTTP, ADR) |
| 8 | Bloco 8 (20 perguntas) — **caça-falhas sênior** — faça sem pressa |
| 9 | Revisar **só** as erradas do 8 + explicar em voz alta 60s cada |

**Meta blocos 1–5:** acertar **20+ de 25** e conseguir explicar o **"Por quê"** sem ler.  
**Meta blocos 6–7:** acertar **12+ de 15** em cada.  
**Meta bloco 8:** acertar **13+ de 20** — se gabaritar de primeira, o nível subiu de verdade; se não, anote os temas e volte ao módulo correspondente.

---

# Cartões rápidos (última revisão antes da reunião)

| Pergunta flash | Resposta em 1 linha |
|----------------|---------------------|
| Smart faz o quê? | Orquestra; injeta services; delega UI |
| Dumb faz o quê? | `input`/`output`; OnPush; sem HTTP |
| Facade faz o quê? | API + state + loading/erro para o smart |
| switchMap por quê? | Cancela busca anterior |
| Signals por quê? | Estado e computed síncronos |
| OnPush por quê? | Performance + contrato imutável |
| Guard auth? | Redireciona login + returnUrl |
| SSR + localStorage? | `isPlatformBrowser` |
| Sinacor vs lab? | containers/presenters/state vs pages/ui |
| Boilerplate? | Estrutura repetitiva que padroniza |
| HTTP no dumb? | Errado — smart/facade orquestra |
| Filtro não filtra? | Template ligado ao signal errado |
| guestGuard? | Logado em /login → dashboard |
| NG0908? | zone.js duplicado |
| CSV export? | Evento no presenter; download no container/facade |
| computed vs map? | Signal síncrono vs stream assíncrono |
| Lazy load? | Bundle menor — feature sob demanda |
| concatMap? | Fila HTTP — não cancela anterior |
| effect vs computed? | Side effect vs valor derivado |
| ADR? | Por que escolhemos o padrão |
| expectOne + flush? | Teste HTTP controlado |
| canDeactivate? | Form dirty → confirma saída |
| Mock interceptor? | Fixtures sem backend real |
| OnPush + push()? | Referência igual — não atualiza |
| Mock short-circuit? | Interceptors depois não rodam |
| exhaustMap submit? | Ignora clique durante POST |
| toSignal sem initial? | undefined até emitir |
| asReadonly array? | Não impede mutação in-place |
| DI circular? | NG0200 — api não injeta facade |
| loading preso? | Falta finalize/catchError |
| 5× async pipe cold? | 5 subscriptions — use shareReplay |
| Guard redirect? | UrlTree, não navigate() |

---

*Última atualização: 75 perguntas — blocos 1–8 (`angular-lab`, `FinControl`, `gestao-titulos`). Bloco 8 = nível sênior / caça-falhas.*
