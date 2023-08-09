import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    email: String!
    username: String!
    bio: String
    avatar: String
    balance: Int!
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
    isMe: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
