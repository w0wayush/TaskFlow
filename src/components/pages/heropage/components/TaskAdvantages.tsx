"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export function TaskAdvantages() {
  const userState = useSelector((state: RootState) => state.user);
  const { user, token } = userState;

  const navigate = useRouter();

  return (
    <div className="relative h-[50rem] mt-40 text-white font-bold text-center rounded-xl px-4 overflow-hidden">
      {/* Heading */}
      <BackgroundGradientAnimation>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white  rounded-xl">
          {/* Full-Coverage Sparkle Effect */}
          <SparklesCore
            background="transparent"
            minSize={1}
            maxSize={2}
            particleDensity={100}
            className="absolute inset-0 w-full h-full z-0"
            particleColor="#FFFFFF"
          />

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-widest mb-6 z-10">
            TaskFlow
          </h1>

          {/* Sparkle Effect and Description */}
          <div className="relative w-full sm:w-[50%] flex flex-col items-center text-center z-10">
            <p className="relative z-20 text-xl sm:text-2xl xl:text-3xl font-light">
              TaskFlow platform helps you to stay on top of your tasks and track
              your time efficiently.
            </p>

            {/* Decorative Lines */}
          </div>

          <button
            onClick={() => {
              if (!user) {
                navigate.push("/signup");
              } else {
                navigate.push("/kanban");
              }
            }}
            className="mt-10 py-3 px-6 bg-white text-indigo-600 text-lg font-bold rounded-full hover:bg-indigo-100 transition duration-300 ease-in-out z-20 cursor-pointer"
          >
            {!user ? "Get Started" : "Manage your tasks easily!"}
          </button>
        </div>
      </BackgroundGradientAnimation>
      <div className="absolute inset-x-10 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-800 to-transparent blur-sm z-10" />
      <div className="absolute inset-x-16 top-4 h-[3px] w-3/4 bg-gradient-to-r from-transparent via-blue-900 to-transparent blur-sm z-10" />
      <div className="absolute inset-x-20 top-6 h-[1px] w-2/4 bg-gradient-to-r from-transparent via-blue-900 to-transparent blur-sm z-10" />
    </div>
  );
}
