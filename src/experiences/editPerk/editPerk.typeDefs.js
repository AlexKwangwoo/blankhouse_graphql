import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    editPerk(
      id: Int!
      name: String
      details: String
      explanation: String
    ): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
