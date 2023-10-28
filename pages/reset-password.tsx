import React, { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import apiRoutes from "utils/apiRoutes";

type ErrorType = string | null;

export default function ResetPassword() {
  const [error, setError] = useState<ErrorType>(null);
  const [confirmation, setConfirmation] = useState<string>("");
  const [formProcessing, setFormProcessing] = useState<boolean>(false);
  const router = useRouter();

  const resetForm = useRef<HTMLFormElement | null>(null);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    if (resetForm.current) {
      const form = new FormData(resetForm.current);
      const payload = {
        email: form.get("email"),
      };

      try {
        const response = await apiRoutes.user.resetPassword.post(payload);
        setFormProcessing(false);

        if (response.status === 200) {
          setConfirmation(
            "If provided e-mail exists in our database you will receive reset link shorely"
          );
        }
      } catch (error) {
        setFormProcessing(false);

        if (error instanceof AxiosError && error.response?.data?.error) {
          setError(JSON.stringify(error.response.data.error));
        } else {
          setError("An unexpected error occurred");
        }
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
                <h3 className="text-2xl font-bold">Reset your password</h3>
              </div>
              <form ref={resetForm} onSubmit={handleReset}>
                <div className="">
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Email address
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
                    <button
                      disabled={formProcessing}
                      className="disabled:opacity-50 mt-8 mb-4 p-4 w-full flex justify-center items-center border rounded hover:bg-gray-50 bg-green-50"
                    >
                      {formProcessing ? "Loading..." : "Send me reset link"}
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
                    {confirmation && (
                      <div className="flex justify-center w-full my-5">
                        <span className="bg-green-600 w-full rounded px-3 py-3 text-white text-center">
                          {confirmation}
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
