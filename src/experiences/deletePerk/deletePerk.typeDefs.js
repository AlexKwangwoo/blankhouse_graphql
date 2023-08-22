import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    deletePerk(id: Int!): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
