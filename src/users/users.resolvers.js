import client from "../client";

export default {
  User: {
    // async (root, args, context, info) 인자 순서!!
    isMe: (
      // user
      { id }, //현재 안에있는 부모의 내용 -> User일것임!
      _, // 두번째는 파라미터.. 프론트에서 오는 내용!
      { loggedInUser }
    ) => {
      // 첫번째 인자 id는 User안의 field 내용중 하나여야 한다!
      // console.log("id", id);
      // console.log(loggedInUser, loggedInUser);
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
  },
};
