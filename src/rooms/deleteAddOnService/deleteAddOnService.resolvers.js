import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteAddOnService: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const existingAddOnService = await client.addOnService.findUnique({
          where: {
            id,
          },
        });
        console.log("existingAddOnService", existingAddOnService);
        if (!existingAddOnService) {
          return {
            ok: false,
            error: "This addOnService does not exist.",
          };
        }
        await client.addOnService.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
