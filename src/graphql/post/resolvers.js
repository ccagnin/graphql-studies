const getPosts = async (_, { input }, context) => {
  const ApiFiltersInput = new URLSearchParams(input).toString();
  const posts = await context.getPosts(`/?${ApiFiltersInput}`);
  return posts.data;
};

const getPost = async (_, { id }, context) => {
  try {
    const post = await context.getPosts(`/${id}`);
    return post.data;
  } catch (error) {
    if (error.response.status === 404) {
      return {
        statusCode: 404,
        message: 'Post not found',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error',
      };
    }
  }
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
  PostResult: {
    __resolveType: (obj) => {
      if (obj.statusCode !== undefined) return 'PostNotFoundError';
      if (obj.id !== undefined) return 'Post';
      return null;
    },
  },
};
