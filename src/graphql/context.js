import { getUsers } from './user/utils';
import { getPosts } from './post/utils';

export const context = () => {
  return {
    getUsers: getUsers,
    getPosts: getPosts,
  };
};
