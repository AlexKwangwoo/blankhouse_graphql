import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createReview: async (
      _,
      {
        experienceId,
        roomId,
        payload,
        rating,
        cleanliness_rating,
        communication_rating,
        location_rating,
        accuracy_rating,
        check_in_rating,
        experience_rating,
      },
      { loggedInUser }
    ) => {
      console.log("experienceId", experienceId);
      console.log("roomId", roomId);

      if (roomId) {
        const checkRoom = await client.room.findUnique({
          where: { id: roomId },
        });
        if (checkRoom === null) {
          return {
            ok: false,
            error: `Room does not exist`,
          };
        }
      } else if (experienceId) {
        const checkExperience = await client.experience.findUnique({
          where: { id: experienceId },
        });
        if (checkExperience === null) {
          return {
            ok: false,
            error: `Experience does not exist`,
          };
        }
      }

      // const existingExperience = await client.experience.findFirst({
      //   where: {
      //     AND: [
      //       {
      //         name,
      //       },
      //       {
      //         categoryId,
      //       },
      //     ],
      //   },
      // });
      // if (existingExperience) {
      //   return {
      //     ok: false,
      //     error: "This experience's name exists already .",
      //   };
      // }

      const reivew = await client.review.create({
        data: {
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },

          ...(roomId && {
            room: {
              connect: {
                id: roomId,
              },
            },
          }), //uglyPassword 있다면! password uglyPassword를 넣겠다!

          ...(experienceId && {
            experience: {
              connect: {
                id: experienceId,
              },
            },
          }), //uglyPassword 있다면! password uglyPassword를 넣겠다!

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
      console.log("reivew", reivew);

      if (reivew) {
        return {
          ok: true,
        };
      }
    },
  },
};
