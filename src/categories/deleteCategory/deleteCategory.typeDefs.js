import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    deleteCategory(id: Int!): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
