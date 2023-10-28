import onlyAuth from "middlewares/onlyAuth";
import { UserRole } from "types/enums";

const helloApi = async (
  req: { currentUser: any },
  res: { statusCode: number; json: (arg0: { user: any }) => void }
) => {
  res.statusCode = 200;
  res.json({ user: req.currentUser });
};

export default onlyAuth(helloApi, UserRole.MODERATOR);
