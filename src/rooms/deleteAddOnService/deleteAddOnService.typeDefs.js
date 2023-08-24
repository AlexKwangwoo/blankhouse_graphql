import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    deleteAddOnService(id: Int!): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
