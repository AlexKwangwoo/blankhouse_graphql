import client from "../../client";

export default {
  Query: {
    seeAllExperiences: async (_, {}) => {
      var result = client.experience.findMany();
      return result;
    },
  },
};
