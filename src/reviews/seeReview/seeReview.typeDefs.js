import { gql } from "apollo-server";

export default gql`
  type Query {
    seeReview(id: Int!): Review
  }
`;
