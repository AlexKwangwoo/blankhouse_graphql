import { gql } from "apollo-server";

export default gql`
  type SeeAllAmenitiesResult {
    ok: Boolean!
    error: String
    amenities: [Amenity]
    totalPages: Int
  }

  type Query {
    # seeAllPerks: [Experience]
    seeAllAmenities(perPage: Int!, page: Int!): SeeAllAmenitiesResult!
  }
`;
