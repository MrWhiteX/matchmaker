import { filter } from "models";
import { IFilterPayload } from "types/types";

interface IProps {
  userId: number | undefined;
  payload: IFilterPayload;
}

export const upsertFilter = ({ userId, payload }: IProps) =>
  filter.upsert({
    where: {
      userId,
    },
    update: {
      skill: payload.skill,
      timezone: payload.timezone,
      updatedAt: new Date(),
    },
    create: {
      skill: payload.skill,
      timezone: payload.timezone,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
