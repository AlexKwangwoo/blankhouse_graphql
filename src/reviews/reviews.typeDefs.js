import { gql } from "apollo-server";

export default gql`
  type Review {
    id: Int!
    user: User!
    experience: Experience
    room: Room
    payload: String!
    rating: Int!
    cleanliness_rating: Int!
    communication_rating: Int!
    location_rating: Int!
    accuracy_rating: Int!
    check_in_rating: Int!
    experience_rating: Int!
  }
`;
