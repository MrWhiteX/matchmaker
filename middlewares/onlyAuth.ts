import { getSession } from "next-auth/client";
import { user } from "models";
import { NextApiResponse } from "next";
import { NextApiRequestWithCurrentUser } from "types/types";
import { UserRole } from "types/enums";

type ApiHandler = (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => Promise<void>;

const onlyAuth = (handler: ApiHandler, requiredRole: UserRole) => {
  return async (req: NextApiRequestWithCurrentUser, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Please log in to get access.",
      });
    }

    const userEmail = session?.user?.email ?? undefined;
    const currentUser = await user.findUnique({
      where: {
        email: userEmail,
      },
    });

    req.currentUser =
      currentUser as NextApiRequestWithCurrentUser["currentUser"];

    if (requiredRole) {
      switch (requiredRole) {
        case UserRole.ADMIN:
          if (currentUser?.role !== UserRole.ADMIN) {
            return res.status(403).json({
              success: false,
              message: "Access denied. Admin role required.",
            });
          }
          break;
        case UserRole.MODERATOR:
          if (
            ![UserRole.ADMIN, UserRole.MODERATOR].includes(
              currentUser?.role as UserRole
            )
          ) {
            return res.status(403).json({
              success: false,
              message: "Access denied. Admin or Moderator role required.",
            });
          }
          break;
        case UserRole.USER:
          if (
            !Object.values(UserRole).includes(currentUser?.role as UserRole)
          ) {
            return res.status(403).json({
              success: false,
              message: "Access denied.",
            });
          }
          break;
      }
    }

    return handler(req, res);
  };
};

export default onlyAuth;
