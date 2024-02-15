import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      id: ID!
      name: String
      age: Int
      average: Float
      active: Boolean!
      array: [String!]
    }
  `,
  resolvers: {
    Query: {
      id: () => '1jkhfd1-2j3',
      name: () => 'John Doe',
      age: () => 30,
      average: () => 7.8,
      active: () => true,
      array: () => ['a', 'b', 'c'],
    },
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
