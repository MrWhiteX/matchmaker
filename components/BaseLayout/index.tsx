import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import { ReactNode, useState } from "react";
import classNames from "classnames";
import useSWR from "swr";
import apiRoutes from "utils/apiRoutes";
import { ExtendedUser } from "types/types";

interface HomeProps {
  children: ReactNode;
}

interface IConnectionsLinkProps {
  isLoggedIn: boolean | null;
  className: string;
}

const ConnectionsLink = ({
  isLoggedIn = false,
  className,
}: IConnectionsLinkProps) => {
  const { data, error } = useSWR(
    isLoggedIn ? `/api/conversations/` : null,
    apiRoutes.fetcher
  );

  const isLoading = !data && !error;

  return (
    <Link href="/connections">
      <a className={className}>
        Connections
        {!isLoading && data?.unread > 0 && ` (${data.unread})`}
      </a>
    </Link>
  );
};

const Navigation = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [session, loading] = useSession();
  const user = session?.user as ExtendedUser;

  return (
    <section className="container mx-auto">
      <nav className="relative px-6 py-6 flex justify-between items-center bg-white">
        <Link href="/">
          <a className="text-3xl font-bold leading-none">MakersMatch</a>
        </Link>

        <div className="lg:hidden">
          <button
            onClick={() => setNavOpen(true)}
            className="navbar-burger flex items-center text-green-600 p-3"
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link href="/">
              <a className="text-sm text-gray-400 hover:text-gray-500">Start</a>
            </Link>
          </li>
          <li>
            <Link href="/profiles/browse">
              <a className="text-sm text-gray-400 hover:text-gray-500">
                Browse
              </a>
            </Link>
          </li>
          <li>
            <ConnectionsLink
              isLoggedIn={session && !loading && true}
              className="text-sm text-gray-400 hover:text-gray-500"
            />
          </li>
          {session && !loading && (
            <>
              <li>
                <Link href="/my-profile">
                  <a className="text-sm text-gray-400 hover:text-gray-500">
                    My Profile
                  </a>
                </Link>
              </li>
              {user.role === "ADMIN" ? (
                <>
                  <li>
                    <Link href="/admin/panel">
                      <a className="text-sm text-gray-400 hover:text-gray-500">
                        Admin
                      </a>
                    </Link>
                  </li>
                </>
              ) : null}
              <li>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-sm text-gray-400 hover:text-gray-500"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        {!session && !loading && (
          <Link href="/login">
            <a className="hidden lg:inline-block py-2 px-6 bg-green-500 hover:bg-green-600 text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200">
              Sign in
            </a>
          </Link>
        )}
        {session && !loading && (
          <Link href="/">
            <a className="hidden lg:inline-block py-2 px-6 bg-green-500 hover:bg-green-600 text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200">
              {user.email}
            </a>
          </Link>
        )}
      </nav>
      <div
        className={classNames(["navbar-menu", "relative", "z-50"], {
          hidden: !isNavOpen,
        })}
      >
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="/">
              MakersMatch
            </a>
            <button onClick={() => setNavOpen(false)} className="navbar-close">
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded"
                  href="/"
                >
                  Start
                </a>
              </li>
              <li>
                <Link href="/profiles/browse">
                  <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded">
                    Browse
                  </a>
                </Link>
              </li>
              <li>
                <ConnectionsLink
                  isLoggedIn={session && !loading && true}
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded"
                />
              </li>
              {session && !loading && (
                <>
                  <li>
                    <Link href="/my-profile">
                      <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded">
                        My Profile
                      </a>
                    </Link>
                  </li>
                  {user.role === "ADMIN" ? (
                    <>
                      <li>
                        <Link href="/admin/panel">
                          <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded">
                            Admin
                          </a>
                        </Link>
                      </li>
                    </>
                  ) : null}
                </>
              )}
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              {!session && !loading && (
                <Link href="/login">
                  <a className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-green-600 hover:bg-green-700 rounded-l-xl rounded-t-xl">
                    Sign In
                  </a>
                </Link>
              )}
              {session && !loading && (
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-gray-500 hover:bg-green-700 rounded-l-xl rounded-t-xl"
                >
                  Logout
                </button>
              )}
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>&copy; 2023 All rights reserved.</span>
            </p>
          </div>
        </nav>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <section>
      <div className="py-5">
        <div className="max-w-md mx-auto text-center">
          <p className="mb-6 text-sm font-semibold text-gray-400">
            &copy; 2023. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default function Home({ children }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="container mx-auto flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
