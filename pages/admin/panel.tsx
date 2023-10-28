import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import BaseLayout from "components/BaseLayout";
import { getSession } from "next-auth/client";
import {
  CustomSession,
  INextUser,
  NextApiRequestWithCurrentUser,
} from "types/types";
import { panelGetAll } from "services/admin/panelGetAll";
import Pagination from "components/Pagination";

import Searchbar from "components/Searchbar/Searchbar";
import { panelTotalCount } from "services/admin/panelTotalCount";
import apiRoutes from "utils/apiRoutes";
import { useEffect, useState } from "react";

interface MyServerSidePropsContext extends GetServerSidePropsContext {
  query: {
    page?: string;
    [key: string]: string | string[] | undefined;
  };
}

interface IProps {
  req: NextApiRequestWithCurrentUser;
  query: MyServerSidePropsContext["query"];
}

interface IUsersProps {
  allUsers: INextUser[];
  pagesCount: number;
  page: number;
  filters: string[];
}

export const getServerSideProps = async ({ req, query }: IProps) => {
  const session = (await getSession({ req })) as CustomSession;

  if (!session || session?.user?.role != "ADMIN") {
    return {
      redirect: {
        destination: "/",
        permament: false,
      },
    };
  }

  const searchTerm = query.searchTerm;
  const perPage = 10;
  const count = await panelTotalCount({ searchTerm });

  const pagesCount = Math.ceil(count / perPage);

  const page = Number(query.page || 1);
  const allUsers = await panelGetAll({
    searchTerm,
    perPage,
    page: page - 1,
  });
  const filters = [];
  if (searchTerm) {
    filters.push(`searchTerm=${searchTerm}`);
  }

  return {
    props: { allUsers, pagesCount, page, filters },
  };
};

const Panel = ({ allUsers, pagesCount, page, filters }: IUsersProps) => {
  const [checkedUsers, setCheckedUsers] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const initialCheckedUsers: Record<number, boolean> = {};
    allUsers.forEach((user) => {
      initialCheckedUsers[user.id] = user.banned || false;
    });
    setCheckedUsers(initialCheckedUsers);
  }, [allUsers]);

  const changeUserStatusHandler = async (
    userId: number,
    isChecked: boolean
  ) => {
    setCheckedUsers((prevCheckedUsers) => ({
      ...prevCheckedUsers,
      [userId]: isChecked,
    }));
    const payload = {
      userId: userId,
      status: isChecked,
    };
    await apiRoutes.admin.banUser.create(payload);
  };

  return (
    <BaseLayout>
      <Head>
        <title>Admin Panel Users</title>
      </Head>
      <Searchbar url="/admin/panel" />
      <div className="border-t-2">
        {allUsers.map((user) => {
          return (
            <div key={`conversation-${user.id}`}>
              <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src={
                      user.image ||
                      "https://randomuser.me/api/portraits/lego/6.jpg"
                    }
                    className="inline-block m-0.5 object-cover h-12 w-12 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">{user.name}</div>
                  <span className="text-gray-500">{user.email}</span>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    checked={checkedUsers[user.id] || false}
                    onChange={(e) =>
                      changeUserStatusHandler(user.id, e.target.checked)
                    }
                  ></input>
                  <input type="date"></input>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={page.toString()}
        href="/admin/panel"
        pagesCount={pagesCount}
        filters={filters}
      />
    </BaseLayout>
  );
};

export default Panel;
