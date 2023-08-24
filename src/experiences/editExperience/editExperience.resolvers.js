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
          perksId,
        },
        { loggedInUser, protectResolver }
      ) => {
        if (perksId) {
          console.log("perksId", perksId);
          let result = true;
          await Promise.all(
            perksId.map(async (each) => {
              const checkPerk = await client.perk.findUnique({
                where: { id: each },
              });
              if (checkPerk === null) {
                result = false;
              }
            })
          );
          console.log("resultresult", result);

          if (!result) {
            return {
              ok: false,
              error: `Perk does not exist`,
            };
          }
        }

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

        var changeStart = "2023-10-10T" + start + ":00.000Z";
        var changeEnd = "2023-10-11T" + end + ":00.000Z";

        // const formattedStart = new Date(start).toISOString();
        // const formattedEnd = new Date(end).toISOString();

        // console.log("changeStart", changeStart);
        // console.log("changeEnd", changeEnd);
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
            ...(perksId && {
              perk: {
                set: perksId.map((id) => {
                  return { id: id };
                }),
              },
            }),
            name,
            country,
            city,
            price,
            address,
            ...(start && { start: changeStart }),
            ...(end && { end: changeEnd }),
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
