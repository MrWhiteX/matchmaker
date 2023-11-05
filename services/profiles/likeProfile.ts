import { conversation, profileCheck, user } from "models";

interface UserPair {
  userId: number | undefined;
  targetUserId: number;
}

const checkIfMatchExists = async ({ userId, targetUserId }: UserPair) => {
  const count = await profileCheck.count({
    where: {
      liked: true,
      targetId: userId,
      userId: targetUserId,
    },
  });
  return count > 0;
};

const alreadyLiked = async ({ userId, targetUserId }: UserPair) => {
  const count = await profileCheck.count({
    where: {
      liked: true,
      userId: userId,
      targetId: targetUserId,
    },
  });
  return count > 0;
};

const likeProfile = async ({ userId, targetUserId }: UserPair) => {
  if (await alreadyLiked({ userId, targetUserId })) {
    throw new Error("profile_already_liked");
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
      liked: true,
    },
  });

  const hasMatch = await checkIfMatchExists({ userId, targetUserId });

  if (hasMatch) {
    await conversation.create({
      data: {
        users: {
          create: [
            {
              user: {
                connect: {
                  id: targetUserId,
                },
              },
            },
            {
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          ],
        },
      },
    });
  }
  const targetUser = await user.findUnique({
    where: {
      id: targetUserId,
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
  return { hasMatch, targetUser };
};

export default likeProfile;
