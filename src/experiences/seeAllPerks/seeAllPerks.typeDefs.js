import { gql } from "apollo-server";

export default gql`
  type SeeAllPerksResult {
    ok: Boolean!
    error: String
    perks: [Perk]
    totalPages: Int
  }

  type Query {
    # seeAllPerks: [Experience]
    seeAllPerks(perPage: Int!, page: Int!): SeeAllPerksResult!
  }
`;
