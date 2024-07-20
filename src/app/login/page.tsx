"use client";

import { useState } from "react";
import { trpc } from "~/utils/trpc";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginMutation = trpc.user.loginUser.useMutation({
    onSuccess: (data) => {
      Cookies.set("category_token", data.token); // Set the token in a cookie
      toast.success("Login Successful !");
      router.push(`/categories?from='login'&uid=${data.user.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email, password });
    } catch (error) {
      toast.error("Error during Login !");
    }
  };

  return (
    <div className="mt-6 flex w-full items-center justify-center">
      <div className="flex w-[95%] flex-col gap-3 rounded-2xl border border-[#C1C1C1] p-10 md:w-[50%]">
        <h2 className="w-full pb-3 text-center text-xl md:text-3xl">Login</h2>
        <div className="">
          <h3 className="text-center text-sm md:text-xl">
            Welcome back to ECOMMERCE
          </h3>
          <p className="text-center text-xs md:text-sm">
            The next gen business marketplace
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            <div className="relative w-full">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-[#C1C1C1] px-4 py-2 outline-none"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-5 top-2.5 cursor-pointer underline transition-all active:scale-95"
              >
                Show
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 cursor-pointer rounded-md bg-black py-3 text-white transition-all active:scale-95"
          >
            CREATE ACCOUNT
          </button>
          <div className="mt-5 flex justify-center gap-2.5 text-xs">
            <span>`Don&apos;t have an Account ?`</span>
            <Link
              href="/register"
              className="cursor-pointer font-semibold transition-all hover:underline active:scale-95"
            >
              SIGN UP
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
