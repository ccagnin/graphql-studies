import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      users: [User!]!
    }

    type User {
      id: ID
      name: String
      email: String
    }
  `,
  resolvers: {
    Query: {
      users() {
        return [
          {
            id: '1',
            name: 'John Doe',
            email: null,
          },
          {
            id: '2',
            name: 'Jane Doe',
            email: null,
          },
        ];
      },
    },
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
