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

## Aula 6, 7 e 8 - Separando os arquivos

- Olhar os commits

## Aula 9 - Criação de DB

- Mapeamento de types de acordo com o db

## Aula 10 - Fetching Data

- Adição do Axios para fazer requisições HTTP
- Atualização dos resolvers para fazer requisições ao json-server

```javascript
const getUsers = async (_, __, { axios }) => {
  try {
    const response = await axios.get('http://localhost:3001/users');
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getUser = async (_, { id }, { axios }) => {
  try {
    const response = await axios.get(`http://localhost:3001/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const userResolvers = {
  Query: {
    users: () => getUsers(),
    user: (_, { id }) => getUser(_, { id }),
  },
};
```

## Aula 11 - Argumentos nos resolvers

- Adição de argumentos nos resolvers

```javascript
const getUser = async (_, { id }, { axios }) => {
  try {
    const response = await axios.get(`http://localhost:3001/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
```

## Aula 12 - Context

- Criação do context separado para a injeção do axios

```javascript
import axios from 'axios';

export const context = {
  axios,
};
```

- Injeção do context no Apollo Server

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
```

- Utilização do context nos resolvers

```javascript
import { context } from '../context';

const getUsers = async (_, __, context) => {
  const users = await context.getUsers();
  return users.data;
};

const getUser = async (_, { id }, context) => {
  const response = await context.getUsers(`/${id}`);
  return response.data;
};

export const userResolvers = {
  Query: {
    users: getUsers,
    user: getUser,
  },
};
```

## Aula 13 - Exercício Post

- Fix no users

## Aula 14 - Argumentos dinâmicos para Queries e Resolvers

- Adição de argumentos dinâmicos para as queries e resolvers

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    userName
  }
}
```

## Aula 15 - Trivial Resolvers

- Adição de trivial resolvers para os campos que não possuem resolvers
- Exemplo: Adição de trivial resolver para o campo `unixTimestamp` do type `Post` que retorna o timestamp em segundos.

```javascript
export const postResolvers = {
  Query: {
    posts: getPosts,
    post: getPost,
  },
  Post: {
    unixTimestamp: ({ createdAt }) => {
      const timestamp = new Date(createdAt).getTime() / 1000;
      return Math.floor(timestamp);
    },
  },
};
```

## Aula 16 - Alias nas Queries

- Adição de alias nas queries, que são utilizados para renomear os campos retornados

```graphql
query GetPost($id: ID!) {
  post1: post(id: $id) {
    postId: id
    unixTimestamp
  }
}
```

- No exemplo acima, o campo `id` foi renomeado para `postId`

## Aula 17 - Fragments

- Adição de fragments para reutilização de campos em queries

```graphql
fragment post on Post {
  id
  title
  unixTimestamp
}

query GetPost($id: ID!) {
  post1: post(id: $id) {
    ...post
  }
}
```

- No exemplo acima, o fragment `post` foi criado para reutilizar os campos `id`, `title` e `unixTimestamp` em queries

## Aula 18 - Input Types

- Adição de input types para parametrização de paginadores

```graphql
query GetUsers {
  users(input: {
    _sort: "indexRef"
    _start: 0
    _limit: 1
  }) {
    id
    firstName
  }
}
```

- No exemplo acima, o input type `UserInput` foi criado para parametrizar a query `users`

- Criamos a pasta `api-filters` e no arquivo `typeDefs` criamos o input type `ApiFiltersInput`

```javascript
export const apiFiltersTypeDefs = gql`
  input ApiFiltersInput {
    _sort: String
    _order: String
    _start: Int
    _limit: Int
  }
`;
```

Nos resolvers, o input type é utilizado da seguinte forma:

```javascript
const getUsers = async (_, { input }, context) => {
  const ApiFiltersInput = new URLSearchParams(input).toString();
  const users = await context.getUsers(`/?${ApiFiltersInput}`);
  return users.data;
};
```

E nos typeDefs, o input type é definido da seguinte forma:

```javascript
  extend type Query {
    user(id: ID!): User
    users(input: ApiFiltersInput): [User!]!
  }
```

Podemos utilizar de forma dinâmica na query:

```graphql
query GetPosts($input: ApiFiltersInput) {
  posts(input: $input) {
    id
    title
    createdAt
  }
}
```

E adicionando as variáveis:

```json
{
  "input": {
    "_sort": "createdAt",
    "_order": "desc", // não funcionou no json-server, então foi removido
    "_start": 0,
    "_limit": 2
  }
}
```

## Aula 19 - Enum Types

- Adição de enum types para parametrização de paginadores

Implementação no typeDefs:

```javascript
export const apiFiltersTypeDefs = gql`
  input ApiFiltersInput {
    _sort: String
    _order: ApiFiltersOrderEnum
    _start: Int
    _limit: Int
  }

  enum ApiFiltersOrderEnum {
    ASC
    DESC
  }
`;
```

Nos resolvers:

```javascript
export const ApiFiltersResolvers = {
  ApiFiltersOrderEnum: {
    ASC: 'asc',
    DESC: 'desc',
  },
};
```

Na query:

```graphql
query GetPosts($input: ApiFiltersInput) {
  posts(input: $input) {
    id
    title
    createdAt
  }
}
```

E nas variáveis:

```json
{
  "input": {
    "_sort": "indexRef",
    "_order": "DESC",
    "_start": 0,
    "_limit": 2
  }
}
```

## Aula 20 - Union Types

- Adição de union types para retornar diferentes tipos de objetos em uma mesma query / mesmo local
- Exemplo: Adição de union type `SearchResult` para retornar diferentes tipos de objetos em uma mesma query
- Uma query que retorna um array de `SearchResult` pode retornar objetos do tipo `User` e `Post` ao mesmo tempo, porém não é possível retornar objetos do tipo `User` e `Post` ao mesmo tempo no mesmo local

- No exemplo que fizemos na aula, criamos um union type `PostNotFound` para retornar um objeto do tipo `Post` ou `PostNotFound` em uma mesma query, caso o post não seja encontrado pelo seu id.

Implementação no typeDefs:

```javascript
  extend type Query {
    post(id: ID!): PostResult!
    posts(input: ApiFiltersInput): [Post!]!
  }

  type PostNotFoundError {
    statusCode: Int!
    message: String!
  }

  union PostResult = Post | PostNotFoundError
```

Nos resolvers:

```javascript
export const postResolvers = {
  Query: {
    posts: getPosts,
    post: getPost,
  },
  PostResult: {
    __resolveType: (obj) => {
      if (obj.statusCode) {
        return 'PostNotFoundError';
      }
      return 'Post';
    },
  },
};
```

E a lógica para retornar o objeto do tipo `PostNotFoundError`:

```javascript
const getPost = async (_, { id }, context) => {
  try {
    const post = await context.getPosts(`/${id}`);
    return post.data;
  } catch (error) {
    if (error.response.status === 404) {
      return {
        statusCode: 404,
        message: 'Post not found',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error',
      };
    }
  }
};

// só funcionou com try/catch pois o retorno do post com id errado vinha apenas como data: "Not Found", o erro era circular e não conseguia ser tratado
```

Na query:

```graphql
query GetPost($id: ID!) {
  post(id: $id) {
    ... on Post {
      id
      title
      createdAt
    }
    ... on PostNotFoundError {
      statusCode
      message
    }
  }
}
```

## Aula 21 - Interface Types

- Define um contrato para os tipos que a implementam para definir campos comuns
- No exemplo da aula definimos a interface `Post Error` com os campos `statusCode` e `message` e os tipos `PostNotFoundError` e `PostInternalServerError` que implementam a interface `PostError`
```javascript
// Utilizei apenas o primeiro tipo no código para manter mais simples
```

Exemplo de implementação:

No typeDefs:

```javascript
  interface PostError {
    statusCode: Int!
    message: String!
  }

  type PostNotFoundError implements PostError {
    statusCode: Int!
    message: String!
    postId: String!
  }

  type PostInternalServerError implements PostError {
    statusCode: Int!
    message: String!
    statusText: String!
  }
```

Nos resolvers:

```javascript


const getPost = async (_, { id }, context) => {
  try {
    const post = await context.getPosts(`/${id}`);
    return post.data;
  } catch (error) {
    if (error.response.status === 404) {
      return {
        statusCode: 404,
        message: 'Post not found',
        postId: id,
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error',
        statusText: error.response.statusText,
      };
    }
  }
};



PostError: {
    __resolveType: (obj) => {
      if (obj.statusCode === 404) return 'PostNotFoundError';
      if (obj.statusCode === 500) return 'PostInternalServerError';
      return null;
    },
  },
```

Na query:

```graphql
query GetPost($id: ID!) {
  post(id: $id) {
    ... on Post {
      id
      title
      createdAt
    }
    ... on PostError {
      statusCode
      message
    }
    ... on PostNotFoundError {
      postId
    }
    ... on PostInternalServerError {
      statusText
    }
  }
}
```

## Aula 22

- Limpeza do código e preparação para o próximo módulo


# Resolvers, Relações, Problema N+1 e Soluções (como dataloader e datasource)















