import { gql } from "apollo-server";

export default gql`
  type Experience {
    id: Int!
    country: String!
    city: String!
    name: String!
    price: Int!
    address: String!
    start: String!
    end: String!
    description: String
    things_to_know: String
    user: User!
    perk: [Perk]
    category: Category
    createdAt: String!
    updatedAt: String!
  }

  type Perk {
    id: Int!
    name: String!
    details: String!
    explanation: String
    experience(page: Int!): [Experience]
    createdAt: String!
    updatedAt: String!
  }
`;
