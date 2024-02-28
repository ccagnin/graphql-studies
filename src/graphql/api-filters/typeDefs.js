import { gql } from 'apollo-server';

export const apiFiltersTypeDefs = gql`
  input ApiFiltersInput {
    _sort: String
    _order: ApiFiltersOrderEnum
    _start: Int
    _limit: Int
  }

  enum ApiFiltersOrderEnum {
    ASC
    DESC
  }
`;
