import { conversation as conversationModel, conversationMessage } from "models";

interface IProps {
  userId: number | undefined;
  conversationId: number;
  content: string;
}

export const create = async ({ userId, conversationId, content }: IProps) => {
  const conversation = await conversationModel.findFirst({
    where: {
      id: conversationId,
      users: {
        some: {
          userId,
        },
      },
    },
  });
  if (!conversation) {
    throw new Error("conversation_not_found");
  }
  const msg = await conversationMessage.create({
    data: {
      conversation: {
        connect: {
          id: conversation.id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
