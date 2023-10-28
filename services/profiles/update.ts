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

  return updateUser;
};

export default updateProfile;
