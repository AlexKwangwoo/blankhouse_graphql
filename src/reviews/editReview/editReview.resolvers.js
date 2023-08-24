import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editReview: protectedResolver(
      async (
        _,
        {
          id,
          payload,
          rating,
          cleanliness_rating,
          communication_rating,
          location_rating,
          accuracy_rating,
          check_in_rating,
          experience_rating,
        },
        { loggedInUser, protectResolver }
      ) => {
        const existingReview = await client.review.findFirst({
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

        const updatedReview = await client.review.update({
          where: {
            id,
          },
          data: {
            payload,
            rating,
            cleanliness_rating,
            communication_rating,
            location_rating,
            accuracy_rating,
            check_in_rating,
            experience_rating,
          },
        });
        if (updatedReview.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update review.",
          };
        }
      }
    ),
  },
};
