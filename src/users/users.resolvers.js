import client from "../client";

export default {
  User: {
    isMe: (
      // user
      { id },
      _,
      { loggedInUser }
    ) => {
      // 첫번째 인자 id는 User안의 field 내용중 하나여야 한다!
      // console.log("user", user);
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
  },
};
