import { conversation } from "models";

interface IProps {
  userId: number | undefined;
  searchTerm: string | string[] | undefined;
}

export const totalCount = ({ userId, searchTerm }: IProps) => {
  let filters = {};
  if (searchTerm) {
    filters = {
      ...filters,
      messages: {
        some: {
          content: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      },
    };
  }

  return conversation.count({
    where: {
      users: {
        some: {
          userId,
        },
      },
      ...filters,
    },
  });
};
