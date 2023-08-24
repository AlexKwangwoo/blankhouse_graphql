import client from "../../client";

export default {
  Query: {
    seeAllAmenities: async (_, { perPage, page }) => {
      if (page < 1) {
        return {
          ok: false,
          error: "Page should be higher than 0",
        };
      }
      var result = await client.amenity.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
      });

      const totalAmenities = await client.amenity.count();

      return {
        ok: true,
        amenities: result,
        totalPages: Math.ceil(totalAmenities / perPage),
      };
    },
  },
};
