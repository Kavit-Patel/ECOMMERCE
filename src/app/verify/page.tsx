"use client";
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
  const verifyMutation = trpc.user.verifyUser.useMutation({
    onSuccess: (data) => {
      toast.success("Varification Successful !");
      Cookies.set("category_token", data.token);
      router.push(`/categories?from='verify'&uid=${data.updatedUser.id}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.length === 6) {
      try {
        await verifyMutation.mutateAsync({ code, userId: userId ?? "" });
      } catch (error) {
        console.log("error during varification ", error);
      }
    } else {
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
            Enter the 8-digit code you received on
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
            VERIFY
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
