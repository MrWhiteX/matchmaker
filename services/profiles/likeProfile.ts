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
    console.log(hasMatch);
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
        // messages: {
        //   create: [
        //     {
        //       content: "Hi how are you?",
        //       user: {
        //         connect: {
        //           id: 23,
        //         },
        //       },
        //     },
        //     {
        //       content: "Im fine thanks!",
        //       user: {
        //         connect: {
        //           id: 53,
        //         },
        //       },
        //     },
        //   ],
        // },
      },
    });
  }
  const targetUser = await user.findUnique({
    where: {
      id: targetUserId,
    },
  });
  return { hasMatch, targetUser };
};

export default likeProfile;
