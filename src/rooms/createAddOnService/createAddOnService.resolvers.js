import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAddOnService: async (_, { name, description }, { loggedInUser }) => {
      const existingAddOnService = await client.addOnService.findFirst({
        where: {
          AND: [
            {
              name,
            },
          ],
        },
      });
      if (existingAddOnService) {
        return {
          ok: false,
          error: "This addOnService's name exists already .",
        };
      }

      const addOnService = await client.addOnService.create({
        data: {
          name,
          description,
        },
      });

      if (addOnService) {
        return {
          ok: true,
        };
      }
    },
  },
};
