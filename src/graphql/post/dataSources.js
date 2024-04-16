import { RESTDataSource } from 'apollo-datasource-rest';
import { makerPostDataLoader } from './dataLoaders';
import { createPostFn, updatePostFn } from './utils';

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

  async createPost(data) {
    return createPostFn(data, this);
  }

  async updatePost(id, data) {
    return updatePostFn(id, data, this);
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id);
  }
}
