import client from "../../client";

export default {
  Query: {
    seeAllRooms: async (_, {}) => {
      var result = client.room.findMany();
      return result;
    },
  },
};
