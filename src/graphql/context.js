import { getUsers } from './user/utils';
import { makerUserDataLoader } from './user/dataLoaders';
import { getPosts } from './post/utils';

export const context = () => {
  return {
    userDataLoader: makerUserDataLoader(getUsers),
    getUsers: getUsers,
    getPosts: getPosts,
  };
};
