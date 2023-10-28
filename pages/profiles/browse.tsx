import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import BaseLayout from "components/BaseLayout";
import { getSession } from "next-auth/client";
import { user } from "models";
import { findMatch } from "services/profiles/findMatch";
import UserFilters from "components/UserFilters";
import getAllSkills from "services/skills/getAll";
import getAllTimezones from "services/timezones/getAll";

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
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
    select: {
      id: true,
      email: true,
      filter: {
        select: {
          skill: true,
          timezone: true,
        },
      },
    },
  });

  const profile = await findMatch({ userId: currentUser?.id });

  if (profile) {
    return {
      redirect: {
        destination: `/profiles/${profile.id}`,
        permanent: false,
      },
    };
  }
  const skills = await getAllSkills();
  const timezones = await getAllTimezones();

  return {
    props: { skills, timezones, currentUser },
  };
};

export interface IBrowseProps {
  skills: {
    id: number;
    name: string;
  }[];
  currentUser?: {
    id: number;
    email: string;
    filter: {
      timezone: string;
      skill: string;
      filter: string;
    };
  };
  timezones: {
    id: number;
    name: string;
  }[];
}

const BrowseProfiles = ({ skills, currentUser, timezones }: IBrowseProps) => {
  return (
    <BaseLayout>
      <Head>
        <title>Browse profiles</title>
      </Head>
      <UserFilters
        skills={skills}
        timezones={timezones}
        currentUser={currentUser}
      />
      <p className="text-center mt-10 text-2xl">
        Unfortunately we do not have more profiles at the moment. <br />
        Please change your filter and try again...
      </p>
    </BaseLayout>
  );
};

export default BrowseProfiles;
