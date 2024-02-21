import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const context = () => {
  return {
    getUsers: (path = '/') => axios.get(API_URL + `/users${path}`),
    getPosts: (path = '/') => axios.get(API_URL + `/posts${path}`),
  };
};
