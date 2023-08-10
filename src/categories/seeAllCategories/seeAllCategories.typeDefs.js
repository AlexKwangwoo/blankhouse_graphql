import { gql } from "apollo-server";

export default gql`
  type Query {
    seeAllCategories(kind: String!): [Category]
  }
`;
