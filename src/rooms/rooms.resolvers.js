import client from "../client";

export default {
  Room: {
    // userId 는 Room안의 userId이다! db확인해보면 있음!!

    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    category: async ({ categoryId }) => {
      if (categoryId) {
        return await client.category.findUnique({
          where: { id: categoryId },
        });
      }
    },
    amenity: async ({ id }) => {
      // id는 Room id이다!
      if (id) {
        return await client.amenity.findMany({
          where: {
            room: {
              some: {
                id,
              },
            },
          },
        });
      }
    },
    addOnService: async ({ id }) => {
      if (id) {
        return await client.addOnService.findMany({
          where: {
            room: {
              some: {
                id,
              },
            },
          },
        });
      }
    },
  },
  Amenity: {
    room: async ({ id }, { page }) => {
      // id 는 amanity의 id!
      if (id) {
        var result = await client.room.findMany({
          where: {
            amenity: {
              some: {
                id,
              },
            },
          },
          take: 4,
          skip: (page - 1) * 4,
        });

        return result;
      }
    },
  },

  AddOnService: {
    room: async ({ id }) => {
      if (id) {
        return await client.room.findMany({
          where: {
            amenity: {
              some: {
                id,
              },
            },
          },
        });
      }
    },
  },
};
