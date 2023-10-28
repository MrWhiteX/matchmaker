import { NextApiRequest as NextApiRequestBase } from "next";
import { UserRole } from "@prisma/client";

export interface IRegister {
  fullName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export interface IResetPassword {
  email?: FormDataEntryValue | null;
  resetToken?: string | string[] | undefined;
  password?: FormDataEntryValue | null;
}

export interface IChangePassword {
  resetToken: string | string[] | undefined;
  password: FormDataEntryValue | null;
}

export interface IFilterPayload {
  content: any;
  skill?: string;
  timezone?: string;
  targetUserId?: number;
}

export interface NextApiRequestWithCurrentUser extends NextApiRequestBase {
  body: IFilterPayload;
  currentUser: {
    biogram: string | null;
    createdAt: Date | null;
    email: string | null;
    emailVerified: Date | null;
    id: number;
    role: UserRole;
    image: string | null | undefined;
    name: string | null;
    skill: string | null;
    timezone: string | null;
    updatedAt: Date | null;
  } | null;
}

export interface INextUser {
  biogram?: string | null;
  createdAt: Date;
  email: string | null;
  emailVerified: Date | null;
  id: number; /// Delete undefined
  banned: boolean;
  role: UserRole;
  image: string | null | undefined;
  name: string | null;
  skill: string | null;
  timezone: string | null;
  updatedAt: Date;
}

export interface ConversationUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  messages: {
    id: number;
    conversationId: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: INextUser;
  }[];
  users: {
    conversationId: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    role: UserRole;
    image: string;
    id: number;
    user: INextUser;
  }[];
}

interface MySessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null | undefined;
  role?: string;
}

export interface CustomSession {
  user?: MySessionUser;
}

export interface CreateUserSchema {
  biogram?: string;
  createdAt: string;
  email: string;
  emailVerified: string;
  id: number;
  role: UserRole;
  image: string;
  password: string;
  fullName: string;
  skill: string;
  timezone: string;
  updatedAt: string;
}

export type ExtendedUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null | undefined;
  role?: string;
};
