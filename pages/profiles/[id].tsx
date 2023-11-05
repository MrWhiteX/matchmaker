import BaseLayout from "components/BaseLayout";
import UserFilters from "components/UserFilters";
import Head from "next/head";
import { useRouter } from "next/router";
import { user } from "models";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import apiRoutes from "utils/apiRoutes";
import getAllSkills from "services/skills/getAll";
import getAllTimezones from "services/timezones/getAll";
import { INextUser } from "types/types";
import MatchModal from "components/MatchModal";

interface IBrowseProps {
  skills: {
    id: number;
    name: string;
  }[];
  profile: {
    id: number;
    biogram?: string;
    image: string;
    name: string;
    skill: string;
    timezone: string;
  };
  timezones: {
    id: number;
    name: string;
  }[];
}

interface IParams {
  params: {
    id: string;
  };
}

export const getStaticPaths = async () => {
  const profiles = await user.findMany();

  return {
    paths: profiles.map((user) => ({ params: { id: String(user.id) } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: IParams) => {
  const profile = await user.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      id: true,
      name: true,
      biogram: true,
      skill: true,
      timezone: true,
      image: true,
    },
  });

  const skills = await getAllSkills();
  const timezones = await getAllTimezones();

  return {
    props: {
      profile,
      skills,
      timezones,
    },
  };
};

export default function ProfilePage({
  profile,
  skills,
  timezones,
}: IBrowseProps) {
  const [session, loading] = useSession();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [nextId, setNextId] = useState<number | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await apiRoutes.user.profile.get();
      setCurrentUser(user);
    };

    if (session && !loading) {
      fetchUser();
    }
  }, [session, loading]);
  const handleSkip = async () => {
    const {
      data: { nextProfile },
    } = await apiRoutes.profiles.skip({ targetUserId: profile.id });

    if (nextProfile?.id != session?.user.id) {
      redirectNextStep(nextProfile);
    } else {
      window.location.replace("/profiles/browse");
    }
  };

  const handleLike = async () => {
    const {
      data: { hasMatch, nextProfile },
    } = await apiRoutes.profiles.like({
      targetUserId: profile.id,
      content: undefined,
    });

    if (nextProfile?.id === session?.user?.id) {
      window.location.replace("/profiles/browse");
    }

    if (hasMatch) {
      setNextId(nextProfile?.id);
      setIsOpen(true);
    } else {
      redirectNextStep(nextProfile);
    }
  };

  const redirectNextStep = (nextProfile: Partial<INextUser>) => {
    if (nextProfile && nextProfile.id) {
      router.push(`/profiles/${nextProfile.id}`);
    } else {
      window.location.replace("/profiles/browse");
    }
  };

  if (!profile) {
    return (
      <BaseLayout>
        <p>Loading...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Head>
        <title>
          {profile.name} ({profile.skill})
        </title>
      </Head>
      <MatchModal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
          redirectNextStep({ id: nextId });
        }}
      />
      <UserFilters
        skills={skills}
        timezones={timezones}
        currentUser={currentUser}
      />
      <section>
        <div className="py-10 bg-gray-50 ">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 p-6 flex flex-wrap items-center bg-white rounded-lg shadow">
                <div className="w-full lg:w-1/3">
                  <img
                    className="mb-5 lg:mb-0 w-full rounded-lg object-cover"
                    style={{ maxHeight: "350px" }}
                    src={profile.image}
                    alt=""
                  />
                </div>
                <div className="w-full lg:w-2/3">
                  <div className="max-w-lg mx-auto">
                    <p className="mb-8 text-2xl text-gray-500">
                      What i created?
                      <br />
                      🧑🏼‍💻 Daily To-do App
                      <br />
                      🔗 RemoteAwesome.com
                      <br />
                      📺 Design&Code channel
                      <br />
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold font-heading">
                          {profile.name}
                        </h4>
                        <p className="text-blueGrey-500">{profile.skill}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 flex-auto flex space-x-3">
            <button
              className="w-1/2 h-16 flex items-center justify-center rounded-md border-gray-300 border"
              onClick={handleSkip}
            >
              <span
                className="text-2xl mr-4"
                aria-label="thumb down emoji"
                role="img"
              >
                ❌
              </span>
              Skip
            </button>
            <button
              className="w-1/2 h-16 flex items-center justify-center rounded-md border bg-green-500 text-white border-gray-300"
              type="button"
              onClick={handleLike}
            >
              Connect
              <span
                className="text-2xl ml-4"
                aria-label="excited emoji"
                role="img"
              >
                🤩
              </span>
            </button>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
