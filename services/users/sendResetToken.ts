import { user } from "models";
import Joi from "joi";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import { IResetPassword } from "types/types";

export interface IResetSchema {
  email: string;
}

const schema = Joi.object<IResetSchema>({
  email: Joi.string().email().required(),
});

const sendResetToken = async (payload: IResetPassword) => {
  const { email }: IResetSchema = await schema.validateAsync(payload);
  if (typeof email !== "string" || !email) {
    throw new Error("Invalid email");
  }

  let userDB = await user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
  if (!userDB) {
    return null;
  }

  const resetToken = crypto.randomBytes(22).toString("hex");

  await user.update({
    where: {
      id: userDB.id,
    },
    data: {
      resetToken: resetToken,
    },
  });

  const apiKey = process.env.NODEMAILER_APIKEY;

  if (!apiKey) {
    throw new Error("NODEMAILER_APIKEY is not defined!");
  }
  sgMail.setApiKey(apiKey);

  const toEmail = process.env.CONTACT_FORM_EMAIL;
  const fromEmail = "matcher35323@gmail.com";

  if (!toEmail || !fromEmail) {
    return null;
  }

  const msg = {
    to: email,
    from: fromEmail,
    replyTo: email as string,
    subject: `Change your password`,
    html: `
    Hey! <br/>Please change your password here:
    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/update-password?token=${resetToken}">
      ${process.env.NEXT_PUBLIC_BASE_URL}/update-password?token=${resetToken}
    </a>
  `,
  };

  await sgMail.send(msg);

  return resetToken;
};

export default sendResetToken;
