import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editExperience(
      id: Int!
      categoryId: Int
      name: String
      country: String
      city: String
      price: Int
      start: Date
      end: Date
      description: String
      address: String
      things_to_know: String
      perksId: [Int]
    ): MutationResponse!
  }
`;
