import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createRoom: async (
      _,
      {
        name,
        categoryId,
        country,
        city,
        price,
        cleaning_fee,
        number_of_room,
        number_of_toilet,
        number_of_bed,
        maximum_guests,
        description,
        address,
        pet_friendly,
        house_type,
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

      if (checkCategory.kind !== "room") {
        return {
          ok: false,
          error: "Please select Room kind",
        };
      }

      const existingRoom = await client.room.findFirst({
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
      if (existingRoom) {
        return {
          ok: false,
          error: "This room's name exists already .",
        };
      }
      const room = await client.room.create({
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
          cleaning_fee,
          number_of_room,
          number_of_toilet,
          number_of_bed,
          maximum_guests,
          description,
          address,
          pet_friendly,
          house_type,
          things_to_know,
        },
      });

      if (room) {
        return {
          ok: true,
        };
      }
    },
  },
};
