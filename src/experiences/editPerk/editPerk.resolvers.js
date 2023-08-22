import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editPerk: protectedResolver(
      async (
        _,
        { id, name, details, explanation },
        { loggedInUser, protectResolver }
      ) => {
        const existingPerk = await client.perk.findFirst({
          where: {
            id,
          },
        });
        if (!existingPerk) {
          return {
            ok: false,
            error: "This perk does not exist.",
          };
        }

        const updatedPerk = await client.perk.update({
          where: {
            id,
          },
          data: {
            name,
            details,
            explanation,
          },
        });
        if (updatedPerk.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update perk.",
          };
        }
      }
    ),
  },
};
