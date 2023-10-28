import onlyAuth from "middlewares/onlyAuth";
import { NextApiResponse } from "next";
import { NextApiRequestWithCurrentUser } from "types/types";
import { IFilterPayload } from "types/types";
import { user as userModel } from "models";
import updateProfile from "services/profiles/update";
import { UserRole } from "types/enums";

const userProfileApi = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET": {
      const user = await userModel.findUnique({
        where: {
          id: req?.currentUser?.id,
        },
        include: {
          filter: true,
        },
      });

      res.status(200).json({ user });
      break;
    }
    case "PUT": {
      try {
        const payload: IFilterPayload = req.body;
        const userId = req.currentUser?.id;
        const user = await updateProfile({ userId, payload });

        res.status(200).json({ user });
      } catch (error) {
        res.status(422).json({ user: null, error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(userProfileApi, UserRole.USER);
