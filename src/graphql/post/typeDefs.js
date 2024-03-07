import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    # user: User!
    indexRef: Int!
    createdAt: String!
    unixTimestamp: String!
  }

  extend type Query {
    post(id: ID!): PostResult!
    posts(input: ApiFiltersInput): [Post!]!
  }

  type PostNotFoundError {
    statusCode: Int!
    message: String!
  }

  union PostResult = Post | PostNotFoundError
`;
