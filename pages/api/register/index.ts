import { NextApiResponse, NextApiRequest } from "next";
import createUser from "services/users/create";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      try {
        const payload = req.body;

        const user = await createUser(payload);
        res.status(200).json({ status: "created", user });
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
