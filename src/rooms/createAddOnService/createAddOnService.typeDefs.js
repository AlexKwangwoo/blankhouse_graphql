import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAddOnService(name: String!, description: String): MutationResponse!
  }
`;
