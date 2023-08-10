import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createCategory: async (_, { name, kind }) => {
      const existingCategory = await client.category.findFirst({
        where: {
          AND: [
            {
              name,
            },
            {
              kind,
            },
          ],
        },
      });
      if (existingCategory) {
        return {
          ok: false,
          error: "This category is already taken.",
        };
      }
      const category = await client.category.create({
        data: {
          name,
          kind,
        },
      });

      if (category) {
        return {
          ok: true,
        };
      }
    },
  },
};
