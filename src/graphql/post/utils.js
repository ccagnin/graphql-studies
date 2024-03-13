import axios from 'axios';

export const getPosts = (path = '/') =>
  axios.get(process.env.API_URL + `/posts${path}`);
