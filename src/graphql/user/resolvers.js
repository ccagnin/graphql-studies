const getUsers = async (_, { input }, context) => {
  const ApiFiltersInput = new URLSearchParams(input).toString();
  const users = await context.getUsers(`/?${ApiFiltersInput}`);
  return users.data;
};

const getUser = async (_, { id }, context) => {
  const response = await context.getUsers(`/${id}`);
  return response.data;
};

export const userResolvers = {
  Query: {
    users: getUsers,
    user: getUser,
  },
};
