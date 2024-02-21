const getPosts = async (_, __, context) => {
  const posts = await context.getPosts();
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
};
