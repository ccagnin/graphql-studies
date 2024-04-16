import { RESTDataSource } from 'apollo-datasource-rest';
import { makerUserDataLoader } from './dataLoaders';

export class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
    this.dataLoader = makerUserDataLoader(this.getUser.bind(this));
  }

  async getUsers(urlParams) {
    return this.get(`/users`, urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getUser(id) {
    return this.get(`/users/${id}`, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id);
  }
}
