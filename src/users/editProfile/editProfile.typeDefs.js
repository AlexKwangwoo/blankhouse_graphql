import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    editProfile(
      # firstName: String
      # lastName: String
      # username: String
      # email: String
      # password: String
      # bio: String

      email: String
      username: String
      bio: String
      avatar: Upload
      password: String
      balance: Int
      address: String
      emergency_contact: String
      phone_number: String
      is_host: Boolean
      born_year: String
      school: String
      work: String
      hobby: String
      gender: String
      language: String
      currency: String
    ): MutationResponse!
  }
`;
// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
