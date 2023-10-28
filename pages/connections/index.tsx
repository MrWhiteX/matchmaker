import BaseLayout from "components/BaseLayout";
import { getAll } from "services/conversations/getAll";
import { user } from "models";
import { getSession } from "next-auth/client";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { NextApiRequestWithCurrentUser, ConversationUser } from "types/types";
import { totalCount } from "services/conversations/totalCount";
import Pagination from "components/Pagination";
import Head from "next/head";
import Searchbar from "components/Searchbar/Searchbar";
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

export const getServerSideProps = async ({ req, query }: IProps) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permament: false,
      },
    };
  }

  const currentUser = await user.findUnique({
    where: {
      email: session.user?.email ?? undefined,
    },
  });

  const searchTerm = query.searchTerm;
  const perPage = 7;
  const count = await totalCount({ userId: currentUser?.id, searchTerm });
  const pagesCount = Math.ceil(count / perPage);
  const page = Number(query.page || 1);
  const conversations = await getAll({
    searchTerm,
    userId: currentUser?.id,
    perPage,
    page: page - 1,
  });
  const filters = [];
  if (searchTerm) {
    filters.push(`searchTerm=${searchTerm}`);
  }

  return {
    props: { conversations, pagesCount, page, filters },
  };
};

interface IConversation {
  conversations: ConversationUser[];
  pagesCount: number;
  page: number;
  filters: string[];
}

export default function Connections({
  conversations,
  pagesCount,
  page,
  filters,
}: IConversation) {
  const showConversations = conversations.map((item) => {
    return (
      <Link key={`conversation-${item.id}`} href={`/connections/${item.id}`}>
        <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
          <div className="w-1/4">
            {item.users.map(({ user }) => {
              return (
                <img
                  key={user.id}
                  src={
                    user.image ||
                    "https://randomuser.me/api/portraits/lego/6.jpg"
                  }
                  className="inline-block m-0.5 object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              );
            })}
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">
              {item.messages[item.messages.length - 1]?.user.name}
            </div>
            <span className="text-gray-500">
              {item.messages[item.messages.length - 1]?.content}
            </span>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <BaseLayout>
      <Head>
        <title>Your connections</title>
      </Head>
      <Searchbar url="/connections" />
      <div className="border-t-2">
        {conversations.length != 0 ? (
          showConversations
        ) : (
          <div className="mt-24 text-center">No conversations</div>
        )}
      </div>
      <Pagination
        currentPage={page.toString()}
        href="/connections"
        pagesCount={pagesCount}
        filters={filters}
      />
    </BaseLayout>
  );
}
