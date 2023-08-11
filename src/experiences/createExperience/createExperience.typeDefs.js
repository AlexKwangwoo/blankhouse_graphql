import { gql } from "apollo-server";

export default gql`
  scalar Date
  type Mutation {
    createExperience(
      name: String!
      categoryId: Int!
      country: String!
      city: String!
      price: Int!
      address: String!
      start: Date!
      end: Date!
      description: String
      things_to_know: String
    ): MutationResponse!
  }
`;
