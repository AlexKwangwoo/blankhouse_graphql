import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCategory: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const existingCategory = await client.category.findUnique({
        where: {
          id,
        },
      });
      console.log("existingCategory", existingCategory);
      if (!existingCategory) {
        return {
          ok: false,
          error: "This category does not exist.",
        };
      }
      await client.category.delete({
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
