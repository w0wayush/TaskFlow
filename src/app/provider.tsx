"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/slices/userSlice";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      dispatch(
        setUser({
          token,
          user: JSON.parse(userData),
        })
      );
    }
  }, [dispatch]);

  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
}
