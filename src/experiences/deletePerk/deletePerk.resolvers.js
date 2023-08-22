import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePerk: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const existingPerk = await client.perk.findUnique({
        where: {
          id,
        },
      });
      console.log("existingPerk", existingPerk);
      if (!existingPerk) {
        return {
          ok: false,
          error: "This perk does not exist.",
        };
      }
      await client.perk.delete({
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
