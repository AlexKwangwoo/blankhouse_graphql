import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editExperience: protectedResolver(
      async (
        _,
        {
          id,
          categoryId,
          name,
          country,
          city,
          price,
          address,
          start,
          end,
          description,
          things_to_know,
        },
        { loggedInUser, protectResolver }
      ) => {
        if (categoryId) {
          const checkCategory = await client.category.findUnique({
            where: { id: categoryId },
          });
          if (checkCategory === null) {
            return {
              ok: false,
              error: `Category does not exist`,
            };
          }

          if (checkCategory.kind !== "experience") {
            return {
              ok: false,
              error: "Please select experience kind",
            };
          }
        }

        const existExperience = await client.experience.findUnique({
          where: {
            id,
          },
        });
        if (!existExperience) {
          return {
            ok: false,
            error: "This experience does not exist.",
          };
        }

        const formattedStart = new Date(start).toISOString();
        const formattedEnd = new Date(end).toISOString();

        const updatedExperience = await client.experience.update({
          where: {
            id,
          },
          data: {
            ...(categoryId && {
              category: {
                connect: {
                  id: categoryId,
                },
              },
            }), //uglyPassword 있다면! password uglyPassword를 넣겠다!

            name,
            country,
            city,
            price,
            address,
            start: formattedStart,
            end: formattedEnd,
            description,
            things_to_know,
          },
        });
        if (updatedExperience.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update experience.",
          };
        }
      }
    ),
  },
};
