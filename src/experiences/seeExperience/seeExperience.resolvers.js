import client from "../../client";

export default {
  Query: {
    seeExperience: (_, { id }) =>
      client.experience.findUnique({
        where: {
          id,
        },
        // 여기서 찾아진 유저내용이 isMe 의 첫번쨰인자 부모가 될것임
        // isMe와
        // include: {
        //   following: true,
        //   followers: true,
        // },
      }),
  },
};
