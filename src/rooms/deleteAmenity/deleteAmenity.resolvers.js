import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteAmenity: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const existingAmenity = await client.amenity.findUnique({
        where: {
          id,
        },
      });
      console.log("existingAmenity", existingAmenity);
      if (!existingAmenity) {
        return {
          ok: false,
          error: "This amenity does not exist.",
        };
      }
      await client.amenity.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
