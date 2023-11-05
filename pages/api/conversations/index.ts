import onlyAuth from "middlewares/onlyAuth";
import { NextApiResponse } from "next";
import { getAll } from "services/conversations/getAll";
import { unreadCount } from "services/conversations/unreadCount";
import { UserRole } from "types/enums";
import { NextApiRequestWithCurrentUser } from "types/types";

const conversationApi = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET": {
      try {
        const conversations = await getAll({ userId: req.currentUser?.id });
        const unread = await unreadCount({ userId: req.currentUser?.id });

        res.status(200).json({ conversations, unread });
      } catch (error) {
        res.status(422).json({ conversations: [], unread: 0, error });
      }
      break;
    }
    default:
      res.status(400);
  }
};

export default onlyAuth(conversationApi, UserRole.USER);
