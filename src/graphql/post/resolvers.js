const getPosts = async (_, { input }, context) => {
  const ApiFiltersInput = new URLSearchParams(input).toString();
  console.log(ApiFiltersInput);
  const posts = await context.getPosts(`/?${ApiFiltersInput}`);
  return posts.data;
};

const getPost = async (_, { id }, context) => {
  const post = await context.getPosts(`/${id}`);
  return post.data;
};

export const postResolvers = {
  Query: {
    posts: getPosts,
    post: getPost,
  },
  Post: {
    unixTimestamp: ({ createdAt }) => {
      const timestamp = new Date(createdAt).getTime() / 1000;
      return Math.floor(timestamp).toString();
    },
  },
};
