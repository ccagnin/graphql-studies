import { RESTDataSource } from 'apollo-datasource-rest';
import { makerPostDataLoader } from './dataLoaders';

export class PostsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
    this.dataLoader = makerPostDataLoader(this.getPost.bind(this));
  }

  async getPosts(urlParams) {
    return this.get(`/posts`, urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getPost(id) {
    return this.get(`/posts/${id}`, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id);
  }
}
