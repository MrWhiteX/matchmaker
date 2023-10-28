import { conversation } from "models";

interface IProps {
  userId: number | undefined;
  page?: number;
  perPage?: number;
  searchTerm?: string | string[] | undefined;
}

export const getAll = ({
  userId,
  page = 0,
  perPage = 7,
  searchTerm,
}: IProps) => {
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
  return conversation.findMany({
    where: {
      users: {
        some: {
          userId,
        },
      },
      ...filters,
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
    orderBy: {
      id: "desc",
    },
    skip: page * perPage,
    take: perPage,
  });
};
