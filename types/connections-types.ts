import { NextApiRequestWithCurrentUser, INextUser } from "types/types";

export interface IGSSP {
  req: NextApiRequestWithCurrentUser;
  params: {
    id: string;
  };
}

export interface SingleMessage {
  id: number;
  content: string;
  conversationId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: INextUser;
}
export interface IMessage {
  message: SingleMessage;
}

export interface IConversation {
  conversationId: number;
}

export interface IInitConversation {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  users: {
    id: number;
    conversationId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  messages: SingleMessage[];
}

export interface IConnections {
  initConversation: IInitConversation;
  currentUser: INextUser;
}
