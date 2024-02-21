import axios from 'axios';

export const context = () => {
  return {
    getUsers: (path = '/') => axios.get(`http://localhost:3001/users${path}`),
  };
};
