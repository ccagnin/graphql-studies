import { context } from '../context';

const getUsers = async (_, __, context) => {
  const users = await context.getUsers();
  return users.data;
};

const getUser = async (_, { id }, context) => {
  const response = await context.getUsers(`/${id}`);
  return response.data;
};

export const userResolvers = {
  Query: {
    users: () => getUsers(),
    user: (_, { id }) => getUser(_, { id }, context()),
  },
};
