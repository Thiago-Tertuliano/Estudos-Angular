# Meu Primeiro App :angular:

Projeto de estudos desenvolvido durante o curso de Angular da **[Fernanda Kipper](https://github.com/Fernanda-Kipper)** :rocket:

## :book: O que foi aprendido

### 1. Control Flow — `@for`

Percorre listas de forma declarativa no template:

```html
@for (item of itens(); track item.id) {
  <li>{{ item.nome }}</li>
}
```

### 2. Control Flow — `@if` / `@else`

Renderiza conteudo condicionalmente sem diretivas:

```html
@if (itens.length === 0) {
  <p>Nenhum item cadastrado.</p>
} @else {
  <ul>...</ul>
}
```

### 3. Control Flow — `@switch`

Alterna entre multiplos casos de forma limpa:

```html
@switch (item.status) {
  @case ('ativo')   { <span>Ativo</span> }
  @case ('inativo') { <span>Inativo</span> }
  @default          { <span>Pendente</span> }
}
```

### 4. Services & Injecao de Dependencia

`DadosService` gerencia o estado com `signal` e e injetado via funcao `inject()`:

```typescript
private readonly dadosService = inject(DadosService);
readonly itens = this.dadosService.itensSignal;
```

## :computer: Como rodar

```bash
ng serve
```

Acesse `http://localhost:4200/`.

## :mortar_board: Agradecimentos

A [Fernanda Kipper](https://github.com/Fernanda-Kipper) pelo conteudo incrivel e didatica excepcional.
