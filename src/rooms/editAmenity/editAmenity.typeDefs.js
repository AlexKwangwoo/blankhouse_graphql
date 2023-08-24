import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editAmenity(id: Int!, name: String, description: String): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
