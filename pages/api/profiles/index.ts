import onlyAuth from "middlewares/onlyAuth";
import { NextApiResponse } from "next";
import { findMatch } from "services/profiles/findMatch";
import likeProfile from "services/profiles/likeProfile";
import skipProfile from "services/profiles/skipProfile";
import { UserRole } from "types/enums";
import { NextApiRequestWithCurrentUser } from "types/types";

const userFilterApi = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  const userId = req.currentUser?.id;
  switch (req.method) {
    case "GET": {
      try {
        const profile = await findMatch({ userId });

        res.status(200).json({ profile });
      } catch (error) {
        res.status(422).json({ profile: null, error });
      }
      break;
    }
    case "POST": {
      try {
        const { targetUserId } = req.body;
        const { hasMatch, targetUser } = await likeProfile({
          userId,
          targetUserId: Number(targetUserId),
        });
        const nextProfile = await findMatch({ userId });

        res.status(200).json({ hasMatch, targetUser, nextProfile });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        res
          .status(422)
          .json({ hasMatch: false, targetUser: false, error: errorMessage });
      }
      break;
    }
    case "DELETE":
      {
        try {
          const { targetUserId } = req.body;
          const { targetUser } = await skipProfile({
            userId,
            targetUserId: Number(targetUserId),
          });
          const nextProfile = await findMatch({ userId });
          res.status(200).json({ targetUser, nextProfile });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred";
          res.status(422).json({ targetUser: null, error: errorMessage });
        }
      }
      break;

    default:
      res.status(400);
  }
};

export default onlyAuth(userFilterApi, UserRole.USER);
