import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  type Post {
    id: ID
    title: String
    content: String
    user: User
  }

  extend type Query {
    post: Post
    posts: [Post!]!
  }
`;
