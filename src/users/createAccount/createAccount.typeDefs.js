import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
      balance: Int!
      is_host: Boolean!
    ): MutationResponse!
  }
`;
