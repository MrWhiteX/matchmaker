import { user } from "models";
import Joi from "joi";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { IResetPassword } from "types/types";

export interface IChangePasswordSchema {
  resetToken: string;
  password: string;
}

const schema = Joi.object<IChangePasswordSchema>({
  resetToken: Joi.string().required(),
  password: Joi.string().min(5).required().messages({
    "string.min":
      "Password should have a minimum length of {#limit} characters",
  }),
});

const changePassword = async (payload: IResetPassword) => {
  const { password, resetToken }: IChangePasswordSchema =
    await schema.validateAsync(payload);
  let userDB = await user.findFirst({
    where: {
      resetToken,
    },
  });
  if (!userDB) {
    throw new Error("wrong_token");
  }

  const passwordSalt = crypto.randomBytes(22).toString("hex");
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, `sha512`)
    .toString("hex");

  await user.update({
    where: {
      id: userDB.id,
    },
    data: {
      passwordHash,
      passwordSalt,
      resetToken: null,
    },
  });

  return {
    id: userDB.id,
    email: userDB.email,
    emailVerified: userDB.emailVerified,
    name: userDB.name,
    role: userDB.role,
    image: userDB.image,
    skill: userDB.skill,
    timezone: userDB.timezone,
    biogram: userDB.biogram,
    createdAt: userDB.createdAt,
    updatedAt: userDB.updatedAt,
  };
};

export default changePassword;
