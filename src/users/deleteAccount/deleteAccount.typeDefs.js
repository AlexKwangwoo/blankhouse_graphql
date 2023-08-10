import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    deleteAccount: MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
