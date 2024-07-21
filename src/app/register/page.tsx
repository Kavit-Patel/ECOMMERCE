"use client";

import { useState } from "react";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { sendVerificationEmail } from "~/utils/email";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerMutation = trpc.user.register.useMutation({
    onSuccess: async (data) => {
      await sendVerificationEmail(
        data.user.email,
        data.user.verificationToken ?? "",
      );
      setIsLoading(false);
      toast.success("Registration Successful !");
      router.push(`/verify?uid=${data.user.id}&email=${email}`);
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync({ userName, email, password });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="mt-6 flex w-full items-center justify-center">
      <div className="flex w-[95%] flex-col gap-3 rounded-2xl border border-[#C1C1C1] p-10 md:w-[50%]">
        <h2 className="w-full pb-3 text-center text-xl md:text-3xl">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <label htmlFor="name">Name</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="rounded-md border border-[#C1C1C1] px-4 py-2 outline-none"
              type="text"
              id="name"
              placeholder="Enter Name"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-[#C1C1C1] px-4 py-2 outline-none"
              type="email"
              id="email"
              placeholder="Enter Email"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="email">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-[#C1C1C1] px-4 py-2 outline-none"
              type="password"
              id="password"
              placeholder="Enter Password"
            />
          </div>
          <button
            type="submit"
            className={`mt-5 cursor-pointer rounded-md bg-black py-3 text-white transition-all active:scale-95 ${isLoading ? "animate-pulse" : ""}`}
          >
            {isLoading ? (
              <div className="flex w-full items-center justify-center">
                <div className="flex h-6 w-6 animate-spin items-center justify-center rounded-full border-b-2 border-orange-100"></div>
              </div>
            ) : (
              "CREATE ACCOUNT"
            )}
          </button>
          <div className="mt-5 flex justify-center gap-2.5 text-xs">
            <span>Have an Account ?</span>
            <Link
              href="/login"
              className="cursor-pointer font-semibold transition-all hover:underline active:scale-95"
            >
              LOGIN
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
