import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    deleteRoom(id: Int!): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
