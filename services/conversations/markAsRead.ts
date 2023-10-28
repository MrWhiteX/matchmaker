import { conversationUser } from "models";

interface IProps {
  userId: number | undefined;
  conversationId: number;
}

export const markAsRead = ({ userId, conversationId }: IProps) =>
  conversationUser.updateMany({
    where: {
      conversationId,
      userId,
    },
    data: {
      read: true,
    },
  });
