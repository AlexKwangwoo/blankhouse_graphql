import { gql } from "apollo-server";

export default gql`
  type SeeAllAddOnServicesResult {
    ok: Boolean!
    error: String
    addOnServices: [AddOnService]
    totalPages: Int
  }

  type Query {
    # seeAllPerks: [Experience]
    seeAllAddOnServices(perPage: Int!, page: Int!): SeeAllAddOnServicesResult!
  }
`;
