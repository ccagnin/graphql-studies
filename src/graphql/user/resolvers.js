const users = [
  {
    id: 1,
    email: 'exemple@email.com',
    password: '123456',
  },
  {
    id: 2,
    email: 'exemple@email.com',
    password: '123456',
  },
];

const user = {
  id: 1,
  email: 'exemple@email.com',
  password: '123456',
};

export const userResolvers = {
  Query: {
    user: () => user,
    users: () => users,
  },
};
