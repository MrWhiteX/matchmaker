import { user } from "models";
import { IFilterPayload } from "types/types";

interface IUserUpdate {
  userId: number | undefined;
  payload: IFilterPayload;
}

const updateProfile = async ({ userId, payload }: IUserUpdate) => {
  const updateUser = await user.update({
    where: {
      id: userId,
    },
    data: {
      skill: payload.skill,
      timezone: payload.timezone,
      updatedAt: new Date(),
    },
  });

  if (updateUser) {
    const { resetToken, passwordSalt, passwordHash, ...user } = updateUser;
    return user;
  } else {
    return null;
  }
};

export default updateProfile;
