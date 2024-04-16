import { ValidationError } from 'apollo-server';
import axios from 'axios';

export const getPosts = (path = '/') =>
  axios.get(process.env.API_URL + `/posts${path}`);

export const createPostFn = async (data, dataSources) => {
  const { title, body, userId } = await createPostInfo(data, dataSources);
  if (!title || !body || !userId) {
    throw new ValidationError('Invalid input');
  }

  return await dataSources.post('/posts', {
    title,
    body,
    userId,
  });
};

const userExists = async (userId, dataSources) => {
  try {
    await dataSources.context.dataSources.userAPI.getUser(userId);
    return true;
  } catch (error) {
    throw new ValidationError('User does not exist');
  }
};

const createPostInfo = async (postData, dataSources) => {
  const { title, body, userId } = postData;

  await userExists(userId, dataSources);

  const indexRefPost = await dataSources.getPosts('?_sort=indexRef&_limit=1');

  const indexRef = indexRefPost[0] ? indexRefPost[0].indexRef + 1 : 0;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
