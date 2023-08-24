import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAmenity: async (_, { name, description }, { loggedInUser }) => {
      const existingAmenity = await client.amenity.findFirst({
        where: {
          AND: [
            {
              name,
            },
          ],
        },
      });
      console.log("existingAmenity", existingAmenity);
      if (existingAmenity) {
        return {
          ok: false,
          error: "This amenity's name exists already .",
        };
      }

      const amenity = await client.amenity.create({
        data: {
          name,
          description,
        },
      });

      if (amenity) {
        return {
          ok: true,
        };
      }
    },
  },
};
