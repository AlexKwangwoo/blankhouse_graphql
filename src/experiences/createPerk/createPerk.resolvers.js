import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createPerk: async (_, { name, details, explanation }, { loggedInUser }) => {
      console.log("name", name);
      const existingPerk = await client.perk.findFirst({
        where: {
          AND: [
            {
              name,
            },
          ],
        },
      });
      console.log("existingPerk", existingPerk);
      if (existingPerk) {
        return {
          ok: false,
          error: "This perk's name exists already .",
        };
      }

      const perk = await client.perk.create({
        data: {
          name,
          details,
          explanation,
        },
      });

      if (perk) {
        return {
          ok: true,
        };
      }
    },
  },
};
