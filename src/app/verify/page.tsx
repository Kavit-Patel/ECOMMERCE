"use client";
import React, { Suspense } from "react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import CodeVerification from "~/components/CodeVerification";
import { trpc } from "~/utils/trpc";

const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid");
  const email = searchParams.get("email");

  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const verifyMutation = trpc.user.verifyUser.useMutation({
    onSuccess: (data) => {
      setIsLoading(false);
      toast.success("Varification Successful !");
      Cookies.set("category_token", data.token);
      router.push(`/categories?from='verify'&uid=${data.updatedUser.id}`);
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(err.message);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (code.length === 6) {
      try {
        await verifyMutation.mutateAsync({ code, userId: userId ?? "" });
      } catch (error) {
        console.log("error during varification ", error);
      }
    } else {
      setIsLoading(false);
      toast.info("Varification Code must be 6 digit long !");
      setCode("");
    }
  };
  return (
    <div className="mt-6 flex w-full items-center justify-center">
      <div className="flex w-[95%] flex-col gap-3 rounded-2xl border border-[#C1C1C1] p-10 md:w-[50%]">
        <h2 className="w-full pb-3 text-center text-xl md:text-3xl">
          Verify your email
        </h2>
        <div className="text-center">
          <span className="text-center text-xs md:text-sm">
            Enter the 6-digit code you received on
          </span>
          {email && (
            <p>{`${email?.split("@")[0]?.slice(0, 3)}****${email?.split("@")[1]}`}</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <div className="ml-28 flex flex-col gap-2.5">
            <label htmlFor="email ">Code</label>
            <div className="">
              <CodeVerification setCode={setCode} />
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 cursor-pointer rounded-md bg-black py-3 text-white transition-all active:scale-95"
          >
            {isLoading ? (
              <div className="flex w-full items-center justify-center">
                <div className="flex h-6 w-6 animate-spin items-center justify-center rounded-full border-b-2 border-orange-100"></div>
              </div>
            ) : (
              "VERIFY"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
const VerifyPage = () => (
  <Suspense
    fallback={
      <div className="flex h-96 w-full items-center justify-center">
        Loading...
      </div>
    }
  >
    <Verify />
  </Suspense>
);

export default VerifyPage;
