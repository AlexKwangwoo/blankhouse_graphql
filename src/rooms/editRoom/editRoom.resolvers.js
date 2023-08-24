import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editRoom: protectedResolver(
      async (
        _,
        {
          id,
          categoryId,
          name,
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
          amenitiesId,
          addOnServicesId,
        },
        { loggedInUser, protectResolver }
      ) => {
        if (amenitiesId) {
          let result = true;
          await Promise.all(
            amenitiesId.map(async (each) => {
              const checkAmenity = await client.amenity.findUnique({
                where: { id: each },
              });
              if (checkAmenity === null) {
                result = false;
              }
            })
          );

          if (!result) {
            return {
              ok: false,
              error: `Amenity does not exist`,
            };
          }
        }

        if (addOnServicesId) {
          let result = true;
          await Promise.all(
            addOnServicesId.map(async (each) => {
              const checkAddOnService = await client.addOnService.findUnique({
                where: { id: each },
              });
              if (checkAddOnService === null) {
                result = false;
              }
            })
          );

          if (!result) {
            return {
              ok: false,
              error: `Add On Service does not exist`,
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

          if (checkCategory.kind !== "room") {
            return {
              ok: false,
              error: "Please select room kind",
            };
          }
        }

        const existRoom = await client.room.findUnique({
          where: {
            id,
          },
        });
        if (!existRoom) {
          return {
            ok: false,
            error: "This room does not exist.",
          };
        }

        const updatedRoom = await client.room.update({
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
            }),

            ...(amenitiesId && {
              amenity: {
                set: amenitiesId.map((id) => {
                  return { id: id };
                }),
              },
            }),

            ...(addOnServicesId && {
              addOnService: {
                set: addOnServicesId.map((id) => {
                  return { id: id };
                }),
              },
            }),
            name,
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
        if (updatedRoom.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update room.",
          };
        }
      }
    ),
  },
};
