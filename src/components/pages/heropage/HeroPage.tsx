"use client";

import React, { useState, useEffect } from "react";
import manageImage from "@/assets/manage.png";
import optimizeImage from "@/assets/optimize.png";
import trackImage from "@/assets/track_image.png";
import discussImage from "@/assets/discuss.png";
import Image from "next/image";
import { TaskAdvantages } from "./components/TaskAdvantages";
import Feature from "./components/TaskFlowFeature";
import TaskFlowFeature from "./components/TaskFlowFeature";
import { CustomerSection } from "./components/CustomerSection";

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
    <div className="min-h-screen py-10 px-5 sm:px-10">
      {/* Hero Heading */}
      <div className="relative flex flex-col lg:flex-row">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
          Take Control Of Your Tasks
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-10 lg:mt-0 sm:absolute sm:top-[30px] sm:left-[200px] md:top-[40px] md:left-[230px] lg:top-[100px] lg:left-[300px]  xl:top-[125px] xl:left-[410px]">
          <Image
            src={taskAdvantageImages[currentIndex].image}
            alt={taskAdvantage[currentIndex].title}
            className="w-[200px] sm:w-[100px] md:w-[150px] lg:w-[200px] xl:w-[280px] rounded-lg"
            loading="lazy"
          />
          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold underline">
            {taskAdvantage[currentIndex].title}
          </span>
        </div>
      </div>

      {/* 2nd Hero Component */}
      <div className="min-h-screen ">
        <TaskAdvantages />
      </div>

      {/* 3rd Hero Component */}
      <div className="min-h-screen ">
        <TaskFlowFeature />
      </div>

      {/* 4th hero Component */}
      <div>
        <CustomerSection />
      </div>
    </div>
  );
};

export default HeroPage;
