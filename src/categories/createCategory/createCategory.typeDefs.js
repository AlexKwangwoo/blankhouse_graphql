import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createCategory(name: String!, kind: String!): MutationResponse!
  }
`;
