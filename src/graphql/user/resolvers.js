const getUsers = async (_, { input }, { dataSource }) => {
  return dataSource.userAPI.dataLoader.load(input);
};

const getUser = async (_, { id }, { dataSources }) => {
  return await dataSources.userAPI.getUser(id);
};

const getPosts = async ({ id }, _, { dataSources }) => {
  return dataSources.postAPI.batchLoadByUserId(id);
};

export const userResolvers = {
  Query: {
    users: getUsers,
    user: getUser,
  },
  User: {
    posts: getPosts,
  },
};
