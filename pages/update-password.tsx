import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import apiRoutes from "utils/apiRoutes";

type ErrorType = string | null;

export default function UpdatePassword() {
  const [error, setError] = useState<ErrorType>(null);
  const [formProcessing, setFormProcessing] = useState<boolean>(false);
  const router = useRouter();

  const changePasswordForm = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    if (changePasswordForm.current) {
      const form = new FormData(changePasswordForm.current);
      const payload = {
        resetToken: router.query.token,
        password: form.get("password"),
      };
      if (payload.password !== form.get("passwordConfirm")) {
        setError("Given password not match");
        setFormProcessing(false);
        return;
      }

      setFormProcessing(false);
      try {
        const response = await apiRoutes.user.resetPassword.put(payload);
        if (response.status === 200) {
          router.push("/login");
        }
      } catch (error) {
        setFormProcessing(false);
        const errorMessage =
          error instanceof Error
            ? setError(error.message)
            : "An unexpected error occurred";
      }
    }
  };

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
                <h3 className="text-2xl font-bold">Change password</h3>
              </div>
              <form ref={changePasswordForm} onSubmit={handleSubmit}>
                <div className="">
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
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Repeat Password
                      </label>
                      <input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        required
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button
                      disabled={formProcessing}
                      className="disabled:opacity-50 mt-8 mb-4 p-4 w-full flex justify-center items-center border rounded hover:bg-gray-50 bg-green-50"
                    >
                      {formProcessing ? "Loading..." : "Change Password"}
                    </button>
                    <div className="text-right ">
                      <Link href="/login">
                        <a className="text-sm text-gray-400 hover:text-gray-500">
                          Back to log in
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
