import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteReview: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const existingReview = await client.review.findUnique({
        where: {
          id,
        },
      });
      if (!existingReview) {
        return {
          ok: false,
          error: "This review does not exist.",
        };
      }
      await client.review.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
