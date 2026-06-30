# Como usar — Gestão de Títulos

## 1. Rodar o projeto

```bash
ng serve
```

## 2. Testar fluxo

1. Abra `/gestao-titulos`
2. Preencha filtros (ex.: nome "Ana") e clique **Pesquisar**
3. Clique **Editar** em uma linha, altere dados e **Salvar**
4. Clique **Exportar CSV** — arquivo `titulos.csv` é baixado

## 3. Debug com DevTools

- **Network:** simule latência (mock usa 400ms)
- **Angular DevTools:** inspecione signals do `TituloStateService`
- **Console:** erros do facade aparecem com prefixo `[TituloService]`

## 4. Estender para API real

1. Substitua `TituloApiService` por chamadas `HttpClient`
2. Mantenha `TituloService` como facade
3. Container não muda
