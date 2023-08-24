import { gql } from "apollo-server";

export default gql`
  type Room {
    id: Int!
    name: String!
    country: String!
    city: String!
    price: Int!
    cleaning_fee: Int!
    number_of_room: Int!
    number_of_toilet: Int!
    number_of_bed: Int!
    maximum_guests: Int!
    description: String
    address: String
    pet_friendly: Boolean!
    house_type: String
    things_to_know: String
    user: User!
    category: Category
    amenity: [Amenity]
    addOnService: [AddOnService]
    createdAt: String!
    updatedAt: String!
  }

  type Amenity {
    id: Int!
    name: String!
    description: String
    room(page: Int!): [Room]
    createdAt: String!
    updatedAt: String!
  }

  type AddOnService {
    id: Int!
    name: String!
    description: String
    room(page: Int!): [Room]
    createdAt: String!
    updatedAt: String!
  }
`;
