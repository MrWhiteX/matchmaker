import { user } from "models";
import Joi from "joi";
import crypto from "crypto";

import { CreateUserSchema } from "types/types";

const schema = Joi.object<CreateUserSchema>({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  password: Joi.string().min(5).required().messages({
    "string.min":
      "Password should have a minimum length of {#limit} characters",
  }),
});

const checkEmail = async (email: string) => {
  const existingUser = await user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email address already in use.");
  }
};

const createUser = async (payload: CreateUserSchema) => {
  const { email, password, fullName }: CreateUserSchema =
    await schema.validateAsync(payload);
  await checkEmail(email);
  const passwordSalt = crypto.randomBytes(16).toString("hex");
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, `sha512`)
    .toString("hex");
  if (typeof email !== "string" || !email) {
    throw new Error("Invalid email");
  }
  await user.create({
    data: {
      email: email.toLowerCase(),
      name: fullName,
      passwordSalt: passwordSalt,
      passwordHash: passwordHash,
      role: "USER",
    },
  });
};

export default createUser;
