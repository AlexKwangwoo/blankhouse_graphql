import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

// 모든함수의 (a,b,c,d)=>를 인터셉트 해서 검사후 다시 (a,b,c,d)를 돌려줄것임
// 즉 protectedResolver(fn(root, args, context, info)) 라고 생각하면됨!
export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      // operation 는 query / mutation 으로 나올수있음
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action.",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };

// 쉽게 설명하면
// const protectResolver = {

// }
// 구조인데 미리 함수를 가져와서 intercept한뒤 다시 돌려보내는것임

// ourResolver가 editProfile예를들면 밑에라고 생각하면됨
// async (
//   _,
//   { firstName, lastName, username, email, password: newPassword },
//   { loggedInUser, protectResolver }
// ) => {
//   // const { id } = await jwt.verify(token, process.env.SECRET_KEY);

//   let uglyPassword = null;
//   if (newPassword) {
//     uglyPassword = await bcrypt.hash(newPassword, 10);
//   }
//   const updatedUser = await client.user.update({
//     where: {
//       id: loggedInUser.id,
//     },
//     data: {
//       firstName,
//       lastName,
//       username,
//       email,
//       ...(uglyPassword && { password: uglyPassword }), //uglyPassword 있다면! password uglyPassword를 넣겠다!
//     },
//   });
//   if (updatedUser.id) {
//     return {
//       ok: true,
//     };
//   } else {
//     return {
//       ok: false,
//       error: "Could not update profile.",
//     };
//   }
// }
