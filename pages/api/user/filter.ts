import onlyAuth from "middlewares/onlyAuth";
import { NextApiResponse } from "next";
import { NextApiRequestWithCurrentUser } from "types/types";
import { IFilterPayload } from "types/types";
import { upsertFilter } from "services/filters/upsert";
import { UserRole } from "types/enums";

const userFilterApi = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "PUT": {
      try {
        const payload: IFilterPayload = req.body;

        const filter = await upsertFilter({
          userId: req.currentUser?.id,
          payload,
        });

        res.status(200).json({ filter });
      } catch (error) {
        res.status(422).json({ filter: null, error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(userFilterApi, UserRole.USER);
