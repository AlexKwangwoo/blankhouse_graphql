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
  },
};
