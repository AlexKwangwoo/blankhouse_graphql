import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editAddOnService: protectedResolver(
      async (
        _,
        { id, name, description },
        { loggedInUser, protectResolver }
      ) => {
        const existingAddOnService = await client.addOnService.findFirst({
          where: {
            id,
          },
        });
        if (!existingAddOnService) {
          return {
            ok: false,
            error: "This addOnService does not exist.",
          };
        }

        const updatedAmenity = await client.addOnService.update({
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
            error: "Could not update addOnService.",
          };
        }
      }
    ),
  },
};
