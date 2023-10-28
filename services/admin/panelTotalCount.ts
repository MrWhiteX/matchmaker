import { user } from "models";

interface IProps {
  searchTerm: string | string[] | undefined;
}

export const panelTotalCount = ({ searchTerm }: IProps) => {
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

  return user.count({
    where: {
      ...filters,
    },
  });
};
