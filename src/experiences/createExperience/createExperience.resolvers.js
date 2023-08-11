import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createExperience: async (
      _,
      {
        name,
        categoryId,
        country,
        city,
        price,
        address,
        start,
        end,
        description,
        things_to_know,
      },
      { loggedInUser }
    ) => {
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

      const existingExperience = await client.experience.findFirst({
        where: {
          AND: [
            {
              name,
            },
            {
              categoryId,
            },
          ],
        },
      });
      if (existingExperience) {
        return {
          ok: false,
          error: "This experience's name exists already .",
        };
      }
      const formattedStart = new Date(start).toISOString();
      const formattedEnd = new Date(end).toISOString();

      const experience = await client.experience.create({
        data: {
          name,
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          category: {
            connect: {
              id: categoryId,
            },
          },
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

      if (experience) {
        return {
          ok: true,
        };
      }
    },
  },
};
