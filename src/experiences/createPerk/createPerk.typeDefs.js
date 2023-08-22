import { gql } from "apollo-server";

export default gql`
  scalar Date
  type Mutation {
    createPerk(
      name: String!
      details: String!
      explanation: String
    ): MutationResponse!
  }
`;
