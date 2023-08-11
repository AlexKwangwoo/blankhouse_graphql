import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteRoom: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const existingRoom = await client.room.findUnique({
        where: {
          id,
        },
      });
      if (!existingRoom) {
        return {
          ok: false,
          error: "This room does not exist.",
        };
      }
      await client.room.delete({
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
