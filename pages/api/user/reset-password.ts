import { NextApiRequest, NextApiResponse } from "next";
import sendResetToken from "services/users/sendResetToken";
import { IResetPassword } from "types/types";
import changePassword from "services/users/changePassword";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const payload: IResetPassword = req.body;

  switch (req.method) {
    case "POST": {
      try {
        await sendResetToken(payload);
        res.status(200).json({ status: "ok" });
      } catch (error: unknown) {
        res.status(422).json({ status: "error", error: error });
      }

      break;
    }
    case "PUT": {
      try {
        const user = await changePassword(payload);

        res.status(200).json({ status: "ok", user });
      } catch (error: unknown) {
        res.status(422).json({ status: "error", error: error });
      }
      break;
    }
    default:
      res.status(400);
  }
};
