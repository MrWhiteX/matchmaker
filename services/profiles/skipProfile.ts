import { profileCheck, user } from "models";

interface UserPair {
  userId: number | undefined;
  targetUserId: number;
}

const alreadySkipped = async ({ userId, targetUserId }: UserPair) => {
  const count = await profileCheck.count({
    where: {
      liked: false,
      userId: userId,
      targetId: targetUserId,
    },
  });
  return count > 0;
};

const skipProfile = async ({ userId, targetUserId }: UserPair) => {
  if (await alreadySkipped({ userId, targetUserId })) {
    throw new Error("profile_already_skipped");
  }

  await profileCheck.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      targetUser: {
        connect: {
          id: targetUserId,
        },
      },
      liked: false,
    },
  });

  const targetUser = await user.findUnique({
    where: {
      id: targetUserId,
    },
  });
  return { targetUser };
};

export default skipProfile;
