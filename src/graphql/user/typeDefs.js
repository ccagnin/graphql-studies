import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type User {
    id: ID
    email: String
    password: String
  }

  extend type Query {
    user: User
    users: [User!]!
  }
`;
