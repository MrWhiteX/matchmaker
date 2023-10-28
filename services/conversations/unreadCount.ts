import { conversationUser } from "models";

interface IProps {
  userId: number | undefined;
}

export const unreadCount = ({ userId }: IProps) =>
  conversationUser.count({
    where: {
      userId,
      read: false,
    },
  });
