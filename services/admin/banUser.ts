import { user } from "models";

interface IProps {
  userId: number | undefined;
  status: boolean;
}

export const banUser = async ({ userId, status }: IProps) => {
  const updatedUser = await user.update({
    where: {
      id: userId,
    },
    data: {
      banned: status,
    },
  });
  return updatedUser;
};
