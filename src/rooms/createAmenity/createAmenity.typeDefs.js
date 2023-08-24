import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAmenity(name: String!, description: String): MutationResponse!
  }
`;
