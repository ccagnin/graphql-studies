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

## Aula 3

- Tipos escalares: Tipos primitivos do GraphQL, como String, Int, Float, Boolean e ID
- !: Indica que o campo é obrigatório, não pode ser nulo
- Pode-se criar arrays de tipos escalares
- [String!]!: Array de strings não nulas
    - ! após o String: strings dentro do array não podem ser nulas
    - ! após o array: o array em si não pode ser nulo
    - ! após o array e após o String: o array e as strings dentro do array não podem ser nulas

### Query
```graphql
type Query {
  id: ID!
  name: String!
  age: Int!
  average: Float!
  isGood: Boolean!
  array: [String!]!
}
```

### Response
```graphql
{
  "data": {
    "id": "1",
    "name": "John Doe",
    "age": 30,
    "average": 7.5,
    "isGood": true,
    "array": [
      "one",
      "two",
      "three"
    ]
  }
}
```

## Aula 4
- Object Types: Tipos de objetos - Permite criar objetos com campos personalizados

```javascript
type Query {
  person: Person!
}

type Person {
  id: ID!
  name: String!
  age: Int!
  average: Float!
  isGood: Boolean!
  array: [String!]!
}
```

### Response
```graphql
{
  "data": {
    "person": {
      "id": "1",
      "name": "John Doe",
      "age": 30,
      "average": 7.5,
      "isGood": true,
      "array": [
        "one",
        "two",
        "three"
      ]
    }
  }
}
```

- Na request, obrigatoriamente, é necessário passar todos os campos desejados no type Person, não sendo possível passar apenas `Person` sem os campos

- Podemos também retornar um array de objetos

```javascript
type Query {
  people: [Person!]!
}

type Person {
  id: ID!
  name: String!
  age: Int!
  average: Float!
  isGood: Boolean!
  array: [String!]!
}
```

### Response
```graphql
{
  "data": {
    "people": [
      {
        "id": "1",
        "name": "John Doe",
        "age": 30,
        "average": 7.5,
        "isGood": true,
        "array": [
          "one",
          "two",
          "three"
        ]
      },
      {
        "id": "2",
        "name": "Jane Doe",
        "age": 25,
        "average": 8.5,
        "isGood": true,
        "array": [
          "four",
          "five",
          "six"
        ]
      }
    ]
  }
}
```


