import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/schema';
import { context } from './graphql/context';
import { PostsAPI } from './graphql/post/dataSources';
import { UserAPI } from './graphql/user/dataSource';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => ({
    postAPI: new PostsAPI(),
    userAPI: new UserAPI(),
  }),
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
