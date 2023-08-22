import client from "../../client";

export default {
  Query: {
    seeAllPerks: async (_, { perPage, page }) => {
      if (page < 1) {
        return {
          ok: false,
          error: "Page should be higher than 0",
        };
      }
      var result = await client.perk.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
      });

      const totalPerks = await client.perk.count();

      return {
        ok: true,
        perks: result,
        totalPages: Math.ceil(totalPerks / perPage),
      };
    },
  },
};
