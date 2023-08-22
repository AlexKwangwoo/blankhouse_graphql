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
      console.log("start", start);
      console.log("end", end);
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
      var changeStart = "2023-10-10T" + start + ":00.000Z";
      var changeEnd = "2023-10-11T" + end + ":00.000Z";

      // const formattedStart = new Date(start).toISOString();
      // const formattedEnd = new Date(end).toISOString();

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
          start: changeStart,
          end: changeEnd,
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
