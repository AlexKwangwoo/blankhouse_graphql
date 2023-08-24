import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editAmenity: protectedResolver(
      async (
        _,
        { id, name, description },
        { loggedInUser, protectResolver }
      ) => {
        const existingAmenity = await client.amenity.findFirst({
          where: {
            id,
          },
        });
        if (!existingAmenity) {
          return {
            ok: false,
            error: "This amenity does not exist.",
          };
        }

        const updatedAmenity = await client.amenity.update({
          where: {
            id,
          },
          data: {
            name,
            description,
          },
        });
        if (updatedAmenity.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update amenity.",
          };
        }
      }
    ),
  },
};
