import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteExperience: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const existingExperience = await client.experience.findUnique({
        where: {
          id,
        },
      });
      if (!existingExperience) {
        return {
          ok: false,
          error: "This experience does not exist.",
        };
      }
      await client.experience.delete({
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
