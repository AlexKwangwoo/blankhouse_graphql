import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteExperience(id: Int!): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
