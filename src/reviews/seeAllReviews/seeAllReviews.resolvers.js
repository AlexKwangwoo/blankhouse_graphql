import client from "../../client";

export default {
  Query: {
    seeAllReviews: async (_, { isRoom, isExperience }) => {
      console.log("isRoom", isRoom);
      console.log("isRoom === undefined", isRoom === undefined);
      var result;
      if (isRoom === undefined && isExperience === undefined) {
        return {
          ok: false,
          error: `Please Pass isRoom or isExperience`,
          data: null,
        };
      }

      if (isRoom && isExperience) {
        result = client.review.findMany();
      } else if (isRoom) {
        result = client.review.findMany({
          where: { NOT: [{ room: null }] },
        });
      } else if (isExperience) {
        result = client.review.findMany({
          where: { NOT: [{ experience: null }] },
        });
      }
      return {
        ok: true,
        data: result,
      };
    },
  },
};
