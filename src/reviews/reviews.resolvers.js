import client from "../client";

export default {
  Review: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    room: async ({ roomId }) => {
      if (roomId) {
        return await client.room.findUnique({
          where: { id: roomId },
        });
      }
    },
    experience: async ({ experienceId }) => {
      if (experienceId) {
        return await client.experience.findUnique({
          where: { id: experienceId },
        });
      }
    },
  },
};
