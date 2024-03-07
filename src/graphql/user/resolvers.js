const getUsers = async (_, { input }, { getUsers }) => {
  const ApiFiltersInput = new URLSearchParams(input).toString();
  const users = await getUsers(`/?${ApiFiltersInput}`);
  return users.data;
};

const getUser = async (_, { id }, { getUsers }) => {
  const response = await getUsers(`/${id}`);
  return response.data;
};

export const userResolvers = {
  Query: {
    users: getUsers,
    user: getUser,
  },
};
