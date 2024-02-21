import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type User {
    id: ID
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
  }

  extend type Query {
    user: User
    users: [User!]!
  }
`;
