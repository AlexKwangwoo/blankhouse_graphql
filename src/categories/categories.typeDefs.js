import { gql } from "apollo-server";

export default gql`
  type Category {
    id: Int!
    name: String!
    kind: String!
    createdAt: String!
    updatedAt: String!
  }
`;
