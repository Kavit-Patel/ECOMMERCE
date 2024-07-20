"use client";

import { useEffect, useRef } from "react";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Home = () => {
  const router = useRouter();
  const autoLoginCalled = useRef(false); // To track if autoLogin has been called

  const cookieLoginMutation = trpc.user.cookieLogin.useMutation({
    onSuccess: (data) => {
      console.log("autologin success");
      router.push(`/categories?from='home'&uid=${data.user.id}`);
    },
    onError: (err) => {
      // console.log("error", err);
      toast.error(err.message);
      router.push("/login");
    },
  });

  useEffect(() => {
    const autoLogin = async () => {
      try {
        await cookieLoginMutation.mutateAsync();
      } catch (error) {
        console.log("error", error);
      }
    };

    if (!autoLoginCalled.current) {
      autoLoginCalled.current = true; // Set to true to ensure this runs only once
      void autoLogin();
    }
  }, [cookieLoginMutation]);

  return (
    <div className="flex h-96 w-full items-center justify-center">
      Loading....
    </div>
  );
};

export default Home;
