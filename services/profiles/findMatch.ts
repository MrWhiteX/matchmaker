import { user, filter as filterModel, profileCheck } from "models";

interface IProps {
  userId: number | undefined;
}

const checkedIds = async ({ userId }: IProps) => {
  const profiles = await profileCheck.findMany({
    where: {
      userId,
    },
    select: {
      targetId: true,
    },
  });

  return profiles.map((p) => p.targetId);
};

export const findMatch = async ({ userId }: IProps) => {
  const filter = await filterModel.findUnique({
    where: {
      userId,
    },
  });

  if (!filter) {
    return null;
  }

  const ids = await checkedIds({ userId });

  const profile = await user.findFirst({
    where: {
      skill: filter.skill,
      timezone: filter.timezone,
      NOT: {
        id: { in: ids },
      },
    },
    select: {
      id: true,
      email: true,
      emailVerified: true,
      name: true,
      role: true,
      skill: true,
      timezone: true,
      createdAt: true,
      updatedAt: true,
      image: true,
      biogram: true,
      banned: true,
    },
  });

  return profile;
};
