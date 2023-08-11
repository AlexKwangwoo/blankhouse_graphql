import { gql } from "apollo-server";

export default gql`
  type Query {
    seeExperience(id: Int!): Experience
  }
`;
