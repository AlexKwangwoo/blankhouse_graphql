import client from "../client";

export default {
  Room: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    category: async ({ categoryId }) => {
      if (categoryId) {
        return await client.category.findUnique({
          where: { id: categoryId },
        });
      }
    },
    amenity: async ({ id }) => {
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
    room: async ({ id }) => {
      if (id) {
        return await client.room.findMany({
          where: { id },
        });
      }
    },
  },

  AddOnService: {
    room: async ({ id }) => {
      if (id) {
        return await client.room.findMany({
          where: { id },
        });
      }
    },
  },
};
