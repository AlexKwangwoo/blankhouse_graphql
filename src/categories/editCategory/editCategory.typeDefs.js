import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    editCategory(id: Int!, name: String!, kind: String!): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
