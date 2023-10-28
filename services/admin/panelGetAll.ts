import { user } from "models";

interface IProps {
  page: number;
  perPage: number;
  searchTerm: string | string[] | undefined;
}

export const panelGetAll = ({ page = 0, perPage = 10, searchTerm }: IProps) => {
  let filters = {};
  if (searchTerm) {
    filters = {
      ...filters,
      OR: [
        {
          email: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    };
  }
  return user.findMany({
    where: {
      ...filters,
    },

    orderBy: {
      id: "desc",
    },
    skip: page * perPage,
    take: perPage,
  });
};
