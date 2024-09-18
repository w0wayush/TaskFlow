"use client";

import { SparklesCore } from "@/components/ui/sparkles";
import React from "react";

type Props = {};

const TaskFlowFeature = (props: Props) => {
  const features = [
    {
      title: "Effortless Task Management",
      description:
        "Easily organize and prioritize your tasks using TaskFlow. Stay productive by keeping all your work in one place.",
      image:
        "https://i.pinimg.com/564x/77/30/70/773070328f36e6f5a1f913a80c90ba4d.jpg",
    },
    {
      title: "Drag & Drop Feature",
      description:
        "Move tasks across different stages of your workflow effortlessly with our drag-and-drop feature.",
      image:
        "https://i.pinimg.com/736x/bc/03/4d/bc034d44660723e2d8f35b3b46ed5450.jpg",
    },
    {
      title: "Kanban Dashboard",
      description:
        "Our Kanban dashboard allows you to visualize your tasks and track their progress in a simple and intuitive way.",
      image:
        "https://i.pinimg.com/564x/7c/46/82/7c4682c4d0d67142dfa703beed7280b9.jpg",
    },
    {
      title: "Collaborate Seamlessly",
      description:
        "Work with your team, assign tasks, and manage projects effortlessly, all in one place.",
      image:
        "https://i.pinimg.com/564x/b6/c5/5e/b6c55eb789fccacc4cac1d1d0b21efd6.jpg",
    },
  ];

  return (
    <div className="px-8 py-36 relative bg-cover bg-center">
      <SparklesCore
        background="transparent"
        minSize={1}
        maxSize={2}
        particleDensity={100}
        className="absolute inset-0 w-full h-full z-0"
        particleColor="#FFFFFF"
      />
      <h2 className="text-6xl font-extrabold text-center mb-16 ">
        Our Benefits
      </h2>
      <div className="space-y-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2 p-8 bg-white bg-opacity-80 rounded-2xl shadow-2xl hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h3 className="text-3xl font-extrabold text-indigo-600 mb-6 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="md:w-1/3">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskFlowFeature;
