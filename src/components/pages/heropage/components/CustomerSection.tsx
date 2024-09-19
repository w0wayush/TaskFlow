"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { FaStar } from "react-icons/fa";

export function CustomerSection() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <div className="text-black text-3xl md:text-6xl font-semibold mb-12">
        What Customer Says
        {/* <p className="flex justify-center items-center gap-4 mt-3"></p> */}
        <p className="flex justify-center items-center gap-4 mt-3">
          4.9 -
          <FaStar color="yellow" />
          <FaStar color="yellow" />
          <FaStar color="yellow" />
          <FaStar color="yellow" />
          <FaStar color="yellow" />
        </p>
        <p className="flex justify-center items-center gap-4 mt-3 text-black text-base md:text-xl font-semibold  ">
          49 REVIEWS
        </p>
      </div>
      <InfiniteMovingCards items={reviews} direction="right" speed="slow" />
    </div>
  );
}

const reviews = [
  {
    quote:
      "TaskFlow made managing my team so easy! The drag-and-drop functionality is smooth, and the Kanban dashboard is intuitive.",
    name: "Elon Musk",
    title: "CEO, Tesla",
  },
  {
    quote:
      "Using TaskFlow, our productivity increased by 40% within a month. It’s simple, yet very powerful!",
    name: "Satya Nadella",
    title: "CEO, Microsoft",
  },
  {
    quote:
      "Our remote team found TaskFlow’s collaborative tools invaluable. It’s perfect for remote task management.",
    name: "Tim Cook",
    title: "CEO, Apple",
  },
  {
    quote:
      "With TaskFlow, we never miss deadlines. It has become a crucial part of our project management toolkit.",
    name: "Sundar Pichai",
    title: "CEO, Google",
  },
  {
    quote:
      "The ability to switch between Kanban and list views makes TaskFlow stand out from other tools we’ve used.",
    name: "Mark Zuckerberg",
    title: "CEO, Meta",
  },
];
