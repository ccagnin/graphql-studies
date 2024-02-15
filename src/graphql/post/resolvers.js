const posts = [
  {
    id: '1',
    title: 'Hello World',
    content: 'This is post 1',
    user: {
      id: '1',
    },
  },
  {
    id: '2',
    title: 'Hello World 2',
    content: 'This is post 2',
    user: {
      id: '2',
    },
  },
];

const post = {
  id: '1',
  title: 'Hello World',
  content: 'This is post 1',
  user: {
    id: '1',
  },
};

export const postResolvers = {
  Query: {
    post: () => post,
    posts: () => posts,
  },
};
