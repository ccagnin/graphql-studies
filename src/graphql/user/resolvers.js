const getUsers = async (_, __, { axios }) => {
  try {
    const response = await axios.get('http://localhost:3001/users');
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getUser = async (_, { id }, { axios }) => {
  try {
    const response = await axios.get(`http://localhost:3001/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const userResolvers = {
  Query: {
    users: () => getUsers(),
    user: (_, { id }) => getUser(_, { id }),
  },
};
