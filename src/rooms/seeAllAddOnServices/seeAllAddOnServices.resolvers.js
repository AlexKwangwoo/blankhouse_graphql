import client from "../../client";

export default {
  Query: {
    seeAllAddOnServices: async (_, { perPage, page }) => {
      if (page < 1) {
        return {
          ok: false,
          error: "Page should be higher than 0",
        };
      }
      var result = await client.addOnService.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
      });

      const totalAddOnServices = await client.addOnService.count();

      return {
        ok: true,
        addOnServices: result,
        totalPages: Math.ceil(totalAddOnServices / perPage),
      };
    },
  },
};
