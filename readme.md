## Aula 1

- Criação do Apollo Server
- typeDefs: Definição dos tipos - Schema
- gql: Tagged template literal - Permite escrever queries dentro de strings

### Query
```graphql
type Query {
  hello: String
}
```

### Response
```graphql
{
  "data": {
    "hello": null
  }
}
```

## Aula 2

- Resolvers: Funções que retornam os dados - toda vez que eu chamo a chave hello, o resolver é chamado para retornar o valor
- Mapeia os tipos definidos no typeDefs
- Para cada Type definido no typeDefs, é necessário um resolver

### Response
```graphql
{
  "data": {
    "hello": "Hello, World!"
  }
}
```

