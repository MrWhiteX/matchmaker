import React, { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

type ErrorType = string | null;

export default function Login() {
  const [signing, setSigning] = useState(false);
  const [session, loading] = useSession();
  const [error, setError] = useState<ErrorType>(null);
  const [formProcessing, setFormProcessing] = useState<boolean>(false);
  const router = useRouter();

  const loginForm = useRef<HTMLFormElement | null>(null);

  const handleGithubLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSigning(true);
    await signIn("github");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    if (loginForm.current) {
      const form = new FormData(loginForm.current);
      const response = await signIn("credentials", {
        redirect: false,
        email: form.get("email"),
        password: form.get("password"),
      });
      if (response && response.ok) {
        router.push("/");
      } else {
        setError("Invalid login details");
      }
      setFormProcessing(false);
    }
  };

  useEffect(() => {
    if (session && !loading) {
      router.push("/");
    }
  }, [session, loading]);

  return (
    <div>
      <section className="h-screen py-10 lg:py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="mb-10 text-center ">
              <Link href="/">
                <a className="text-white text-3xl font-bold leading-none">
                  MakersMatch
                </a>
              </Link>
            </div>
            <div className="p-6 lg:p-12 bg-white shadow-md rounded">
              <div className="mb-6 px-3 text-center">
                <span className="text-gray-500">Sign In</span>
                <h3 className="text-2xl font-bold">Join our community</h3>
              </div>
              <form ref={loginForm} onSubmit={handleSubmit}>
                <div className="">
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                      >
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button
                      disabled={formProcessing}
                      className="disabled:opacity-50 mt-5 mb-4 p-4 w-full flex justify-center items-center border rounded hover:bg-gray-50 bg-green-50"
                    >
                      {formProcessing ? "Signing in..." : "Sign in"}
                    </button>
                    <Link href="/register">
                      <a className=" ">
                        <button
                          disabled={formProcessing}
                          className="disabled:opacity-50 mt-3 mb-4 p-4 w-full flex justify-center items-center border rounded hover:bg-gray-50 bg-green-50"
                        >
                          Register
                        </button>
                      </a>
                    </Link>
                    <div className="text-right ">
                      <Link href="/reset-password">
                        <a className="text-sm text-gray-400 hover:text-gray-500">
                          Forgotten password?
                        </a>
                      </Link>
                    </div>
                    {error && (
                      <div className="flex justify-center w-full my-5">
                        <span className="bg-red-600 w-full rounded text-white px-3 py-3 text-center">
                          Error: {error}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    className="mt-8 mb-4 p-4 w-full flex justify-center items-center border rounded hover:bg-gray-50"
                    onClick={handleGithubLogin}
                  >
                    <img className="mr-4 w-6" src="/github.svg" alt="" />
                    <span className="text-xs text-gray-500 font-bold">
                      {!signing && "Sign in with your GitHub"}
                      {signing && "Signing in..."}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
