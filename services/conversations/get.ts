import { conversation } from "models";
import { markAsRead } from "./markAsRead";

interface IProps {
  userId: number | undefined;
  id: number;
}

export const get = async ({ id, userId }: IProps) => {
  await markAsRead({ conversationId: id, userId });

  return conversation.findFirst({
    where: {
      id,
      users: {
        some: {
          userId,
        },
      },
    },
    include: {
      users: {
        include: {
          user: true,
        },
      },
      messages: {
        include: {
          user: true,
        },
      },
    },
  });
};
