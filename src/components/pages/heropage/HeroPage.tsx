"use client";

import React, { useState, useEffect } from "react";
import manageImage from "@/assets/manage.jpeg";
import optimizeImage from "@/assets/optimize.jpeg";
import trackImage from "@/assets/track_image.jpeg";
import discussImage from "@/assets/discuss.jpeg";
import Image from "next/image";
import { TaskAdvantages } from "./components/TaskAdvantages";
import TaskFlowFeature from "./components/TaskFlowFeature";
import { FooterSection } from "./components/FooterSection";
import CustomerSection from "./components/CustomerSection";

const HeroPage = () => {
  const taskAdvantage = [
    { title: "Manage" },
    { title: "Optimize" },
    { title: "Track" },
    { title: "Discuss" },
  ];

  const taskAdvantageImages = [
    { image: manageImage },
    { image: optimizeImage },
    { image: trackImage },
    { image: discussImage },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % taskAdvantage.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [taskAdvantage.length]);

  return (
    <div className="min-h-screen py-20 px-5 sm:px-10 mt-20">
      <div className="relative flex flex-col lg:flex-row ">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-[2000px] xl:text-9xl font-bold">
          Take Control Of Your Tasks
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-10 lg:mt-0 sm:absolute sm:top-[30px] sm:left-[200px] md:top-[40px] md:left-[230px] lg:top-[100px] lg:left-[300px] xl:top-[100px] xl:left-[410px]">
          <Image
            src={taskAdvantageImages[currentIndex].image}
            alt={taskAdvantage[currentIndex].title}
            className="w-full sm:w-[130px] md:w-[150px] lg:w-[200px] xl:w-[280px] xl:mt-10 rounded-lg"
            loading="eager"
          />
          <span className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold underline">
            {taskAdvantage[currentIndex].title}
          </span>
        </div>
      </div>

      <div className="min-h-screen">
        <TaskAdvantages />
      </div>

      <div className="min-h-screen">
        <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-800 to-pink-500 [mask-image:linear-gradient(to_right,transparent,white_50%,white_80%,transparent)]" />
        <TaskFlowFeature />
      </div>

      <div className="">
        <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-800 to-pink-500 [mask-image:linear-gradient(to_right,transparent,white_50%,white_80%,transparent)]" />
        <CustomerSection />
      </div>

      <div className="min-h-[30vh] -mb-10 -mx-10">
        <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-800 to-pink-500 [mask-image:linear-gradient(to_right,transparent,white_50%,white_80%,transparent)]" />
        <FooterSection />
      </div>
    </div>
  );
};

export default HeroPage;
