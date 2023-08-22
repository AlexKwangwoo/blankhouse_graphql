import { gql } from "apollo-server";

export default gql`
  type SeeAllReviewsResponseType {
    data: [Review]
    ok: Boolean!
    error: String
  }

  type Query {
    seeAllReviews(
      isRoom: Boolean
      isExperience: Boolean
    ): SeeAllReviewsResponseType!
  }
`;
