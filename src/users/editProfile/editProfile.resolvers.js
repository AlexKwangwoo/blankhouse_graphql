import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { createWriteStream } from "fs";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          email,
          username,
          bio,
          avatar,
          password: newPassword,
          balance,
          address,
          emergency_contact,
          phone_number,
          is_host,
          born_year,
          school,
          work,
          hobby,
          gender,
          language,
          currency,
        },
        { loggedInUser, protectResolver }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
          // const { filename, createReadStream } = await avatar;
          // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          // const readStream = createReadStream();
          // const writeStream = createWriteStream(
          //   process.cwd() + "/uploads/" + newFilename
          // );
          // readStream.pipe(writeStream);
          // avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }

        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            email,
            username,
            bio,
            balance,
            address,
            emergency_contact,
            phone_number,
            is_host,
            born_year,
            school,
            work,
            hobby,
            gender,
            language,
            currency,
            ...(uglyPassword && { password: uglyPassword }), //uglyPassword 있다면! password uglyPassword를 넣겠다!
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile.",
          };
        }
      }
    ),
  },

  // explanation 하나는 나두자
  Upload: GraphQLUpload,
};
