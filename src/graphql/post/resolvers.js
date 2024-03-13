const getPosts = async (_, { input }, { getPosts }) => {
  const ApiFiltersInput = new URLSearchParams(input).toString();
  const posts = await getPosts(`/?${ApiFiltersInput}`);
  return posts.data;
};

const getPost = async (_, { id }, { getPosts }) => {
  const response = await getPosts(`/${id}`);
  return response.data;
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
