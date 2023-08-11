import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createRoom(
      name: String!
      categoryId: Int!
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
      house_type: String!
      things_to_know: String
    ): MutationResponse!
  }
`;
