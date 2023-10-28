import { user as userModel } from "models";
import Joi from "joi";
import crypto from "crypto";
import { INextUser } from "types/types";

interface AuthorizeSchema {
  email: string;
  password: string;
}

const schema = Joi.object<AuthorizeSchema>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const authorizeUser = async (
  payload: AuthorizeSchema
): Promise<INextUser | null> => {
  const { email, password } = await schema.validateAsync(payload);

  if (typeof email !== "string" || !email) {
    throw new Error("Invalid email");
  }

  const existingUser = await userModel.findUnique({
    where: {
      email: email.toLocaleLowerCase(),
    },
  });

  if (!existingUser) {
    return null;
  }

  if (!existingUser.passwordSalt) {
    return null;
  }

  const passwordHash = crypto
    .pbkdf2Sync(password, existingUser.passwordSalt, 1000, 64, `sha512`)
    .toString("hex");

  if (passwordHash !== existingUser.passwordHash) {
    return null;
  }

  return {
    id: existingUser.id,
    email: existingUser.email,
    emailVerified: existingUser.emailVerified,
    name: existingUser.name,
    role: existingUser.role,
    banned: existingUser.banned,
    image: existingUser.image,
    skill: existingUser.skill,
    timezone: existingUser.timezone,
    biogram: existingUser.biogram,
    createdAt: existingUser.createdAt,
    updatedAt: existingUser.updatedAt,
  };
};

export default authorizeUser;
