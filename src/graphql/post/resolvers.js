// Query resolvers
const getPosts = async (_, { input }, { dataSources }) => {
  return dataSources.postAPI.getPosts(input);
};

const getPost = async (_, { id }, { dataSources }) => {
  return dataSources.postAPI.getPost(id);
};

// Mutation resolvers
const createPost = async (_, { input }, { dataSources }) => {
  return dataSources.postAPI.createPost(input);
};

// Field resolvers
const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userAPI.batchLoadByUserId(userId);
};

export const postResolvers = {
  Query: {
    posts: getPosts,
    post: getPost,
  },
  Post: {
    user: user,
  },
  Mutation: {
    createPost: createPost,
  },
};
