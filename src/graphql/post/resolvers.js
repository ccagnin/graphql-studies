const getPosts = async (_, { input }, { dataSources }) => {
  return dataSources.postAPI.getPosts(input);
};

const getPost = async (_, { id }, { dataSources }) => {
  return dataSources.postAPI.getPost(id);
};

const user = async ({ userId }, _, { userDataLoader }) => {
  return userDataLoader.load(userId);
};

export const postResolvers = {
  Query: {
    posts: getPosts,
    post: getPost,
  },
  Post: {
    user: user,
  },
};
