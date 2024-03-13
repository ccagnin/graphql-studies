import { getUsers } from './user/utils';
import { makerUserDataLoader } from './user/dataLoaders';
import { makerPostDataLoader } from './post/dataLoaders';
import { getPosts } from './post/utils';

export const context = () => {
  return {
    userDataLoader: makerUserDataLoader(getUsers),
    postDataLoader: makerPostDataLoader(getPosts),
    getUsers: getUsers,
    getPosts: getPosts,
  };
};
