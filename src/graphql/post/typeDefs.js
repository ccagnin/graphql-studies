import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
    indexRef: Int!
    createdAt: String!
    unixTimestamp: String!
  }

  extend type Query {
    post(id: ID!): Post!
    posts(input: ApiFiltersInput): [Post!]!
  }
`;
