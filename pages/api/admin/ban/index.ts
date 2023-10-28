import onlyAuth from "middlewares/onlyAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { banUser } from "services/admin/banUser";
import { UserRole } from "types/enums";

const userToBlock = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      try {
        const payload = req.body;
        const ban = await banUser(payload);
        res.status(200).json({ status: "created", ban });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";

        res.status(422).json({ status: "not_created", error: errorMessage });
      }
      break;
    }
    default:
      res.status(400);
  }
};

export default onlyAuth(userToBlock, UserRole.ADMIN);
