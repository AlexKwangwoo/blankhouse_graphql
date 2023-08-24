import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    deleteAmenity(id: Int!): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
