import React from "react";
import Image from "next/image";
// import TaskBoardImage from "@/assets/task-board.png";
import manageImage from "@/assets/manage.jpeg";
import optimizeImage from "@/assets/optimize.jpeg";
import trackImage from "@/assets/track_image.jpeg";
import discussImage from "@/assets/discuss.jpeg";

const HeroSection = () => {
  return (
    <div className="">
      <div className="flex-1 order-2 sm:order-1">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Take Control Of Your Tasks
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          <div className="flex flex-col items-center">
            <Image
              src={trackImage}
              alt="Task Board"
              width={100}
              height={100}
              className="mb-2"
            />
            <span className="text-lg font-bold">Track</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={discussImage}
              alt="Chat"
              width={100}
              height={100}
              className="mb-2"
            />
            <span className="text-lg font-bold">Discuss</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={manageImage}
              alt="Schedule"
              width={100}
              height={100}
              className="mb-2"
            />
            <span className="text-lg font-bold">Manage</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={optimizeImage}
              alt="Task Board"
              width={100}
              height={100}
              className="mb-2"
            />
            <span className="text-lg font-bold">Optimize</span>
          </div>
        </div>
      </div>
      {/* <div className="flex-1 order-1 sm:order-2 mb-8 sm:mb-0">
        <Image
          src={TaskBoardImage}
          alt="Task Board"
          width={400}
          height={300}
          className="w-full sm:max-w-md mx-auto"
        />
      </div> */}
    </div>
  );
};

export default HeroSection;
