import axios from 'axios';

export const getUsers = (path = '/') =>
  axios.get(process.env.API_URL + `/users${path}`);
