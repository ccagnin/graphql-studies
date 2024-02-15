import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      hello: String
      hi: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => {
        return 'Hello, world!';
      },
      hi: () => {
        return 'Hi, world!';
      },
    },
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
