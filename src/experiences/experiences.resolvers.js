import client from "../client";

export default {
  Experience: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    category: async ({ categoryId }) => {
      if (categoryId) {
        return await client.category.findUnique({
          where: { id: categoryId },
        });
      }
    },
    perk: async ({ id }) => {
      if (id) {
        return await client.perk.findMany({
          where: {
            experience: {
              some: {
                id,
              },
            },
          },
        });
      }
    },
    start: ({ start }) => start.toISOString(),
    end: ({ end }) => end.toISOString(),
  },
  Perk: {
    experience: async ({ id }) => {
      if (id) {
        return await client.experience.findMany({
          where: { id },
        });
      }
    },
  },
};
