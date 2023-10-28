import onlyAuth from "middlewares/onlyAuth";
import { NextApiResponse } from "next";
import { create } from "services/conversations/create";
import { get } from "services/conversations/get";
import { UserRole } from "types/enums";
import { NextApiRequestWithCurrentUser } from "types/types";

const conversationApi = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  const conversationId = Number(req.query.id);
  switch (req.method) {
    case "POST": {
      try {
        const conversation = await create({
          ...req.body,
          userId: req.currentUser?.id,
          conversationId: Number(req.query.id),
        });
        res.status(200).json({ conversation });
      } catch (error) {
        res.status(422).json({ conversation: null, error });
      }
      break;
    }
    case "GET": {
      try {
        const conversation = await get({
          id: conversationId,
          userId: req.currentUser?.id,
        });
        if (!conversation) {
          throw Error("conversation_not_found");
        }
        res.status(200).json({ conversation });
      } catch (error) {
        res.status(422).json({ conversation: null, error });
      }
      break;
    }
  }
};

export default onlyAuth(conversationApi, UserRole.USER);
