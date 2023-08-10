import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editCategory: protectedResolver(
      async (_, { id, kind, name }, { loggedInUser, protectResolver }) => {
        const existingCategory = await client.category.findFirst({
          where: {
            id,
          },
        });
        if (!existingCategory) {
          return {
            ok: false,
            error: "This category does not exist.",
          };
        }

        const updatedCategory = await client.category.update({
          where: {
            id,
          },
          data: {
            kind,
            name,
          },
        });
        if (updatedCategory.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update category.",
          };
        }
      }
    ),
  },
};
