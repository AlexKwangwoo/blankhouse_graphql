import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    deleteAccount: protectedResolver(async (_, __, { loggedInUser }) => {
      if (!loggedInUser.id) {
        return {
          ok: false,
          error: "User does not exist",
        };
      }
      await client.user.delete({
        where: {
          id: loggedInUser.id,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
