"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from "lucide-react";

const TaskFlowFeature = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Effortless Task Management",
      description:
        "Easily organize and prioritize your tasks using TaskFlow. Stay productive by keeping all your work in one place.",
      image:
        "https://i.pinimg.com/originals/89/5e/20/895e207529925536dc93f2476756d979.gif",
      highlights: [
        "Smart task organization",
        "Priority management",
        "Deadline tracking",
      ],
    },
    {
      title: "Drag & Drop Feature",
      description:
        "Move tasks across different stages of your workflow effortlessly with our drag-and-drop feature.",
      image:
        "https://i.pinimg.com/originals/e9/5c/42/e95c42255669279319da06d3683bd1d4.gif",
      highlights: [
        "Intuitive interface",
        "Quick task updates",
        "Visual workflow",
      ],
    },
    {
      title: "Kanban Dashboard",
      description:
        "Our Kanban dashboard allows you to visualize your tasks and track their progress in a simple and intuitive way.",
      image:
        "https://i.pinimg.com/originals/7d/c6/c4/7dc6c4a72bee8112fd708a419116cbab.gif",
      highlights: ["Customizable boards", "Progress tracking", "Team overview"],
    },
    {
      title: "Collaborate Seamlessly",
      description:
        "Work with your team, assign tasks, and manage projects effortlessly, all in one place.",
      image:
        "https://i.pinimg.com/originals/cb/e3/5d/cbe35d0c38741068e695eafe16f2fbe9.gif",
      highlights: ["Real-time updates", "Team chat", "File sharing"],
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#121212] via-slate-950 to-[#121212] -mx-10 py-32 overflow-x-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text mb-4">
              Powerful Features
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Experience the next level of task management with our innovative
              features
            </p>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Feature Navigation */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    backgroundColor:
                      activeFeature === index
                        ? "rgba(59, 130, 246, 0.1)"
                        : "transparent",
                  }}
                  className={`p-4 rounded-lg cursor-pointer mb-2 group transition-colors
                    ${
                      activeFeature === index
                        ? "bg-blue-900/10"
                        : "hover:bg-slate-800/50"
                    }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-lg font-semibold transition-colors
                      ${
                        activeFeature === index
                          ? "text-blue-400"
                          : "text-slate-300"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform
                        ${
                          activeFeature === index
                            ? "rotate-90 text-blue-400"
                            : "text-slate-600"
                        }`}
                    />
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: activeFeature === index ? "auto" : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-400 mt-2 mb-4">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-blue-400" />
                          <span className="text-slate-300 text-sm">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Feature Image */}
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-xl overflow-hidden"
          >
            <Image
              src={features[activeFeature].image}
              alt={features[activeFeature].title}
              width={600}
              height={400}
              className="object-cover w-full h-full rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          </motion.div>
        </div>

        {/* CTA Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full">
            Get Started Today
          </Button> 
        </motion.div> */}
      </div>
    </div>
  );
};

export default TaskFlowFeature;
