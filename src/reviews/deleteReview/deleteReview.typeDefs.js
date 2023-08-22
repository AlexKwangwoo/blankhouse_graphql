import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteReview(id: Int!): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
