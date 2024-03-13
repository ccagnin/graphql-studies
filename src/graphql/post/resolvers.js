const getPosts = async (_, { input }, context) => {
  const ApiFiltersInput = new URLSearchParams(input).toString();
  const posts = await context.getPosts(`/?${ApiFiltersInput}`);
  return posts.data;
};

const getPost = async (_, { id }, context) => {
  const response = await context.getPosts(`/${id}`);
  return response.data;
};

export const postResolvers = {
  Query: {
    posts: getPosts,
    post: getPost,
  },
  Post: {
    user: async (parent, _, context) => {
      const response = await context.getUsers(`/${parent.userId}`);
      return response.data;
    },
  },
};
